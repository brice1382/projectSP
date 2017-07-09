(function () {
    'use strict';

    angular
        .module('dashboard', [])
        .controller('DashboardCtrl', ['$scope', 'GoalService', 'FlashManager', function ($scope, GoalService, FlashManager) {
            var vm = this;

            vm.goals = GoalService.query();
            vm.orderProp = 'id';

            $scope.spacer = '\t\t';

            $scope.tasks = [
                {Id: 1, value: 'Move into mobile development.'},
                {Id: 2, value: 'Gain the knowledge to be able to mentor younger developers.'},
                {Id: 3, value: 'Use my knowledge of development to help impact my community in a positive way.'}
            ];

            /**
             * As this got larger I would separate it out into their own JSON files. For now here is faster to
             * implement and easier to do.
             */
            $scope.docs = [
                {
                    id: 1,
                    value: 'docPDFs/ProdResume.pdf',
                    link: '../../assets/ProdResume.pdf',
                    linkTitle: 'View/Download',
                    icon: 'https://png.icons8.com/pdf/color/48',
                    icon2: 'fa fa-user',
                    title: 'Brandon Rice | Web Developer Resume',
                    helper: 'References available upon request'
                }
            ];

            $scope.refs = [
                {
                    id: 1,
                    value: 'docPDFs/EF_CheatSheet.pdf',
                    link: '../../assets/EF_CheatSheet.pdf',
                    linkTitle: 'EF_CheatSheet',
                    icon: 'https://png.icons8.com/pdf/color/48',
                    icon2: 'fa fa-file',
                    title: 'Entity Framework Cheat Sheet',
                    helper: 'Great reference from the good folks at www.EntityFrameworkTutorial.com'
                },
                {
                    id: 2,
                    value: 'docPDFs/RestFlow.jpg',
                    link: '../../assets/RestFlow.jpg',
                    linkTitle: 'RestFlowVisual',
                    icon: 'https://png.icons8.com/jpg/color/48',
                    icon2: 'fa fa-file-image-o',
                    title: 'C Sharp Rest Flow',
                    helper: 'My visual reference of data flow using .NET'
                }
            ];

            // $scope.$on('$locationChangeStart', function () {
            //     FlashManager.unFlashify();
            // });


        }])

        .controller('GoalDetailsCtrl', ['$routeParams', 'GoalService', function ($routeParams, GoalService) {
            var vm = this;

            vm.goals = GoalService.get({id: $routeParams.id}, function (goals) {
                vm.setImage(goals.images[0]);
            });

            vm.setImage = function (imageUrl) {
                vm.mainImageUrl = imageUrl;
            };
        }])

        .controller('MyController', ['$scope', 'SearchService', '$http', function ($scope, SearchService, $http) {
            var vm = this;

            $scope.test = function () {


                $http.get('views/dashboard/user.json')
                    .then(function (data, status, headers) {
                        vm.username = 'brice721';

                        var parameters = {
                            username: vm.username
                        };
                        // var config = {
                        //     params: parameters
                        // };
                        $scope.Details = data;
                        console.clear();
                        localStorage.setItem('users', JSON.stringify(data));
                        var x = JSON.parse(localStorage.getItem('users'));
                        debugger;
                        // TODO: Right now the value for the username is hardcoded and it should be a variable. Figure out.
                        console.log('Name: ' + x.data.username.vm.username[0].name +
                            '\r\n' + 'Status: ' + x.status +
                            '\r\n' + 'Config: ' + x.config.headers.Accept +
                            '\r\n' + 'Status Text: ' + x.statusText);
                        document.getElementById('results').appendChild(document.createTextNode('Name: ' + x.data.username.afyan13[0].name +
                            '\r\n' + 'Status: ' + x.status +
                            '\r\n' + 'Headers: ' + x.config.headers.Accept +
                            '\r\n' + 'Status Text: ' + x.statusText));
                        console.log(data);
                    })
                    .finally(function (x, data, status, header, config) {
                        $scope.ResponseDetails = "Data: " + data +
                            "<hr />status: " + status +
                            "<hr />headers: " + header +
                            "<hr />config: " + config;
                    });
            };

            $scope.testies2 = function (data) {
                $http.get('views/dashboard/user.json').then(function (data) {
                    $scope.users = data;
                    var myObj = JSON.stringify(data);
                    console.log(myObj[0].username);
                });
            }
        }])

        .service('SearchService', ['$resource', function ($resource) {
            var sv = this;

            var apiResource = $resource('content', {}, {
                get: {
                    method: 'GET',
                    url: 'views/dashboard/user.json',
                    isArray: true
                }
            });

            sv.get = function (userId) {
                debugger;
                return apiResource.get({userId: userId}).$promise.then(function (user) {
                    sv.currentUser = user;
                    return user;
                });
            };
            // return $resource('app/views/dashboard/user.json', {}, {
            //     query: {
            //         method: 'GET',
            //         params: {username: username, password: password},
            //         isArray: true
            //     }
            // })
        }]);
})();

