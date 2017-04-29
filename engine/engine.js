


function compareCropWithField(crop,field){

  if(crop.maxHumid<field.maxHumid){
    cropVib.issue.push('highHumid')
    //Get difference, need to decide how to weight it
  } else if(crop.minHumid<field.minHumid) {
    cropVib.issue.push('lowHumid')
    //Get difference, need to decide how to weight it
  }


  return cropVib;
}
