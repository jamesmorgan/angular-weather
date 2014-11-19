app.service('MetwitWeatherService', function ($rootScope, $http, $log) {
  var self = this;
  
	// Metwit Weather API vars
	var FORECAST_ENDPOINT = "https://api.metwit.com/v2/weather/?";
	
	
    // https://api.metwit.com/v2/weather/?location_lat=45.45&location_lng=9.18
	self.getWeather = function(position, successCallback, failureCallback) {
		var endPoint = FORECAST_ENDPOINT + "location_lat=" + position.latitude + "&" + 
                                           "location_lng=" + position.longitude;
		$log.info("End point = " + endPoint);
		$http.get(endPoint)
			.success(function(data, status, headers, config) {
				successCallback(data);
			})
			.error(function(data, status, headers, config) {
				failureCallback(status);
			});
	}
	
});	
