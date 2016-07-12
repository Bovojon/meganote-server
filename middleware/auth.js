var jwt = require('jsonwebtoken');
var User = require('../models/user');

module.exports = (req, res, next){
  const token = req.headers.authorization;

  if (isPreflight(req) || isLoggingInOrSigningUp(req)) {
    next();
    return;
  }

  if (token) {
    // verify the token
    jwt.verify(token, process.env.JWT_SECRET, (err, decodedPayload) => {
      if (err) {
        // Invalid token
        res.status(401).json({ message: 'Authentication required' });
        return;
      }

      // find user
      User
        .findOne({ _id: decodedPayload._id })
        .then(
          user => {
            if (user) {
              // add user to the request
              req.user = user;
              next();
            }
            else {
              // user not found
              res.status(401).json({ message: 'Authentication required' });
            }
          }
        );
    });
    next();
  }
  else{
    res.status(401).json({ message: 'Authentication required' });
  }
}

function isPreflight(req) {
  return req.method.toLowerCase() === 'options';
}

function isLoggingInOrSigningUp(req) {
  if (return req.method.toLowerCase() !== 'post') { return false; }
  const loggingIn = req.originalUrl.includes('sessions');
  const signingUp = req.originalUrl.includes('users');
  return (loggingIn || signingUp);
}
