// modules =================================================
var express        = require('express');
var app            = express();
var bodyParser     = require('body-parser');
var methodOverride = require('method-override');
var mongoose       = require('mongoose');



//Setting our port
var port = process.env.PORT || 8080;

// database
var db = require('./config/db');
// connect to our database
mongoose.connect(db.url);


app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
app.use(bodyParser.urlencoded({ extended: true }));


require('./app/routes')(app);

app.listen(port);

// shoutout to the user
console.log('ThisOrThat Backend is doing its magic on ' + port);
exports = module.exports = app;

