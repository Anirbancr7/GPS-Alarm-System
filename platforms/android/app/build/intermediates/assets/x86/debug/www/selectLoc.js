 var searchBox=document.getElementById("search_location");
 getData=JSON.parse(localStorage.getItem("ipData"));
 searchBox.value=getData[getData.length-1].location;
document.getElementById("doneLocation").addEventListener("click",function(){

  getData=JSON.parse(localStorage.getItem("ipData"));
  getData[getData.length-1].location=document.getElementsByClassName("search_addr")[0].value;
  getData[getData.length-1].lat=document.getElementsByClassName("search_latitude")[0].value;
  getData[getData.length-1].lng=document.getElementsByClassName("search_longitude")[0].value
  localStorage.setItem("ipData", JSON.stringify(getData));
  window.location="index.html";

})
 
var geocoder;
var map;
var marker;

/*
 * Google Map with marker
 */
function initialize() {
    var initialLat = $('.search_latitude').val();
    var initialLong = $('.search_longitude').val();
    initialLat = initialLat?initialLat:22.5726;
    initialLong = initialLong?initialLong:88.3639;

    var latlng = new google.maps.LatLng(initialLat, initialLong);
    var options = {
        zoom: 15,
        center: latlng,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    map = new google.maps.Map(document.getElementById("geomap"), options);

    geocoder = new google.maps.Geocoder();

    marker = new google.maps.Marker({
        map: map,
        draggable: true,
        position: latlng
    });

    google.maps.event.addListener(marker, "dragend", function () {
        var point = marker.getPosition();
        map.panTo(point);
        geocoder.geocode({'latLng': marker.getPosition()}, function (results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
                map.setCenter(results[0].geometry.location);
                marker.setPosition(results[0].geometry.location);
                $('.search_addr').val(results[0].formatted_address);
                $('.search_latitude').val(marker.getPosition().lat());
                $('.search_longitude').val(marker.getPosition().lng());
            }
        });
    });

}

$(document).ready(function () {
    //load google map
    initialize();
    
    /*
     * autocomplete location search
     */
    var PostCodeid = '#search_location';
    $(function () {
        $(PostCodeid).autocomplete({
            source: function (request, response) {
                geocoder.geocode({
                    'address': request.term
                }, function (results, status) {
                    response($.map(results, function (item) {
                        return {
                            label: item.formatted_address,
                            value: item.formatted_address,
                            lat: item.geometry.location.lat(),
                            lon: item.geometry.location.lng()
                        };
                    }));
                });
            },
            select: function (event, ui) {
                $('.search_addr').val(ui.item.value);
                $('.search_latitude').val(ui.item.lat);
                $('.search_longitude').val(ui.item.lon);
                var latlng = new google.maps.LatLng(ui.item.lat, ui.item.lon);
                marker.setPosition(latlng);
                initialize();
            }
        });
    });
    
    /*
     * Point location on google map
     */
    $('.get_map').click(function (e) {
        var address = $(PostCodeid).val();
        geocoder.geocode({'address': address}, function (results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
                map.setCenter(results[0].geometry.location);
                marker.setPosition(results[0].geometry.location);
                $('.search_addr').val(results[0].formatted_address);
                $('.search_latitude').val(marker.getPosition().lat());
                $('.search_longitude').val(marker.getPosition().lng());
            } else {
                alert("Geocode was not successful for the following reason: " + status);
            }
        });
        e.preventDefault();
    });

    //Add listener to marker for reverse geocoding
    google.maps.event.addListener(marker, 'drag', function () {
        geocoder.geocode({'latLng': marker.getPosition()}, function (results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
                if (results[0]) {
                    $('.search_addr').val(results[0].formatted_address);
                    $('.search_latitude').val(marker.getPosition().lat());
                    $('.search_longitude').val(marker.getPosition().lng());
                }
            }
        });
    });
});

document.getElementById("d").addEventListener("click",function(){
cordova.plugins.notification.local.schedule({
    title: 'Welcome to our office',
    trigger: {
        type: 'location',
        center: [22.0589029, 88.072634],
        radius: 15,
        notifyOnEntry: true
    }
});
})