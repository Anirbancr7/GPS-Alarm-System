getData=JSON.parse(localStorage.getItem("ipData"));

    var map = new google.maps.Map(document.getElementById('geomap'), {
      zoom: 10,
      center: new google.maps.LatLng(22.5726, 88.3639),
      mapTypeId: google.maps.MapTypeId.ROADMAP
    });

    var infowindow = new google.maps.InfoWindow();

    var marker, i;

    for (i = 0; i < getData.length; i++) {  
      marker = new google.maps.Marker({
        position: new google.maps.LatLng(getData[i].lat, getData[i].lng),
        map: map
      });
       
      var circle = new google.maps.Circle({
    map: map,
    radius: 1000,    // 10 miles in metres
    fillColor: '#AA0000'
  });
circle.bindTo('center', marker, 'position');


      google.maps.event.addListener(marker, 'click', (function(marker, i) {
        return function() {
          infowindow.setContent(getData[i].details);
          infowindow.open(map, marker);
        }
      })(marker, i));
      
    }

  document.getElementById("doneLocation").addEventListener("click",function(){
  	
  window.location="index.html";

})
  function notif() {
    var data=JSON.parse(localStorage.getItem("ipData"));
    for(var i=0;i<data.length;i++){
    cordova.plugins.notification.local.schedule({
        title: data[i].details,
        trigger: {
            type: 'location',
            center: [data[i].lat, data[i].lng],
            radius: 3000,
            notifyOnEntry: true
        }
    });
  }
}
