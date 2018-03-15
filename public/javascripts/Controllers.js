/**
 * Created by dazzysy on 5/20/2017.
 */
let app = angular.module('Controllers', ['ngResource','ngRoute']);

app.config(['$routeProvider', function($routeProvider){
    $routeProvider
        .when('/', {
            templateUrl: 'partials/HomePage.html'
        })
        .when('/Login', {
            templateUrl: 'partials/Login.html',
            contoller: 'LoginCtrl'
        })
        .otherwise({
            redirectTo: '/'
        });
}]);

app.controller('LoginCtrl', ['$scope', '$resource',
    function($scope, $resource){
        $scope.lala = function(){
            let resource = $resource('/users/');
            resource.get(function(res){
                console.log(res);
            });
        }
    }]);
