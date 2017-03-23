// angular.module( 'hello',[])
//     .config(function( $httpProvider){
//         $httpProvider.defaults.headers.common["X-Requested-With"] = 'XMLHttpRequest';
//     })
//     .controller( 'home', function( $http){
//         var self = this;
//         self.login = function(){
//
//             var headers = self.credentials ? {authorization : "Basic " + btoa( self.credentials.username + ":" +  self.credentials.password)} : {};
//
//             $http.get('/resource', {headers:headers}).then(function( response){
//                 console.log('1');
//                 self.greeting = response.data;
//             });
//         };
//     })
(function(angular){
    'use strict'

    var app = angular.module('coimsApp', ['ui.router']);

    app.config(function($httpProvider){
        $httpProvider.defaults.headers.common["X-Requested-With"] = 'XMLHttpRequest';
    });

    app.config(function($stateProvider, $urlRouterProvider){
        $urlRouterProvider.otherwise("/");

        var helloState = {
            name: 'home',
            url: '/',
            templateUrl: '/html/home.html',
            controller: 'homeController'
        }
        var loginState = {
            name: 'login',
            url: '/login',
            templateUrl: '/html/login.html',
            controller: 'loginController'
        }

        $stateProvider.state(helloState);
        $stateProvider.state(loginState);
    });

    app.controller('mainController', function( $scope, $rootScope, $http, $state){
        $scope.logout = function(){
            $http.post('logout', {}).finally(function() {
                $rootScope.authenticated = false;
                $state.go("login");
            });
        };
    });

    app.controller('homeController', function( $scope, $rootScope, $http) {
        console.log( $rootScope.authenticated)
        if( $rootScope.authenticated){
            $http.get('/resource/').then(function(response) {
                $scope.greeting = response.data;
            })
        }
    });

    app.controller('loginController', function( $scope, $rootScope, $http, $state){

        var authenticate = function( credentials, callback){

            var headers = credentials ? {authorization : "Basic " + btoa(credentials.username + ":" + credentials.password)} : {};

            $http.get('/user', {headers : headers}).then(function(response) {
                if (response.data.name) {
                    console.log( "user call ok -> user find!");
                    $rootScope.authenticated = true;
                } else {
                    console.log( "user call ok -> no user");
                    $rootScope.authenticated = false;
                }
                callback && callback();
            }, function() {
                console.log( "user call fail");
                $rootScope.authenticated = false;
                callback && callback();
            });

        };

        authenticate();
        $scope.credentials = {};

        $scope.login = function(){
            authenticate( $scope.credentials, function() {
                if ( $rootScope.authenticated) {
                    $state.go("home");
                    self.error = false;
                } else {
                    $state.go("login");
                    self.error = true;
                }
            });
        };

    });

})(window.angular);