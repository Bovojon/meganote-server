require('dotenv').load();
var express = require('express');
// var db = require('./config/db'); // maybe use config\db is doesn't work
var Note = require('./models/note');
var app = express();


app.get('/', function(req, res){
  Note
    .find()
    .then(function(notes){
      res.json(notes);
    });
});

app.listen(3030, function(){ // Not 8000
  console.log('DB: '+process.env.DB_URI);
  console.log('Listening on port 3030')
});
