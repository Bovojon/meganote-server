require('dotenv').load();
var express = require('express');
// var db = require('./config/db'); // maybe use config\db is doesn't work
var Note = require('./models/note');
var bodyParser = require('body-parser');

var app = express();

app.use(function(req, res, next){
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.use(bodyParser.json());
// when you receive get request, do the function below:
app.get('/', function(req, res){
  Note
    .find() // returns descendant elements of the selected element.
    .then(function(notes){
      res.json(notes);
    });
});

app.post('/', function(req, res){
  var note = new Note({
    title: req.body.note.title,
    body_html: req.body.note.body_html
  });

  note
    .save() // mongoosejs method to save note to database
    .then(function(noteData){
      res.json({
        message: 'Successfully created note',
        note: noteData
      });
    });
});

app.listen(3030, function(){ // Not 8000
  console.log('DB: '+process.env.DB_URI);
  console.log('Listening on port 3030')
});
