const router = require('express').Router();
const { check, validationResult } = require('express-validator');
// const router = express.Router();
const gravatar = require('gravatar');
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs');
const config = require('config')

let Users = require('../models/user.model');
let Event = require('../models/event.model');


// View all Users
router.route('/').get((req, res) => {
  Users.find().populate('attending').exec()
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error: ' + err));
});


// User Login
router.route('/login').post(async(req,res) => {
  try {
    const user = await Users.findOne({email: req.body.email});
    if (!user) return res.status(401).json({err: 'bad credentials'});
    user.comparePassword(req.body.password, (err, isMatch) => {
      if (isMatch) {
        const token = createJWT(user);
        res.json({token});
      } else {
        return res.status(401).json({err: 'bad credentials'});
      }
    });
  } catch (err) {
    return res.status(401).json(err);
  }
})

// Add a new User
router.post('/add', [
  check('username', 'Username is required').not().isEmpty(),
  check('email', 'Please include a valid email.').isEmail(),
  check('password', 'Please enter a password with 6 or more characters').isLength({ min: 6 })
],
  //If the previous operation generates an error, use that error object to create an error message
async (req, res) => {
  const errors = validationResult(req);
  if(!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  //Destructuring assignment from the form submit
  const { username, firstname, lastname, email, password } = req.body;
  //Query the database to see if that email has already been used.
  try {
  let user = await Users.findOne({ email });
  //If it has, send back and error reponse object with the appropriate message
  if(user) {
    return res.status(400).json({ errors : [{ msg: 'This email has already been used to create an account.' }] })
  }
  //If their email has a profile picture associated with it, that picture will be used automatically.
  const avatar = gravatar.url(email, {
    s: '200',
    r: 'pg',
    d: 'mm'
  })
  //Instantiate a new user with the post values
  user = new Users({
    username,
    firstname,
    lastname,
    email,
    avatar,
    password
  });
  //Create a salt
  const salt = await bcrypt.genSalt(10);
  //Apply it to the password
  user.password = await bcrypt.hash(password, salt);
  //Save the completed user object into the database
  await user.save();

  //JWT payload = MONGODB - ID
  const payload = {
    user : {
      id: user.id
    }
  }

  //Create the token
  jwt.sign(payload, config.get('jwtToken'),
  //CHANGE DURATION BEFORE PRODUCTION
  { expiresIn : 360000 },
  //Error handling
  (err, token) => {
  //If Error return out of function with error
    if(err) throw err;
  //If not "finish" signing the token
    res.json({ token });
    }
  )

  } catch(err) {
    console.error(err.message);
    return res.state(500).send('Internal Error');
    }
  }
);

// Assigning Events to specific User
router.post('/update/:id', function(req,res){
  Users.findById(req.params.id, function(err, user){
    user.attending.push(req.body.attending)
    user.save(function(){
      // Assigning Attendees to specific Event
      Event.findById(req.body.attending)
      .populate('attendees')
      .exec(function(err, e){
        e.attendees.push(user.id)
        e.save()
        .then(() => res.json('User Updated '))
        .catch(err => res.status(400).json('Error: '+ err))
      })

    })
  })
})


// Create New Event
router.route('/create/:id').post((req,res) => {
  Users.findById(req.params.id, function(err, user){
    const name = req.body.name;
    const description = req.body.description;
    const location = req.body.location;
    const date = Date.parse(req.body.date);
    // const host = user.username

    const newEvent = new Event({
      // host,
      name,
      description,
      location,
      date,
    });

    newEvent.save()
    .then(() => res.json('Event added!' + newEvent))
    .catch(err => res.status(400).json('Error: ' + err));
  })
});




// View specific User Profile
router.route('/:id').get((req,res) => {
  Users.findById(req.params.id)
  .populate('attending').exec(function(err, users){
    res.json(users)
  })
})


module.exports = router;
