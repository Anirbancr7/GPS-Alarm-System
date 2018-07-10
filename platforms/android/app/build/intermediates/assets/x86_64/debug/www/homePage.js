let getbtn=document.getElementsByClassName("btn");
var getInput;
var ipObject;
var taskId;
var location;
var details;
var getData=[];
var id;
    
getbtn[0].addEventListener("click",function(){
    
    navigator.geolocation.getCurrentPosition(function onSuccess(position) 
    {
        window.location="addTask.html"  
    }, 
    function onError(error) 
    {
        if(error.code===1)
        	alert("Please turn on your GPS")
    });

})

getbtn[1].addEventListener("click",function(){
    
    navigator.geolocation.getCurrentPosition(function onSuccess(position) 
    {
        window.location="doneTask.html"  
    }, 
    function onError(error) 
    {
        if(error.code===1)
        	alert("Please turn on your GPS")
    });

})

getbtn[2].addEventListener("click",function()
{
	window.location="finishTask.html"
})

getbtn[3].addEventListener("click",function()
{
	window.location="editTask.html"
})