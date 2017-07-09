(function () {
    'use strict';

    angular
        .module('contact', [])
        .controller('ContactCtrl', ['$scope',  function ($scope) {
            var vm = this;

            var reset = function() {
                $scope.name = '';
                $scope.phone = '';
                $scope.email = '';
                $scope.question = '';
                $scope.contact.$setPristine();
            };

            $scope.send = function() {
                var load = {
                    name: $scope.name,
                    phone: $scope.phone,
                    email: $scope.email,
                    category: $scope.category,
                    question: $scope.question
                };
                debugger;
                localStorage.setItem('load', JSON.stringify(load));
                reset();
                // $scope.contact.$setPristine();
            };

            $scope.list = [
                {
                    name:'Pricing',
                    items: [
                        'General pricing questions.',
                        'Price estimates.',
                        'Payment options.',
                        'Another option here to fill.'
                    ]
                }, {
                    name: 'Services',
                    items: [
                        'What services we offer.',
                        'How long does service take.',
                        'More questions about services.'
                    ]
                }
            ];

            $scope.categorySelect = {
                model: null,
                category: [
                    {id: '1', value: 'Pricing'},
                    {id: '2', value: 'Services'},
                    {id: '3', value: 'Plans'},
                    {id: '4', value: 'General Help'}
                ]
            };
        }]);
})();

