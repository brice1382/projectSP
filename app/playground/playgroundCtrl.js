//
// var userCreds = function (x) {
//     var usr = 'brice821';
//     var pwd = 'betabee13';
//     var str = JSON.stringify(usr, pwd);
//     var creds = btoa(str);
//     x.push(creds);
// };
//
//
// function select(result) {
//     userCreds();
//     result = createBase64();
//     console.log('Function Ran' + result);
// }
//
// var createBase64 = function (creds, baseStr) {
//     debugger;
//     baseStr = btoa(JSON.stringify(creds));
//
//     console.log(baseStr);
//     return baseStr;
// };

(function () {
    'use strict';

    angular
        .module('playground', ['ngMaterial'])
        .controller('PlaygroundCtrl', ['$scope', function ($scope) {
            var vm = this;

            // vm.doNoMatch = null;
            // vm.error = null;
            // vm.success = null;

            var reset = function () {
                vm.username = '';
                vm.password = '';
                $scope.play.$setPristine();
            };

            vm.loginSim = function () {
                debugger;
                localStorage.setItem('current-user-username', vm.username);
                localStorage.setItem('current-user-password', vm.password);
                var currentUser = localStorage.getItem('current-user-username');
                swal({
                    title: 'Current User',
                    type: 'info',
                    text: 'Current User Is: ' + currentUser,
                    showConfirmButton: true,
                    showCancelButton: false
                },
                function (isConfirm) {
                    if (isConfirm) {
                        location.reload();
                        reset();
                    }
                });
            };

            vm.test = function () {
                if (vm.user === localStorage.getItem('current-user-username')) {
                    swal('It\'s a match.');
                } else {
                    swal('Go Fuck Yourself');
                }
            };
            // function changePassword() {
            //     if (vm.password !== vm.confirmPassword) {
            //         vm.error = null;
            //         vm.success = null;
            //         vm.doNoMatch = 'ERROR';
            //     } else {
            //         vm.doNoMatch = null;
            //         Auth.changePassword(vm.password).then(function () {
            //             vm.error = null;
            //             vm.success = 'OK';
            //         }).catch(function () {
            //             vm.success = null;
            //             vm.error = 'ERROR';
            //         });
            //     }
            // }

            // $scope.sessionData = {
            //     loggedInUser: sessionStorage.getItem('current-user-username'),
            //     currentUserRole: sessionStorage.getItem('current-user-role')
            // };
        }])

    .controller('MyAppCtrl', ['$scope', function($scope) {
        this.selectedYear = 0;
        this.years = [];
        this.items = [];
        var currentYear = new Date().getFullYear();
        var monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
            'July', 'August', 'September', 'October', 'November', 'December'];
        // Build a list of months over 20 years
        for (var y = currentYear; y >= (currentYear-20); y--) {
            this.years.push(y);
            this.items.push({year: y, text: y, header: true});
            for (var m = 11; m >= 0; m--) {
                this.items.push({year: y, month: m, text: monthNames[m]});
            }
        }
        // Whenever a different year is selected, scroll to that year
        $scope.$watch('ctrl.selectedYear', angular.bind(this, function(yearIndex) {
            var scrollYear = Math.floor(this.topIndex / 13);
            if(scrollYear !== yearIndex) {
                this.topIndex = yearIndex * 13;
            }
        }));
        // The selected year should follow the year that is at the top of the scroll container
        $scope.$watch('ctrl.topIndex', angular.bind(this, function(topIndex) {
            var scrollYear = Math.floor(topIndex / 13);
            this.selectedYear = scrollYear;
        }));
    }]);

})();