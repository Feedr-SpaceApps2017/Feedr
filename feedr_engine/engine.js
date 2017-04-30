
function fitCurve(a,b,c,d,val){
  ans = 0.0;
  //abs_min, opt_min, opt_max, abs_max in order, value
  if(val>=a&&val<b){
    ans = (1/(Maths.sqrt(2)*(b-a)))*(val-a);
  } else if(val>=b&&val<c){
    ans = 1-((Maths.sqrt(2)-1)/(Maths.sqrt(2)*(c-b)^2))*(2*val-b-c)^2;
  } else if(val>=c&&val<d){
    ans = (1/(Maths.sqrt(2)*(c-d)))*(val-d);
  } else{
    ans = 0;
  }
  return ans;
}

function compareCropWithField(crop,field){
  var score = 0.0;
  issue = new Array(0);

  if (crop.maxtemp<field.maxtemp){
    issue.push('hightemp');
  } else if (crop.mintemp>field.mintemp){
    issue.push('lowtemp');
  } else {
    score += fitCurve(crop.mintemp,crop.optmintemp,crop.optmaxtemp,crop.maxtemp,(field.maxtemp+field.mintemp)/2);
  }

  if (crop.maxrain<field.maxrain){
    issue.push('highrain');
  } else if (crop.minrain>field.minrain){
    issue.push('lowrain');
  } else {
    score += fitCurve(crop.minrain,crop.optminrain,crop.optmaxrain,crop.maxrain,(field.maxrain+field.minrain)/2);
  }

  if (crop.maxph<field.maxph){
    issue.push('highph');
  } else if (crop.minph>field.minph){
    issue.push('lowph');
  } else {
    score += fitCurve(crop.minph,crop.optminph,crop.optmaxph,crop.maxph,(field.maxph+field.minph)/2);
  }

  score = score/3;
  return {score:score,issue:issue};
}

function findBestCrop(field,crops){
  results = new Array(0);
  //field = {maxtemp:42,mintemp:15,maxrain:1048.6,minrain:1048.6,maxph:6.8,minph:6.8};
  console.log(field);
  for (var crop of crops) {
    obj = compareCropWithField(crop,field);
    obj.cropname = crop.cropname;
    results.push(obj);
  }

  return results;
}

var exports = module.exports = {
  findBestCrop
};
