(function () {
    'use strict';

    angular
        .module('deps', ['ngRoute', 'ngMaterial'])
        .controller('BusinessCardController', function ($scope) {
            $scope.user = {
                name: 'Tanay Pant',
                occupation: 'White Hat',
                email: 'tanay1337@gmail.com',
                link1: 'www.cyberwizards.org',
                tusername: 'tanay1337',
                companylogo: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/123941/logo.png',
                color1: '#c0c0c0',
                color2: 'white',
                textcolor1: '#287cc2',
                textcolor2: '#666',
                fusername: '...',
                gusername: '+TanayPant1337'
            }
        })
/** */
        .controller('MaterialCtrl', ['date', function (date) {
            var vm = this;

            vm.myDate = new Date();
            vm.isOpen = false;
        }])

        .controller('SelectOptGroupController', ['$scope', function ($scope) {
            var vm = this;

            $scope.systems = [
                "Linux",
                "OS X",
                "Windows",
                "Virtual"
            ];
            $scope.browsers = [
                "Chrome",
                "Firefox",
                "Opera",
                "IE"
            ];
            $scope.frameworks = [
                {category: 'windows', name: 'Net Core'},
                {category: 'windows', name: 'ASP.NET MVC'},
                {category: 'windows', name: 'WebAPI'},
                {category: 'windows', name: 'Entity Framework'},
                {category: 'backend', name: 'C-Sharp'},
                {category: 'backend', name: 'Java'},
                {category: 'backend', name: 'ExpressJS'},
                {category: 'other', name: 'AngularJS'},
                {category: 'other', name: 'AngularJS 2'},
                {category: 'other', name: 'REACT JS'},
                {category: 'other', name: 'WordPress'}
            ];
            $scope.selectedFrameworks = [];
            $scope.printSelectedFrameworks = function printSelectedFrameworks() {
                var numberOfFrameworks = this.selectedFrameworks.length;

                // If there is more than one topping, we add an 'and'
                // to be gramatically correct. If there are 3+ toppings
                // we also add an oxford comma.
                if (numberOfFrameworks > 1) {
                    var needsOxfordComma = numberOfFrameworks > 2;
                    var lastFrameworkConjunction = (needsOxfordComma ? ',' : '') + ' and ';
                    var lastFramework = lastFrameworkConjunction +
                        this.selectedFrameworks[this.selectedFrameworks.length - 1];
                    return this.selectedFrameworks.slice(0, -1).join(', ') + lastFramework;
                }

                return this.selectedFrameworks.join('');
            };
        }]);
})();

