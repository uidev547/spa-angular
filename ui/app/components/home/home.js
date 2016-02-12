

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
    'fileUpload',
    function  (
        $scope,
        fileUpload
    ) {
        
        $scope.upload = function  ( $event ) {
          var file = $scope.myFile;
          var uploadUrl = '/upload/partners';
          fileUpload.uploadFileToUrl(file, uploadUrl);

        };
    } 
] ) ;
