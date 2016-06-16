var db = require('../config/db');

//Specify schema by passing 2nd arg
var noteSchema = db.Schema({
  title: String,
  body_html: String,
  body_text: String,
  updated_at: { type: Date, default: Date.now }
});
var Note = db.model('Note', noteSchema);

module.exports = Note;
