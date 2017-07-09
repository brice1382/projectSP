(function(){
    'use strict';

    angular
        .module('footer', ['ngRoute'])
        .config(['$routeProvider', function ($routeProvider) {
            $routeProvider.when('', {
                templateUrl: 'layout/footer/footer-tpl.html',
                controller: 'FooterCtrl',
                controllerAs: 'vm'
            });
        }])

        .controller('FooterCtrl', ['$scope', function($scope) {
            var vm = this;

            vm.date = new Date().getFullYear();

        }]);
})();

