(function(){
    'use strict';

    angular.module('navbar', ['ngMaterial'])
        .controller('NavbarCtrl', ['authService', '$scope', function (authService, $scope) {
            var vm = this;

            vm.authService = authService;

            $scope.list = function() {
                location.href = '#!/list';
            };

            $scope.dashboard = function() {
                location.href = '#!/dashboard';
            };

            $scope.users = function() {
                location.href = '#!/users';
            };

            $scope.upload = function() {
                location.href = '#!/upload';
            };

            $scope.contact = function() {
                location.href = '#!/contact';
            };

            $scope.home = function() {
                location.href = '#!/home';
            }
        }])

        .controller('FabCtrl', ['$scope',  function ($scope) {

            $scope.isOpen = false;

            $scope.fab = {
                isOpen: false,
                count: 0,
                selectedDirection: 'left',
                showTooltip: false,
                tipDirection: 'bottom'
            };

            $scope.delayTooltip = undefined;
            $scope.$watch('delayTooltip', function(val) {
                $scope.delayTooltip = parseInt(val, 10) || 0;
            });

        }]);
})();

