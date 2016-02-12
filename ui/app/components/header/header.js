

angular.module('app.directives')
.directive('appHeader', function () {
    return {
        restrict: 'AE',
        templateUrl: uiBaseUrl + '/views/header.html',
        controller: 'HeaderCtrl'
    };
})
.controller('HeaderCtrl', [
    '$scope',
    'UserModel',
    'httpClient',
    function  (
        $scope,
        UserModel,
        httpClient
    ) {
        'use strict';
        $scope.userModel = UserModel;
        $scope.openMenu = function  ( e ) {
            e.preventDefault();
            document.body.classList.add( 'open-navigation' );
        };
        $scope.closeMenu = function  ( e ) {
            e.preventDefault();
            document.body.classList.remove( 'open-navigation' );
        };
        $scope.logout = function( e ) {
            e.preventDefault();
            httpClient.get( '/auth/logout' )
            .then( function  ( res ) {
                UserModel.user = null;
            }, function  ( err ) {
                console.log( err );
            });
        };
    } 
] ) ;
