app.controller('MainContentController',

	function MainContentController($scope, $rootScope, $log, BrowserGeoService, YahooWeatherService) {
		
 		$scope.currentGeoPosition = null;
 		$scope.currentWOEIDData = null;
 		$scope.currentWeatherForWoeid = null;
 		$scope.lastError = "";
 		$scope.showWoeidJson = false;
		$scope.showForecastJson = false;
		
		$scope.init = function() {
			BrowserGeoService.getLocation();
		}
		
		$scope.clearLookups = function(){
	 		$scope.showWoeidJson = false;
			$scope.showForecastJson = false;
	 		$scope.currentGeoPosition = null;
	 		$scope.currentWOEIDData = null;
	 		$scope.currentWeatherForWoeid = null;
	 		$scope.lastError = "";
	 		$scope.init();
		}
 		
 		$scope.getWeatherForWOEID = function() {
 			YahooWeatherService.getWeatherForWOEID($scope.currentWOEIDData.ResultSet.Results[0].woeid,
  			function(data){
 					$log.info("Success : " + data);
	 				$scope.currentWeatherForWoeid = data;
	 			},
	 			function(status){
		 			$scope.currentWeatherForWoeid = null;
 					$log.info("Failure : " + status);
	 			});
 		}
 		
 		$scope.lookupWOEIDGeoPosition = function() {
 			YahooWeatherService.getWOEID($scope.currentGeoPosition, 
 				function(data){
 					$log.info("Success : " + data);
 					$scope.currentWOEIDData = data;
	 			},
	 			function(status){
		 			$scope.currentWOEIDData = null;
 					$log.info("Failure : " + status);
	 			});
 		}
 		
		$scope.$on("onBrowserGeoLocationFound", function(e, data){
			$log.info("onBrowserGeoLocationFound, latitude = " + data.latitude + " | longitude = " + data.longitude + " | timestamp = " + data.timestamp);
			$scope.$apply(function(){
				$scope.currentGeoPosition = data;
			});
		});
 	
		$scope.$on("onBrowserGeoLocationError", function(e, data){
			$log.info("onBrowserGeoLocationFound, error = " + data);
			$scope.lastError = data;
		});

	}
);
