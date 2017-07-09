(function(){
    'use strict';

    angular
        .module('navbar', ['ngRoute', 'ngMaterial'])
        .config(['$routeProvider', function($routeProvider) {
            $routeProvider.when('', {
                templateUrl: 'views/navbar/navbar-tpl.html',
                controller: 'NavbarCtrl',
                controllerAs: 'vm'
            });
        }]);
})();

