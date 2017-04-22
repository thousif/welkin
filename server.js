// modules =================================================
var express        = require('express');
var app            = express();
var bodyParser     = require('body-parser');
var methodOverride = require('method-override');
var fs             = require('fs');

// configuration ===========================================
	
// config files
var port = 3006; // set our port

// get all data/stuff of the body (POST) parameters
app.use(bodyParser.json()); // parse application/json 
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(bodyParser.urlencoded({ extended: true })); // parse application/x-www-form-urlencoded

app.use(methodOverride('X-HTTP-Method-Override')); // override with the X-HTTP-Method-Override header in the request. simulate DELETE/PUT

app.get('/', function(req, res, next) {
  	fs.readFile(__dirname + '/index.html', 'utf8', function (err,data) {
  		res.send(data);
  	});
});

app.use(express.static(__dirname + '/'));

app.listen(port);	

console.log('started application on port' + port); 			// shoutout to the user
exports = module.exports = app; 						// expose app