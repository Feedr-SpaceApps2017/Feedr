

function compareCropWithField(crop,field){
  score = 0;
  issue = new Array(0);

  //Temperture check
  if(crop.optmaxtemp<=field.optmaxtemp&&crop.optmintemp<=field.optmintemp){
    score+=3;
  } else if (crop.maxtemp<=field.maxtemp&&crop.mintemp<=field.mintemp){
    score++;
  } else if (crop.maxtemp<field.maxtemp){
    score-=3;
    issue.push('hightemp')
  } else {
    score-=3;
    issue.push('lowtemp')
  }

  //Rainfall check
  if(crop.optmaxrain<=field.optmaxrain&&crop.optminrain<=field.optminrain){
    score+=3;
  } else if (crop.maxrain<=field.maxrain&&crop.minrain<=field.minrain){
    score++;
  } else if (crop.maxrain<field.maxrain){
    score-=3;
    issue.push('highrain')
  } else {
    score-=3;
    issue.push('lowrain')
  }

  //phfall check
  if(crop.optmaxph<=field.optmaxph&&crop.optminph<=field.optminph){
    score+=3;
  } else if (crop.maxph<=field.maxph&&crop.minph<=field.minph){
    score++;
  } else if (crop.maxph<field.maxph){
    score-=3;
    issue.push('highph')
  } else {
    score-=3;
    issue.push('lowph')
  }

  return {score,issue};
}

function findBestCrop(farm,db){
  scores = new Array(0);
  var crops = db.collection('crops').find().toArray(function(err, docs) {
      assert.equal(err, null);
      callback(docs);
    });

  console.log(crops);
}

var exports = module.exports = {
  findBestCrop
};
