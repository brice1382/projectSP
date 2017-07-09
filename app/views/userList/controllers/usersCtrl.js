(function() {
    'use strict';

    angular
        .module('userList')
        .controller('UsersCtrl', ['Users', function(Users) {
                var vm = this;

                vm.users = Users.query();
                vm.orderProp = 'userId';
        }]);
})();

