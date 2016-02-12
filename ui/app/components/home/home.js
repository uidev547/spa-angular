

angular.module('app.directives')
.config(['$stateProvider', function ($stateProvider) {
    $stateProvider
    .state('home', {
      url: '/',
      templateUrl:  uiBaseUrl + '/views/home.html',
      controller: 'HomeCtrl',
      reloadOnSearch: false
    });
}])
.controller('HomeCtrl', [
    '$scope',
    function  (
        $scope
    ) {
        
        console.log( 'hii' );
    } 
] ) ;
