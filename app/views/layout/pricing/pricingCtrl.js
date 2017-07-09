'use strict';

angular.module('pricing', ['ngRoute'])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('', {
            templateUrl: 'layout/pricing/pricing-tpl.html',
            controller: 'PricingCtrl',
            controllerAs: 'vm'
        });
    }])

    .controller('PricingCtrl', [function() {
        var vm = this;
    }]);