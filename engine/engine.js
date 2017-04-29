

function compareCropWithField(crop,field){

  if(crop.maxHumid<=field.maxHumid){
    cropVib.issue.push('highHumid')
    //Get difference, need to decide how to weight it
  } else if(crop.minHumid<=field.minHumid) {
    cropVib.issue.push('lowHumid')
    //Get difference, need to decide how to weight it
  }

  if(crop.maxPh<=field.maxPh){
    cropVib.issue.push('highPh')
    //Get difference, need to decide how to weight it
  } else if(crop.minPh<=field.minPh) {
    cropVib.issue.push('lowPh')
    //Get difference, need to decide how to weight it
  }

  if(crop.maxPh<=field.maxPh){
    cropVib.issue.push('highPh')
    //Get difference, need to decide how to weight it
  } else if(crop.minPh<=field.minPh) {
    cropVib.issue.push('lowPh')
    //Get difference, need to decide how to weight it
  }

  return cropVib;
}

function newFarm(name){

}

function connectToDB(){
  var MongoClient = require('mongodb').MongoClient
  var assert = require('assert');

  // Connection URL
  //var url = 'mongodb://ds123351.mlab.com:23351/heroku_s50rzslz';
  var url = 'mongodb://admin:admin@ds123351.mlab.com:23351/heroku_s50rzslz';

  // Use connect method to connect to the server
  MongoClient.connect(url, function(err, db) {
    assert.equal(null, err);
    console.log("Connected successfully to server");
  });
  //db.close();
}

connectToDB()