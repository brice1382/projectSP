(function () {
    'use strict';

    angular
        .module('upload', ['ngRoute'])
        .controller('UploadCtrl', ['$scope', 'authService', function ($scope, authService) {
            var vm = this;

            $scope.title = "Upload";

            $scope.testButton = function (length) {
                var text = '';
                var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
                length = 20;
                for (var i = 0; i < length; i++) {
                    text += possible.charAt(Math.floor(Math.random() * possible.length));
                    sessionStorage.setItem('pwdToken', text);
                    if (sessionStorage.getItem('pwdToken') != null) {
                        var pass = btoa('andrew22900');
                        var genHash = (pass + sessionStorage.getItem('pwdToken')).replace(/=/, '');
                        sessionStorage.setItem('passHash', genHash);
                        console.log(genHash);
                    }
                }
                return text;
            };

            $scope.logs = function (currentUser) {
                var name = 'Sarah';
                sessionStorage.setItem('name', name);
                var uname = sessionStorage.getItem('name');
                var hash = sessionStorage.getItem('passHash');
                var tok = sessionStorage.getItem('pwdToken');
                var password = $scope.password;
                console.log(password);
                var g = JSON.stringify(password);
                console.log(g);
                var d = btoa(password);
                var final = (d + tok).replace(/=/, '');
                debugger;
                if (final === hash) {
                    currentUser = uname;
                    alert('Hello, ' + currentUser + '!');
                    console.log(final + ' : ' + hash);
                    console.log('true');
                } else {
                    alert('Password Incorrect');
                    console.log(final);
                }
            };

            $scope.guid = function() {
                authService.createGuid();
                var dick = localStorage.getItem('guid');
                swal({
                    title: 'Nailed IT',
                    type: 'success',
                    text: 'Successfully created a guid.' + '\r\n' + dick,
                    showConfirmButton: true,
                    allowOutsideClick: false
                });
            };

            $scope.clear = function () {
                authService.clearGuid();
                swal('Local Storage Is Cleared.')
            }
        }]);
})();

