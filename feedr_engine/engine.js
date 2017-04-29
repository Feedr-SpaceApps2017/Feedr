
function fitCurve(a,b,c,d, val){
  //abs_min, opt_min, opt_max, abs_max in order, value
  if(val>=a&&val<b){
    ans = (1/(math.sqrt(2)*(b-a)))*(val-a);
  } else if(val>=b&&val<c){
    ans = 1-((math.sqrt(2)-1)/(math.sqrt(2)*(c-b)^2))*(2*val-b-c)^2;
  } else if(val>=c&&val<d){
    ans = (1/(math.sqrt(2)*(c-d)))*(val-d);
  } else{
    ans = 0;
  }
  return ans;
}

function compareCropWithField(crop,field){
  score = 0;
  issue = new Array(0);

  if (crop.maxph<field.maxph){
    score-=3;
    issue.push('highph')
  } else if (crop.minph>field.minph){
    score-=3;
    issue.push('lowph')
  } else {
    score = fitCurve(crop.minph,crop.optminph,crop.optmaxph,crop.maxph,(field.maxph+field.minph)/2);
  }

  if (crop.maxrain<field.maxrain){
    score-=3;
    issue.push('highrain')
  } else if (crop.minrain>field.minrain){
    score-=3;
    issue.push('lowrain')
  } else {
    score = fitCurve(crop.minrain,crop.optminrain,crop.optmaxrain,crop.maxrain,(field.maxrain+field.minrain)/2);
  }

  if (crop.maxph<field.maxph){
    score-=3;
    issue.push('highph')
  } else if (crop.minph>field.minph){
    score-=3;
    issue.push('lowph')
  } else {
    score = fitCurve(crop.minph,crop.optminph,crop.optmaxph,crop.maxph,(field.maxph+field.minph)/2);
  }

  return {score,issue};
}

function findBestCrop(farm,crops){
  scores = new Array(0);

  


  console.log(crops);
}

var exports = module.exports = {
  findBestCrop
};
