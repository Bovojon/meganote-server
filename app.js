require('dotenv').load();
var express = require('express');
var db = require('mongoose');

db.connect(process.env.DB_URI);
var app = express();

//Specify schema by passing 2nd arg
var Note = db.model('Note', { title:String });


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
