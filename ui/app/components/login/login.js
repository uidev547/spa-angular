/**
 * Created by Kiran.
 */


angular.module('app.controllers')
.config(['$stateProvider', function ($stateProvider) {
    $stateProvider
    .state('login', {
      url: '/login',
      templateUrl:  uiBaseUrl + '/views/login.html',
      controller: 'LoginCtrl',
      reloadOnSearch: false
    });
}])
.controller('LoginCtrl', [
    '$scope',
    'httpClient',
    'UserModel',
    '$state',
    function (
     $scope,
     httpClient,
     UserModel,
     $state
    ) {
        'use strict';
        


        $scope.submit = function  ( e ) {
            e.preventDefault();
            var formData = $scope.loginForm;
            httpClient.post( '/auth/login', formData  )
            .then( function  ( res ) {
                UserModel.user = res;
                $state.go( 'home' );
            }, function  ( err ) {
                console.log( err );
            });
        };

  
    }
]);
