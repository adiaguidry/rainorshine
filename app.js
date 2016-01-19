//module
var weatherApp = angular.module('weatherApp', ['ngRoute', 'ngResource']);

//route
weatherApp.config(function($routeProvider){
	$routeProvider
	.when('/', {
		templateUrl: 'pages/home.html',
		controller: 'homeCtrl'
	})
	.when('/weather',{
		templateUrl: 'pages/weather.html',
		controller: 'weatherCtrl'
	})
	.when('/weather/:days',{
		templateUrl: 'pages/weather.html',
		controller: 'weatherCtrl'
	})
})

//controllers

weatherApp.controller('homeCtrl', ['$scope','getWeather', function($scope, getWeather){
	$scope.city = getWeather.city;
	$scope.$watch('city', function(){
		getWeather.city = $scope.city;
	});

}]);
weatherApp.controller('weatherCtrl', ['$scope', '$resource', '$routeParams', 'getWeather',  function($scope, $resource, $routeParams, getWeather){
	$scope.city = getWeather.city;
	$scope.days = $routeParams.days || "3";
	$scope.weatherAPI = $resource("http://api.openweathermap.org/data/2.5/forecast/daily?APPID=7d1661161d11f0f43b9fd5f4f2a2f11b", {
		callback: 'JSON_CALLBACK'},{ get: {method: "JSONP"}});
	$scope.weatherResults = $scope.weatherAPI.get({q: $scope.city, cnt: $scope.days});
	$scope.convertToFahrenheit = function(degk){
		return Math.round(1.8 * (degk - 273) + 32);
	}

	$scope.convertToDate = function(date){
		return new Date (date * 1000);
	}
}]);

//services

weatherApp.service('getWeather', function(){
	this.city = "Murrieta, Ca";

	this.api_key = "http://api.openweathermap.org/data/2.5/forecast/daily?APPID=7d1661161d11f0f43b9fd5f4f2a2f11b";
});

