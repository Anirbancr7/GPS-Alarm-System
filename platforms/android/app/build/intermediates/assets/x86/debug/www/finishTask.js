var id;
// console.log(id);
document.getElementById("idSearch").addEventListener("click",function(){
	id=document.getElementById("taskId").value;
	getData=JSON.parse(localStorage.getItem("ipData"));
	for(var i=0;i<getData.length;i++)
	{
		if(getData[i].taskId===id)
		{
			document.getElementById("locIpBox").value=getData[i].location;
			document.getElementById("detailsIpBox").value=getData[i].details;
			break;
		}
	}	

})

document.getElementById("finishSubmit").addEventListener("click",function(){

	getData=JSON.parse(localStorage.getItem("ipData"));
	for(var i=0;i<getData.length;i++)
	{
		if(getData[i].taskId===id)
		{
			getData.splice(i,1);
			localStorage.setItem("ipData", JSON.stringify(getData));
			break;
		}
	}
	document.getElementById("taskId").value="";
	document.getElementById("locIpBox").value="";
	document.getElementById("detailsIpBox").value="";
	window.location="index.html"
})