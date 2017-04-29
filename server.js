var express = require('express');
var app = express();
var cool = require('cool-ascii-faces');

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

const MongoClient = require('mongodb').MongoClient
var db

app.get('/', function(request, response) {
  response.render('pages/index');
});

app.get('/addcrop', function(request, response) {
  response.render('pages/addcrop');
});

app.get('/input', function(request, response) {
  //redirect input here
  response.send('<p>Was sent message: '+response+'</p>');
});

app.get('/db', function(request, response) {
  MongoClient.connect('mongodb://admin:admin@ds123351.mlab.com:23351/heroku_s50rzslz', (err, database) => {
  	if (err) return console.log(err)

  	db = database
  	db.collection('test').find().toArray(function(err, results) {
  		response.send('<p>result: '+results+'</p>');
  		console.log(results)
		})

	})
	// response.send(cool());
});

app.get('/cool', function(request, response) {
  response.send(cool());
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
