

angular.module('app.directives')
.config(['$stateProvider', function ($stateProvider) {
    $stateProvider
    .state('users', {
      url: '/users',
      templateUrl:  uiBaseUrl + '/views/users.html',
      controller: 'UsersCtrl',
      reloadOnSearch: false
    });
}])
.controller('UsersCtrl', [
    '$scope',
    'httpClient',
    function  (
        $scope,
        httpClient
    ) {
        
        'use strict';
        httpClient.get( '/users' )
        .then( function( res ) {
            $scope.users = res;
        }, function( err ) {
            console.log( err );
        } );
    } 
] ) ;
