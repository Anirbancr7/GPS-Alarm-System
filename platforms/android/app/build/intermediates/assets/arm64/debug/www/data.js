
getInput=document.getElementsByClassName("ip");
document.getElementById("selectLocOne").addEventListener("click",function(){
	
    var arrayObj = JSON.parse(localStorage.getItem("ipData"));
    if(arrayObj == null)
    	arrayObj = [];
  	ipObject={
        taskId : getInput[0].value,
		location : getInput[1].value,
		details : getInput[2].value,
        lat:0,
        lng:0
    };
    arrayObj.push(ipObject);
    localStorage.setItem("ipData", JSON.stringify(arrayObj));
    window.location="selectLocation.html";
})


