angular.module('app.restServices')
    .directive('fileModel', ['$parse', function ($parse) {
        return {
            restrict: 'A',
            link: function(scope, element, attrs) {
                var model = $parse(attrs.fileModel);
                var modelSetter = model.assign;
                element.bind('change', function(){
                    scope.$apply(function(){
                        modelSetter(scope, element[0].files[0]);
                    });
                });
            }
        };
    }])
    .service('fileUpload', [
        '$http',
        function( $http ) {
            
            this.uploadFileToUrl = function( file, uploadUrl ) {
                var fd = new FormData();
                fd.append('file', file );
                $http.post(uploadUrl, fd, {
                    transformRequest: angular.identity,
                    headers: {'Content-Type': undefined}
                })
                .success(function( res ){
                    console.log( res );
                })
                .error(function( err ){
                    console.log( err );
                });

            };
        }
    ]);
