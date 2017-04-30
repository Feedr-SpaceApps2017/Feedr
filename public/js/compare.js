

function addFarmToDisplay(){
	tbl = d.getElementById("farmTable");
	num = tbl.dataset.num;
	num++;
	tbl.dataset.num = num;
	div = d.createElement("div");
	div.className = 'farm';
	inner = '<p onclick="fieldClick(\'farm#\')" id="farm#">Name</p> <div class="farmNo"><p onclick="fieldClick(\'idNo#\')" id="idNo#">Amnt</p></div>';
	innerE = inner.replace(/#/g, num);
	div.innerHTML = innerE;
	tbl.appendChild(div);
}

window.onload = function(){
    d = document;


}
