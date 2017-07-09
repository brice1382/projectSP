(function(){
    'use strict';

    angular
        .module('myApp')
        .run(run);

    run.$inject = ['$rootScope', 'authService', 'FlashManager', 'lock', 'authManager'];

    function run($rootScope, authService, FlashManager, lock, authManager) {

        $rootScope.authService = authService;

        $rootScope.FlashManager = FlashManager;

        authService.registerAuthenticationListener();

        authManager.checkAuthOnRefresh();

        lock.interceptHash();

        // FlashManager.checkOnRefresh();
    }
})();