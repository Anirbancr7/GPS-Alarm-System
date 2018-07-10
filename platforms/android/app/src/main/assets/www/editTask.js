var id;
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
document.getElementById("editSubmit").addEventListener("click",function(){
	id=document.getElementById("taskId").value;
	getData=JSON.parse(localStorage.getItem("ipData"));
	for(var i=0;i<getData.length;i++)
	{
		if(getData[i].taskId===id)
		{
			getData[i].location=document.getElementById("locIpBox").value;
			getData[i].details=document.getElementById("detailsIpBox").value;
			localStorage.setItem("ipData", JSON.stringify(getData));
			break;
		}
	}
	window.location="index.html"
	
})