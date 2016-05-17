var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var cors = require('cors');

var app = express();
var port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '/public')));
app.use(require('./routes'));

/* Start the server */
app.listen(port, function() {
  console.log('Listening on port ' + port);
});
