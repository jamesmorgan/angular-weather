app.controller('MainContentController',

	function MainContentController($scope, $rootScope, $log, BrowserGeoService, MetwitWeatherService) {
		
 		$scope.currentGeoPosition = null;
 		$scope.currentWeather = null;
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
	 		$scope.currentWeather = null;
	 		$scope.lastError = "";
	 		$scope.init();
		}
 		
 		$scope.getWeather = function() {
 			MetwitWeatherService.getWeather($scope.currentGeoPosition,
  			function(data){
 					$log.info("Success : " + data);
	 				$scope.currentWeather = data;
	 			},
	 			function(status){
		 			$scope.currentWeather = null;
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
