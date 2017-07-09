(function () {

    'use strict';

    angular
        .module('myApp')
        .service('authService', authService);

    authService.$inject = ['lock', 'authManager'];

    function authService(lock, authManager, jwtHelper) {

        function login() {
            lock.show();
        }

        // Logging out just requires removing the user's
        // id_token and profile
        function logout() {
            localStorage.removeItem('id_token');
            authManager.unauthenticate();
        }

        // Set up the logic for when a user authenticates
        // This method is called from app.run.js
        function registerAuthenticationListener() {
            lock.on('authenticated', function (authResult) {
                localStorage.setItem('id_token', authResult.idToken);
                authManager.authenticate();
            });

            lock.on('authorization_error', function (err) {
                console.log(err);
            });
        }

        function checkAuthOnRefresh() {
            var token = localStorage.getItem('id_token');
            if (token) {
                if (!jwtHelper.isTokenExpired(token)) {
                    if (!$rootScope.isAuthenticated) {
                        authManager.authenticate();
                    }
                }
            }
        }

        function createGuid() {
            function guid() {
                return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
                    s4() + '-' + s4() + s4() + s4();
            }

            function s4() {
                return Math.floor((1 + Math.random()) * 0x10000)
                    .toString(16)
                    .substring(1);
            }
            var Guid = guid();
            console.log(Guid);
            localStorage.setItem('guid', Guid);
            return Guid;
        }

        function clearGuid() {
            localStorage.removeItem('guid')
        }


        return {
            login: login,
            logout: logout,
            registerAuthenticationListener: registerAuthenticationListener,
            checkAuthOnRefresh: checkAuthOnRefresh,
            createGuid: createGuid,
            clearGuid: clearGuid
        };

        // cookie exp. exp: Math.floor(Date.now() / 1000) + ((60 * 60 * 24) * 7) // One week
    }
})();
