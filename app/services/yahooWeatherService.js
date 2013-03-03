app.service('YahooWeatherService', function YahooWeatherService($rootScope, $http, $log) {
  var self = this;
  
	// Yahoo WOEID Geo Lookup API vars
	var GEOCODE_ENDPOINT = "http://where.yahooapis.com/geocode";
	
	var YAHOO_GEO_APP_ID = "v6wFWp30"; 
	var APP_ID = "&appid=" + YAHOO_GEO_APP_ID;
	var LOCATION = "?location=";
	var FLAGS = "&flags=J&gflags=R";
		
	//http://query.yahooapis.com/v1/public/yql?q=select item from weather.forecast where location="48907"&format=json

	// Yahoo Weather API vars
	var FORECAST_ENDPOINT = "http://query.yahooapis.com/v1/public/yql?q=";
	
	var FORECAST_YQL_OPEN 	= "select * from weather.forecast where woeid='";
	var FORECAST_YQL_CLOSE 	= "'&format=json";
	
	self.getWOEID = function(position, successCallback, failureCallback) {
		// This would be so much nicer in coffeescript!
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
		var endPoint = FORECAST_ENDPOINT + FORECAST_YQL_OPEN + woeid + FORECAST_YQL_CLOSE;
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
