const express = require('express');
const { check, validationResult } = require('express-validator');
const router = express.Router();
const gravatar = require('gravatar');
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs');
const config = require('config')

const Users = require('../../models/Users');
const Event = require('../../models/Event');

  //Post route for user creation. The second parameter is the express validators parameters.
router.post('/', [
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
  const { username , email, password } = req.body;
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
    email,
    avatar,
    password
  });
  //Create a salt
  const salt = await bcrypt.genSalt(10);
  //Apply it to the password
  users.password = await bcrypt.hash(password, salt);
  //Save the completed user object into the database
  await user.save();

  //JWT payload = MONGODB - ID
  const payload = {
    users : {
      id: users.id
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


module.exports = router;