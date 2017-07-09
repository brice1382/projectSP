(function(){
    'use strict';

    angular
        .module('login', [])
        .controller('LoginCtrl', ['authService', function(authService){
            var vm = this;

            vm.authService = authService;
        }]);
})();

