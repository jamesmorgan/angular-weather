app.controller('MainContentController',

	function MainContentController($scope, $rootScope, $log, BrowserGeoService, YahooWeatherService) {
		
 		$scope.currentGeoPosition = null

 		$scope.currentWOEIDData = null
 		
		$scope.init = function() {
			BrowserGeoService.getLocation();
		}
 		
 		$scope.getWeatherForWOEID = function() {
 			YahooWeatherService.getWeatherForWOEID($scope.currentWOEIDData.ResultSet.Results[0].woeid,
  			function(data){
 					$log.info("Success : " + data);
	 			},
	 			function(status){
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
		});

	}
);
