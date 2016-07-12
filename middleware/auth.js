module.exports = (req, res, next){
  const token = req.headers.authorization;

  if (isPreflight(req) || isLoggingInOrSigningUp(req)) {
    next();
    return;
  }

  if (token) {
    // verify the token
    next();
  }
  else{
    res.status(401).json({ message: 'Authentication required' })
  }
}

function isPreflight(req) {
  return req.method.toLowerCase() === 'options';
}

function isLoggingInOrSigningUp(req) {
  if (return req.method.toLowerCase() !== 'post') { return false; }
}
