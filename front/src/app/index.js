'use strict';

var app = angular.module('antdev', ['ngAnimate', 'ngCookies', 'ngTouch', 'ngSanitize', 'ngResource', 'ui.router', 'ui.bootstrap']);


app.config(function ($stateProvider, $urlRouterProvider) {
	$stateProvider
	  .state('home', {
	    url: '/',
	    templateUrl: 'app/main/main.html',
	    controller: 'MainCtrl'
	  });

	$stateProvider
	  .state('login', {
	    url: '/login',
	    templateUrl: 'app/login/login.html',
	    controller: 'LoginController'
	  });

	$urlRouterProvider.otherwise('/login');
});

app.config(['$httpProvider', function($httpProvider) {
    $httpProvider.defaults.useXDomain = true;
    //$httpProvider.defaults.withCredentials = true;
    //delete $httpProvider.defaults.headers.common['X-Requested-With'];
}]);

app.factory("AuthenticationService", function($http, $location) {
	return{
		login: function(credentials) {
			console.log("login console log.");
			return $http.post("http://api.antegraid.dev/index.php/auth/login", credentials);
			/*return $http({
		        url: 'http://api.antegraid.dev/index.php/auth/login',
		        method: "POST",
		        data: JSON.stringify(credentials),
		    });*/
		},
		logout: function() {
			return $http.post("http://api.antegraid.dev/auth/logout");
		}
	};
});


app.controller("LoginController", function($scope, $location, AuthenticationService) {
  $scope.credentials = { email: "", password: "" };
  console.log("login controller console log.");
  $scope.login = function() {
  	console.log("login function console log.");
    AuthenticationService.login($scope.credentials).success(function() {
      //$location.path('/');
      console.log("success!");
    });
  };
});
