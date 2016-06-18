var db = require('../config/db');

//Specify schema by passing 2nd arg
var noteSchema = db.Schema({
  title: String,
  body_html: String,
  body_text: String,
  updated_at: { type: Date, default: Date.now }
});

noteSchema.pre('save', function(next){
  this.updated_at = Date.now();
  next();
});

var Note = db.model('Note', noteSchema);

module.exports = Note;
