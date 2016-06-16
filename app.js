var express = require('express');
var app = express();

app.get('/', function(req, res){
  res.json([
    {
      title: 'Notez',
      body_html: 'Wow'
    },
    {
      title: 'Notesa',
      body_html: 'Wodw'
    }
  ]);
});

app.listen(3030, function(){ // Not 8000
  console.log('Listening on port 3030')
});
