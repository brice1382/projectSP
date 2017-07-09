(function () {
    'use strict';

    angular
        .module('register', ['ngRoute'])
        .controller('RegisterCtrl', ['$scope', '$rootScope', '$http', 'alert', function ($scope, $rootScope, $http, alert) {
            $scope.submit = function () {
                var url = 'http://localhost:8000';
                var user = {
                    email: $scope.email,
                    password: $scope.password
                };
                $http.post(url, user).then(function () {
                    if(success) {
                        swal({
                            title: 'Success',
                            type: 'success',
                            text: 'Ok!!! \r\n' + 'You are now registered.'
                        })
                    } else {
                        swal({
                            title: 'Warning',
                            type: 'warning',
                            text: 'Uh Oh!!! \r\n' + 'There was a problem registering.'
                        })
                    }
                })
            };

            var getVersion = function (createdDate, username, password) {
                username = $scope.username;
                createdDate = new Date().toLocaleString();
                version = ver.version;
                var newVersion = semver.inc(version, 'patch');

                return {
                    createdDate: createdDate,
                    Version: newVersion
                };
            };

            $scope.testing = function (username, password, createdDate, obj) {
                username = 'brice721';
                username = $scope.username;
                password = $scope.password;
                createdDate = new Date().toLocaleString();

                obj = {username: username, password: password, createdDate: createdDate};
                fs.writeJson('./app/userData/userData.json', obj);
            };
        }]);
})();

