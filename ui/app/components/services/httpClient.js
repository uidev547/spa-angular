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

                return $q(function (resolve, reject) {

                    var success = function (data, status, headers, config) {
                        /*resolve({
                            data: data,
                            status: status,
                            headers: headers,
                            config: config
                        });*/
                        resolve( data );

                    };

                    var error = function (data, status, headers, config) {
                        /*reject({
                            data: data,
                            status: status,
                            headers: headers,
                            config: config
                        });*/
                        reject( data );
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


            this.get = function (url, canceller) {
                return this._req('GET', url, null, canceller);
            };

            this.put = function (url, body) {
                return this._req('POST', url, body);
            };

            this.post = function (url, body) {
                return this._req('POST', url, body);
            };

            this.delete = function (url) {
                return this._req('DELETE', url, null);
            };
        }
    ]);
