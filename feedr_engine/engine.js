

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

function addCrop(cropData){
  console.log(cropData);
}

var exports = module.exports = {
  addCrop
};
