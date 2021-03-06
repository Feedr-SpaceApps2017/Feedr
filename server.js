Maths = Math;


const express = require('express');
const app = express();
const bodyParser= require('body-parser')
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

const MongoClient = require('mongodb').MongoClient;
var db;

app.get('/', function(request, response) {
  response.render('pages/compare');
});

app.get('/compare', function(request, response) {
  response.render('pages/compare');
});

app.get('/addcrop', function(request, response) {
  response.render('pages/addcrop');
});

/*
app.get('/cropcheck', function(request, response) {
  db.collection('crops').find().toArray(function(err, data) {
    response.send(engine.findBestCrop('',query,data));
  });
});
*/
// app.post('/cropcheck', function(request, response) {
//   db.collection('crops').find().toArray(function(err, data) {
//     response.send(engine.findBestCrop(request.body,data));
//   });
// }h);

app.get('/getfarmlist', function(request, response) {
  //This is throwing errors for some reason
   db.collection('farms').find().toArray(function(err, data) {
      response.send(data);
  });
});

app.post('/addcrop', function(request, response) {
  db.collection('crops').save(request.body);
  response.send('<p>Recived new crop data for :'+request.body.cropname+' </p>');
});

// app.get('/gettodo', function(request, response) {
//   response.send('Temp TODO');
// });

// DEBUG
// app.post('/db', (request, response) => {
//   db.collection('test').save(request.body, (err, result) => {
//     if (err) return console.log(err)
// 
//     console.log('saved to database')
//     response.redirect('/db')
//   })
// })
// 
// app.get('/db', function(request, response) {
//   MongoClient.connect('mongodb://admin:admin@ds123351.mlab.com:23351/heroku_s50rzslz', (err, database) => {
//   	if (err) return console.log(err)

//   	db = database
//   	db.collection('test').find().toArray(function(err, results) {
//   		response.render('pages/db', {data: results});
// 		});

// 	})
// });

// DEBUG
app.get('/loc', function(request, response) {
 	response.render('pages/loc');
});

// DEBUG
app.get('/ai', function(request, response) {
	let result = ai.predictData()
 	response.render('pages/ai', {data: result});
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
    db = database;
    console.log("Connected successfully to server");
  });

});
