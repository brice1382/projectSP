(function() {
    'use strict';

    angular
        .module('userDetails', ['ngRoute', 'user-core'])
        .controller('UserDetailsCtrl', ['$routeParams', 'Users', function($routeParams, Users) {
            var vm = this;

            vm.user = Users.get({userId: $routeParams.userId}, function(user) {
                vm.setImage(user.images[0]);
            });

            vm.setImage = function(imageUrl) {
                vm.mainImageUrl = imageUrl;
            };
        }]);
})();

