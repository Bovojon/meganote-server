require('dotenv').load();
var express = require('express');
// var db = require('./config/db'); // maybe use config\db is doesn't work
var Note = require('./models/note');
var bodyParser = require('body-parser');

var app = express();

// Middleware
app.use(function(req, res, next){
// Allow CORS (Cross-origin resource sharing)
  res.header('Access-Control-Allow-Origin', '*');
// Allow Content-Type header (for JSON payloads)
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

// Body parsing for JSON POST/PUT payloads
app.use(bodyParser.json());

// Read ALL notes when receive get request
app.get('/', function(req, res){
  Note
    .find() // returns descendant elements of the selected element.
    .sort({ updated_at: 'desc' }) // sort notes on server
    .then(function(notes){
      res.json(notes);
    });
});

// CREATE a note
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
