app.service('BrowserGeoService', function BrowserGeoService($rootScope, $log) {
  var self = this;
	
	self.getLocation = function() {
		$log.info("Looking up location");
		if (navigator.geolocation) {
		  navigator.geolocation.getCurrentPosition(showPosition, showError);
		} else{
			$log.warn("Geolocation is not supported by this browser.");
		}
	}
	
	/*
	## Property 	Description
	coords.latitude 	The latitude as a decimal number
	coords.longitude 	The longitude as a decimal number
	coords.accuracy 	The accuracy of position
	coords.altitude 	The altitude in meters above the mean sea level
	coords.altitudeAccuracy 	The altitude accuracy of position
	coords.heading 	The heading as degrees clockwise from North
	coords.speed 	The speed in meters per second
	timestamp 	The date/time of the response
	*/
	function showPosition(position) {
		$log.info("Location Found => Latitude: " + position.coords.latitude + " | Longitude: " + position.coords.longitude);
		$rootScope.$broadcast("onBrowserGeoLocationFound", {
			latitude: position.coords.latitude, 
			longitude: position.coords.longitude,
			timestamp: new Date(position.timestamp).toLocaleString()
		});
	}
	
	function showError(error)
  {
		switch(error.code) {
		  case error.PERMISSION_DENIED:
		    $rootScope.$broadcast("onBrowserGeoLocationError", "User denied the request for Geolocation.");
		    break;
		  case error.POSITION_UNAVAILABLE:
		    $rootScope.$broadcast("onBrowserGeoLocationError", "Location information is unavailable.");
		    break;
		  case error.TIMEOUT:
		    $rootScope.$broadcast("onBrowserGeoLocationError", "The request to get user location timed out.");
		    break;
		  case error.UNKNOWN_ERROR:
		    $rootScope.$broadcast("onBrowserGeoLocationError", "An unknown error occurred.");
		    break;
		  }
  }

});	
