const express = require('express');
const app = express();
const bodyParser= require('body-parser')
const cool = require('cool-ascii-faces');
const engine = require('./feedr_engine/engine.js');
const ai = require('./machine');


app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended: true}))

app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

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

app.post('/addcrop', function(request, response) {
  db.collection('crops').save(request.body)
  response.send('<p>Recived new crop data for :'+request.body.cropname+' </p>');
});

app.get('/input', function(request, response) {
  //redirect input here
  response.send('<p>Was sent message: '+response+'</p>');
});

app.post('/db', (request, response) => {
  console.log(request.body)
  db.collection('test').save(request.body, (err, result) => {
    if (err) return console.log(err)

    console.log('saved to database')
    response.redirect('/db')
  })
})

app.get('/db', function(request, response) {
  MongoClient.connect('mongodb://admin:admin@ds123351.mlab.com:23351/heroku_s50rzslz', (err, database) => {
  	if (err) return console.log(err)

  	db = database
  	db.collection('test').find().toArray(function(err, results) {
  		console.log(results)
  		response.render('pages/db', {data: results});
		});

	})
	// response.send(cool());
});

app.get('/loc', function(request, response) {
 	response.render('pages/loc');
});

app.get('/ai', function(request, response) {
	result = ai.predictData()
	var training_data = [
  	{"color":"blue", "shape":"square", "liked":false},
  	{"color":"red", "shape":"square", "liked":false},
  	{"color":"blue", "shape":"circle", "liked":true},
  	{"color":"red", "shape":"circle", "liked":true},
  	{"color":"blue", "shape":"hexagon", "liked":false},
  	{"color":"red", "shape":"hexagon", "liked":false},
  	{"color":"yellow", "shape":"hexagon", "liked":true},
  	{"color":"yellow", "shape":"circle", "liked":true}
  ];

	var test_data = [
  	{"color":"blue", "shape":"hexagon", "liked":false},
  	{"color":"red", "shape":"hexagon", "liked":false},
  	{"color":"yellow", "shape":"hexagon", "liked":true},
  	{"color":"yellow", "shape":"circle", "liked":true}
  ];
	// Setup Target Class used for prediction:
  var class_name = "liked";
  // Setup Features to be used by decision tree:
	var features = ["color", "shape"];

	// Create decision tree and train model:
	var dt = new DecisionTree(training_data, class_name, features);

  var predicted_class = dt.predict({
  	color: "blue",
  	shape: "hexagon"
  });
  console.log(predicted_class)

  var accuracy = dt.evaluate(test_data);
  console.log(accuracy)
	var result = dt

 	response.render('pages/ai', {data: result});
});

app.get('/cool', function(request, response) {
  response.send(cool());
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));

  var assert = require('assert');

  // Connection URL
  //var url = 'mongodb://ds123351.mlab.com:23351/heroku_s50rzslz';
  var url = 'mongodb://admin:admin@ds123351.mlab.com:23351/heroku_s50rzslz';

  // Use connect method to connect to the server
  MongoClient.connect(url, function(err, database) {
    assert.equal(null, err);
    db = database
    console.log("Connected successfully to server");
  });

  engine.findBestCrop('',db.collection('crops').find().toArray(function(err, docs) {
      assert.equal(err, null);
      callback(docs);
    }));

});
