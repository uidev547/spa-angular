
angular.module('app.directives', []);
angular.module('app.restServices', []);
angular.module('app.controllers', [ 'app.directives', 'app.restServices' ]);
angular.module('app', ['ui.router', 'ui.bootstrap', 'app.controllers' ])
.config( function ( $locationProvider, $urlRouterProvider ) {
    $urlRouterProvider.otherwise('/');
    /*$locationProvider.html5Mode({
        enabled: true, requireBase: false
    });*/
});
