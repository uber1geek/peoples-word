var x = document.getElementById("UserLocation");	
var geocoder;
var map;
var infowindow = new google.maps.InfoWindow();
var marker;
var writeStoryLink = document.getElementById("WriteStoryLink");

function initialize() {
	geocoder = new google.maps.Geocoder();
  	//var latlng = new google.maps.LatLng(40.730885,-73.997383);
  	var latlng = new google.maps.LatLng(0.0,0.0);
	var mapOptions = {
    		zoom: 1,
    		center: latlng,
    		mapTypeId: 'roadmap'
  	}
	mapCanvas = document.getElementById("map-canvas");
  	map = new google.maps.Map(mapCanvas, mapOptions);
}

function submitAddressForm(address) {
	var addressForm = document.createElement("form");
	addressForm.setAttribute('method',"post");
	addressForm.setAttribute('action',"./new-post/");

	var addressText = document.createElement("input"); //input element, text
	addressText.setAttribute('type',"text");
	addressText.setAttribute('name',"address");
	addressText.setAttribute('value', address);


	addressForm.appendChild(addressText);

	addressForm.submit();
}


function showPosition(position) {
  //x.innerHTML = "Latitude: " + position.coords.latitude + " Longitude: " + position.coords.longitude;
  //var input = document.getElementById('latlng').value;
  //var latlngStr = input.split(',', 2);
  var lat = position.coords.latitude;
  var lng = position.coords.longitude;
  var latlng = new google.maps.LatLng(lat, lng);
  geocoder.geocode({'latLng': latlng}, function(results, status) {
    if (status == google.maps.GeocoderStatus.OK) {
      if (results[1]) {
        map.setZoom(11);
        marker = new google.maps.Marker({
            position: latlng,
            map: map
        });
        infowindow.setContent(results[1].formatted_address);
        infowindow.open(map, marker);
	x.innerHTML = "  " + results[1].formatted_address + "  ";
	writeStoryLink.innerHTML = "Write a Story";
	//writeStoryLink.setAttribute('onclick','location.href='+ '\''+ document.URL +'new-post?address='+ '\"' + encodeURIComponent(results[1].formatted_address) + '\"' + '\'');
	writeStoryLink.setAttribute('onclick', 'submitAddressForm('+ '\"' + results[1].formatted_address + '\"' +')');
	} else {
        alert('No results found');
      }
    } else {
      alert('Geocoder failed due to: ' + status);
    }
  });
}

function showError(error) {
	switch(error.code) {
        	case error.PERMISSION_DENIED:
                	x.innerHTML = "User denied the request for Geolocation."
                        break;
                case error.POSITION_UNAVAILABLE:
                	x.innerHTML = "Location information is unavailable."
                	break;
               	case error.TIMEOUT:
                	x.innerHTML = "The request to get user location timed out."
                        break;
               	case error.UNKNOWN_ERROR:
                	x.innerHTML = "An unknown error occurred."
               		break;
	}
}



function getLocation() {
	if (navigator.geolocation) {
       		navigator.geolocation.getCurrentPosition(showPosition,showError,{enableHighAccuracy:true,maximumAge:3600000,timeout:10000});
    	} else { 
        	x.innerHTML = "Geolocation is not supported by this browser.";
    	}
}

google.maps.event.addDomListener(window, 'load', initialize);


var input = document.getElementById('UserInput');
var options = {
  types: ['(regions)']
};

autocomplete = new google.maps.places.Autocomplete(input, options);
