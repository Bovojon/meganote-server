require('dotenv').load();
// If you will use it again, save it to a variable
var express = require('express');
var noteRoutes = require('./routes/note-routes')
var bodyParser = require('body-parser');
var headersMiddleware = require('./middleware/headers');

var app = express();

// Middleware
app.use();

// Body parsing for JSON POST/PUT payloads
app.use(bodyParser.json());

// Routes
app.use('/api/v1/notes', noteRoutes);
app.use('/api/v1/users', userRoutes);

app.listen(3030, function() {
  console.log('Listening on http://localhost:3030...');
});
