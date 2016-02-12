
angular.module('app.directives', []);
angular.module('app.restServices', []);
angular.module('app.controllers', [ 'app.directives', 'app.restServices' ]);
angular.module('app', ['ui.router', 'ui.bootstrap', 'app.controllers' ])
.config( ["$locationProvider", "$urlRouterProvider", function ( $locationProvider, $urlRouterProvider ) {
    $urlRouterProvider.otherwise('/');
    $locationProvider.html5Mode({
        enabled: true, requireBase: false
    });
}]);



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
    function  (
        $scope
    ) {
        'use strict';
        $scope.openMenu = function  ( e ) {
            e.preventDefault();
            document.body.classList.add( 'open-navigation' );
            document.body.appendChild( document.getElementById( 'navigation-mask' ) );
        };
        $scope.closeMenu = function  ( e ) {
            e.preventDefault();
            document.body.classList.remove( 'open-navigation' );
        };
    } 
] ) ;

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
    '$http',
    function (
     $scope,
     $http
    ) {
        'use strict';
        console.log( ' hi ' );
        var getInfo = function  () {
            $http.get( '/auth/current')
            .then(function  ( res ) {
                $scope.user = res.data;
                console.log( res );

            }, function  ( err ) {
                
                console.log( err );

            } );
        };
        getInfo();
        $scope.submit = function  ( e ) {
            e.preventDefault();
            var formData = $scope.loginForm;
            $http.post( '/auth/login', formData  )
            .then( function  ( res ) {
                $scope.user = res.data;
            }, function  ( err ) {
                console.log( err );
            });
        };

        $scope.logout = function( e ) {
            e.preventDefault();
            $http.get( '/auth/logout' )
            .then( function  ( res ) {
                console.log( res );
                $scope.user = null;
            }, function  ( err ) {
                console.log( err );
            });
        };  
  
    }
]);

angular.module('app.restServices').
    service('httpClient', [
        '$http',
        '$q',
        '$log',
        function ($http,
                  $q,
                  $log) {
            'use strict';
            this._req = function (method, url, body, canceller) {
                $log.info('request=' + url);
                return $q(function (resolve, reject) {
                    var success = function (data, status, headers, config) {
                        resolve({
                            data: data,
                            status: status,
                            headers: headers,
                            config: config
                        });
                    };

                    var error = function (data, status, headers, config) {
                        reject({
                            data: data,
                            status: status,
                            headers: headers,
                            config: config
                        });
                    };


                    var config = {};
                    if (canceller !== undefined) {
                        config = {timeout: canceller.promise};
                    }
    
                    switch (method) {
                        case 'GET':
                            $http.get(url, config).success(success).error(error);
                            break;
                        case 'PUT':
                            $http.put(url, body, config).success(success).error(error);
                            break;
                        case 'POST':
                            $http.post(url, body, config).success(success).error(error);
                            break;
                        case 'DELETE':
                            $http.delete(url, config).success(success).error(error);
                            break;
                        default:
                            reject({data: null, status: 400, headers: null, config: null});
                            break;
                    }
                });
            };

            this._get = function (url, canceller) {
                return this._req('GET', url, null, canceller);
            };

            this._put = function (url, body) {
                return this._req('POST', url, body);
            };

            this._post = function (url, body) {
                return this._req('POST', url, body);
            };

            this._delete = function (url) {
                return this._req('DELETE', url, null);
            };
        }
    ]);
