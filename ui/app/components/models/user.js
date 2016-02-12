angular.module('app.restServices').
    service('UserModel', [
        function () {
            'use strict';
            this.user = undefined;
        }
    ])
    .run( function  (UserModel,httpClient) {
        httpClient.get( '/auth/current')
        .then( function  ( res ) {
            UserModel.user = res;
        }, function  ( err ) {
            console.log( err );
        });
    });
