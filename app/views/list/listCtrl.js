(function () {
    'use strict';

    angular.module('list', [])
        .controller('ListCtrl', ['$scope', function ($scope) {
            $scope.title = 'Welcome to the Management Page.';

            $scope.products = [
                {
                    name: 'Equipment',
                    items: [
                        'Dust mop',
                        'Dust cloths and dusters',
                        'Rags, towels and soft cloths',
                        'Indoor broom',
                        'Outdoor broom',
                        'Vacuum',
                        'Wet mop',
                        'Toilet brush (and brush caddy)',
                        'Plunger',
                        'Spray bottles',
                        'Squirt bottles',
                        'Sponges',
                        'Scrub brush',
                        'Scraper',
                        'Toothbrush',
                        'Buckets',
                        'Rubber gloves',
                        'Cleaning apron',
                        'Cleaning caddy'
                    ]
                },
                {
                    name: 'Cleaners',
                    items: [
                        'All-purpose cleaner',
                        'Disinfectant cleaner',
                        'Glass cleaner',
                        'Abrasive cleaners of varying intensity (including a mild abrasive cleaner)',
                        'Mild detergent',
                        'Household ammonia',
                        'White vinegar',
                        'Baking soda',
                        'Chlorine bleach',
                        'Metal polishes (including for silver, copper, brass, chrome, stainless steel, and aluminum)',
                        'Furniture polishes',
                        'Spot carpet cleaner'
                    ]
                }
            ];

            $scope.list = [
                {
                    name: 'Information Gathering',
                    items: [
                        'Past Brand Experience',
                        'See Advertising and/or Store Exterior',
                        'Compare Advertising with Other Retailers',
                        'Check Website/Social Media/Online for Information',
                        'Evaluate Convenience or Accessiblity',
                        'Call Slumberland with Any Questions'
                    ]
                }, {
                    name: 'Store Arrival',
                    items: [
                        'Drive to Location',
                        'See Exterior, Signing & Lighting',
                        'Condition of Parking Lot & Landscaping',
                        'Entry Display',
                        'Event/Directional Signing',
                        'Ability to Navigate to Destination (Layout)',
                        'Personal Greeting'
                    ]
                }, {
                    name: 'Product Options/Destination',
                    items: [
                        'Walk to Destination',
                        'View Merchandise Assortment',
                        'Salesperson Asks Questions about Use',
                        'See, Touch & Experience Displays',
                        'Receive Product Presentation',
                        'Receive Service Presentation',
                        'Solutions Recommended'
                    ]
                }, {
                    name: 'Decision',
                    items: [
                        'Evaluate Need/Want to Solution Match',
                        'Merchandise Available',
                        'Understand Services',
                        'Invitation to Buy',
                        'Check Out (exchange information)',
                        'Leave Store'
                    ]
                }, {
                    name: 'Waiting',
                    items: [
                        'Receive Thank You Note',
                        'Informed of Any Changes',
                        'Receive Delivery or Pick-up Confirmation Call',
                        'Pick-up Merchandise',
                        'Driver Arrival'
                    ]
                }, {
                    name: 'Customer Use',
                    items: [
                        'Product Set Up',
                        'Product Placed in Room',
                        'First Try',
                        '30 Day Experience',
                        '31 - 90 Day Experience',
                        '1 Year Experience',
                        'Product Past Warranty'
                    ]
                }
            ];
        }])

        .controller('MyTodoCtrl', ['$scope', 'CleanService', function ($scope, CleanService) {
            $scope.todoList = [];
            // {todoText:'', done:false}
            $scope.todoAdd = function () {
                $scope.todoList.push({todoText: $scope.todoInput, done: false});
                // var x = $scope.todoList.push($scope.todoInput);
                $scope.todoInput = "";
            };

            $scope.remove = function () {
                debugger;
                var oldList = $scope.todoList;
                $scope.todoList = [];
                angular.forEach(oldList, function (x) {
                    debugger;
                    if (!x.done) $scope.todoList.push(x);
                    var f = x.toJSON;
                    console.log(f);
                });
            };



            $scope.save = function () {
                sessionStorage.setItem('todoList', $scope.todoList);
                $scope.todoList = [];
                debugger;
                var g = localStorage.getItem('todoList');
                for (var i = 0; i < 100; i++) {
                    var fine = g[i];
                    console.log(fine);
                }
            };

            $scope.getList = function () {
                var f = localStorage.getItem('todoList');
                var t = JSON.parse(f);
                var g = t.list;
                for (var i = 0; i < 100; i++) {
                    var d = g[i].todoText;
                    document.getElementById('list').appendChild(document.createTextNode(d + '\r\n'));
                }
            };

            // $scope.$watch('$ViewContentLoaded', function () {
            //     var l = localStorage.getItem('todoList');
            //     var prs = JSON.parse(l);
            //     $scope.badge = prs.list.length;
            // });

            $scope.clearList = function () {
                localStorage.removeItem('todoList');
            };

            $scope.firstTime = 'Select Time';

            $scope.firstArea = 'Select Area';

            $scope.newList = {
                ListName: '',
                Area: '',
                Time: '',
                Task: ''
            };

            $scope.area = CleanService.getArea();

            $scope.getAreaTime = function () {
                $scope.times = CleanService.getAreaTime($scope.newList.Area);
                document.getElementById('area').disabled = true;
            };

            $scope.getTimeTask = function () {
                $scope.tasks = CleanService.getTimeTask($scope.newList.Time);
            }
        }]);
})();
