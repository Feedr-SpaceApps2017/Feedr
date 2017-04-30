
function addFarmToDisplay(farmName){
  tbl = d.getElementById("farmTable");
  num = tbl.dataset.num;
  num++;
  tbl.dataset.num = num;
  div = d.createElement("div");
  div.className = 'farm';
  inner = '<p onclick="fieldClick(\'farm#\')" id="farm#">'+farmName+'</p></div>';
  innerE = inner.replace(/#/g, num);
  div.innerHTML = innerE;
  tbl.appendChild(div);
}

function addCropToDisplay(crop){
  tbl = d.getElementById("cropList");
  num = tbl.dataset.num;
  num++;
  tbl.dataset.num = num;
  div = d.createElement("div");
  div.className = 'farm';
  div.innerHTML = '<p>'+crop.cropname + ': '+crop.score + ': ' +crop.issue+'</p>';
  tbl.appendChild(div);
}

function fieldClick(id){
  /* if (d.getElementById(id).innerHTML == 'remove_circle_outline'){
  z = d.getElementById(id).parentNode;
  z.parentNode.removeChild(z);
  // d.getElementById("ingTable").dataset.num--; TODO just dropping this by one causes problems
} else*/

if (selectedFarm == id){
  d.getElementById(selectedFarm).style = "color: black;";
  selectedFarm = '';
} else {
  if (selectedFarm != '' && d.getElementById(selectedFarm) != null){
    d.getElementById(selectedFarm).style = "color: black;";
  }
  selectedFarm = id;
  d.getElementById(id).style = "color: #FB8C00;";
}
updateRightSide();
}

function keyUp(event){
  if (d.getElementById(activeId) != null && d.getElementById(activeId).innerHTML != "remove_circle_outline") {
    inn = d.getElementById(activeId).innerHTML;
    if (event.keyCode == 8){
      d.getElementById(activeId).innerHTML = inn.slice(0, -1);
      if (d.getElementById(activeId).innerHTML.length == 0 || d.getElementById(activeId).innerHTML == "Name"){
        /*TODO get the above to work, it dosnt it its called Name :( */
        d.getElementById(activeId).innerHTML = 'remove_circle_outline';
        d.getElementById(activeId).className = "material-icons md-light md-24";
      }
    }
  }
}

/* TODO limit field size */
function keyPress(e){
  el = d.getElementById(activeId);
  if (el != null) {
    if (el.innerHTML == "remove_circle_outline" || el.innerHTML == "Name") {
      el.innerHTML = String.fromCharCode(e.which);
      el.className = "";
    } else {
      el.innerHTML += String.fromCharCode(e.which);
    }
  }
}

function getFarmList(){
  $.ajax({
    url: "/getfarmlist",
    success: function( result ) {
      farmslist = result;

      if(farmslist == null){
        d.getElementById('farmTable').innerHTML = '<p>Failed to get farm list</p>';
      } else {
        farmslist.forEach(function(farm) {

          // console.log(farmslist);
          //console.log(farm);
          // console.log(farm.farm.name);
          addFarmToDisplay(farm.name);
        })
        updateRightSide();
      }
    }
  });
}

function getCropList(farm){
  $.ajax({
    url: "/cropcheck?"+farm,
    success: function( result ) {
      croplist = result;

      if(croplist == null){
        d.getElementById('cropList').innerHTML = '<p>Failed to get crop list</p>';
      } else {
        tbl = d.getElementById("farmTable").innerHTML='';
        croplist.forEach(function(crop) {
          addCropToDisplay(crop.name);
        })
      }
    }
  });
}

function updateRightSide(){
  var currentfarm;
  if(selectedFarm==''){
    d.getElementById('farmDataTable').innerHTML = '<p>Select A Farm</p>';
    return;
  }
  farmslist.forEach(function(farm) {
    if(farm.name==d.getElementById(selectedFarm).innerHTML){
      currentfarm = farm;
    }
  })
    if(currentfarm == null){
      d.getElementById('farmDataTable').innerHTML = '<p>Select A Farm</p>';
    } else {
      d.getElementById('farmDataTable').innerHTML = '';
      addData('mintemp','Min Temperature: '+currentfarm.mintemp);
      addData('maxtemp','Max Temperature: '+currentfarm.maxtemp);
      addData('minrain','Min Rainfall: '+currentfarm.minrain);
      addData('maxtemp','Max Temperature: '+currentfarm.maxrain);
      addData('minph','Min Ph: '+currentfarm.minph);
      addData('maxph','Max ph: '+currentfarm.maxph);
    }
    getCropList(currentfarm);
}

function addData(shortName,text){
  tbl = d.getElementById("farmDataTable");
  temp = '<div class="farmData"><p onclick="fieldClick(\'#\')" id="#">@</p></div>';
  div = d.createElement("div");
  div.className = 'farmData';
  div.innerHTML = temp.replace(/#/g, shortName).replace(/@/g, text);
  tbl.appendChild(div);
}

window.onload = function(){
  d = document;
  activeId = '';
  selectedFarm = '';
  farmlist = [];
  getFarmList();

  d.onkeyup = function(e) {keyUp(e)};
  d.onkeypress = function(e) {keyPress(e)};
}
