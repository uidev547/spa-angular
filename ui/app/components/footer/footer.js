

angular.module('app.directives')
.directive('appFooter', function () {
    return {
        restrict: 'AE',
        templateUrl: uiBaseUrl + '/views/footer.html',
        controller: 'FooterCtrl'
    };
})
.controller('FooterCtrl', [
    '$scope',
    function  (
        $scope
    ) {
        'use strict';
        console.log( 'hii' );
    } 
] ) ;
