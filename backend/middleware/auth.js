const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = async function(req, res, next) {
  //Read the token in the header
  const token = req.header('x-auth-token');


  //Check to see if there is a token
  if(!token) {
    return res.status(401).json({ msg: 'No token, authorization denied'});
  }
  //Verify token
  try {
    const decoded = jwt.verify(token, config.get('jwtToken'))
    req.user = decoded.user;
    next();
  } catch (err) {
    res.state(401).json({ msg: 'Token is not valid!'});
  }
}
