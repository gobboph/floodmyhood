
$("#address-form").on("submit", function(e) {
	console.log( $("#address").val() );
	codeAddress( $("#address").val() );
	return false;
});


var geocoder;
var elevator;
var map;

function initialize() {
	geocoder = new google.maps.Geocoder();
    elevator = new google.maps.ElevationService();

	var latlng = new google.maps.LatLng(-34.397, 150.644);
	var mapOptions = {
		zoom: 8,
		center: latlng
	}
	map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);
}

function codeAddress(address) {
	var address = document.getElementById("address").value;
	geocoder.geocode( { 'address': address}, function(results, status) {
		if (status == google.maps.GeocoderStatus.OK) {
			map.setCenter(results[0].geometry.location);
			map.setZoom(12);
			var marker = new google.maps.Marker({
				map: map,
				position: results[0].geometry.location
			});

			// elevation request
			var positionalRequest = {'locations':[results[0].geometry.location]};
			elevator.getElevationForLocations(positionalRequest, function(results, status) {
    			if (status == google.maps.ElevationStatus.OK) {
    				if (results[0]) {
    					$("#elevation").html(results[0].elevation+' meters');
    				}
    			} else {
    				alert("Elevation service failed due to: " + status);
    			}
    		});
		} else {
			alert("Geocode was not successful for the following reason: " + status);
		}
	});
}
