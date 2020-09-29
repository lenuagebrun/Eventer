const express = require('express');
const router = express.Router();
const auth = require('../../middlewear/auth')
const { check, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('config')


const User = require(`../../models/Users`)

router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (err) {
    console.log(err.message);
    res.status(500).send(`Internal Error`);
  }
});

router.post('/', [
  check('email', 'Please include a valid email.').isEmail(),
  check('password', 'Password is a required field').exists()
], 
  //If the previous operation generates an error, use that error object to create an error message
async (req, res) => {
  const errors = validationResult(req);
  if(!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  //Destructuring assignment from the form submit
  const { email, password } = req.body;
  //Query the database to see if that email has already been used.
  try {
  let user = await User.findOne({ email });
  //If it has, send back and error reponse object with the appropriate message
  if(!user) {
    return res.status(400).json({ errors : [{ msg: 'Invalid Login.' }] })
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if(!isMatch) {
    return res
    .state(400)
    .json({ errors: [{ msg: 'Invalid Login'}] })
  }

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
    return res.state(500).send('Internal Error');
    }
  }
);




module.exports = router;