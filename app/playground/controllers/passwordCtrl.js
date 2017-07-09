(function () {
    'use strict';

    angular
        .module('myApp')
        .controller('PasswordController', PasswordController);

    PasswordController.$inject = ['Auth', 'Principal'];

    function PasswordController(Auth, Principal) {
        var vm = this;

        vm.changePassword = changePassword;
        vm.doNoMatch = null;
        vm.error = null;
        vm.success = null;

        Principal.identity().then(function (account) {
            vm.account = account;
        });

        function changePassword() {
            if (vm.password !== vm.confirmPassword) {
                vm.error = null;
                vm.success = null;
                vm.doNoMatch = 'ERROR';
            } else {
                vm.doNoMatch = null;
                Auth.changePassword(vm.password).then(function () {
                    vm.error = null;
                    vm.success = 'OK';
                }).catch(function () {
                    vm.success = null;
                    vm.error = 'ERROR';
                });
            }
        }
    }
})();