(function () {
    'use strict';

    angular
        .module('forgotPassword', [])
        .controller('ForgotPasswordCtrl', ['$scope', '$http', function ($scope, $http) {
            $scope.sendData = function () {
                debugger;
                var data = $.param({
                    json: JSON.stringify({
                        from: $scope.fromEmail,
                        text: $scope.message
                    })
                });
                var config = {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                };
                $http({
                    method: 'GET',
                    url: '/api/send',
                    data: data,
                    config: config
                }).then(function successCallback(response) {
                    console.log(response);
                }, function errorCallback(response) {
                    console.log(response);
                });
            };
        }])
})();