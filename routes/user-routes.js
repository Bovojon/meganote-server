var router = require('express').Router();

// CREATE a user
app.post('/', function(req, res) {
  res.json({
    msg: 'HOORAY!'
  });
});

module.exports = router;
