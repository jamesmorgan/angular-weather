app.service('YahooWeatherService', function YahooWeatherService($rootScope, $http, $log) {
  var self = this;
  
	// Yahoo WOEID Geo Lookup API vars
	var GEOCODE_ENDPOINT = "http://where.yahooapis.com/geocode";
	
	var YAHOO_GEO_APP_ID = "v6wFWp30"; 
	var APP_ID = "&appid=" + YAHOO_GEO_APP_ID;
	var LOCATION = "?location=";
	var FLAGS = "&flags=J&gflags=R";
		
	// Yahoo Weather API vars
	var FORECAST_ENDPOINT = " http://weather.yahooapis.com/forecastrss";

	var CELCIUS = "&u=c";
	var FAHRENHEIT = "&u=f";
	var WOEID = "?w=";
	
	self.getWOEID = function(position, successCallback, failureCallback) {
		var endPoint = GEOCODE_ENDPOINT + LOCATION + position.latitude + "," + position.longitude + FLAGS + APP_ID;
		$log.info("End point = " + endPoint);
		
		$http.get(endPoint)
			.success(function(data, status, headers, config) {
				successCallback(data);
			})
			.error(function(data, status, headers, config) {
				failureCallback(status);
			});
	}
	
	self.getWeatherForWOEID = function(woeid, successCallback, failureCallback) {
		var endPoint = FORECAST_ENDPOINT + WOEID + woeid;
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
