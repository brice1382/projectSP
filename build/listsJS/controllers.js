(function() {
    'use strict';

    angular
        .module('cleaningDetails', ['ngRoute', 'cleaning-core'])
        .controller('CleaningDetailsCtrl', ['$routeParams', 'Lists', function($routeParams, Lists) {
            var vm = this;

            vm.list = Lists.get({listId: $routeParams.listId}, function(list) {
                vm.setImage(list.images[0]);
            });

            vm.setImage = function(imageUrl) {
                vm.mainImageUrl = imageUrl;
            };
        }])

        .controller('ListController', ['$scope', function ($scope) {

        $scope.equipmentList = [
            {"CategoryID":  1, "id":  1, "value": "Dust mop"},
            {"CategoryID":  2, "id":  2, "value": "Dust cloths and dusters"},
            {"CategoryID":  3, "id":  3, "value": "Rags, towels and soft cloths"},
            {"CategoryID":  4, "id":  4, "value": "Indoor broom"},
            {"CategoryID":  5, "id":  5, "value": "Outdoor broom"},
            {"CategoryID":  6, "id":  6, "value": "Vacuum"},
            {"CategoryID":  7, "id":  7, "value": "Wet mop"},
            {"CategoryID":  8, "id":  8, "value": "Toilet brush (and brush caddy)"},
            {"CategoryID":  9, "id":  9, "value": "Plunger"},
            {"CategoryID": 10, "id": 10, "value": "Spray bottles"},
            {"CategoryID": 11, "id": 11, "value": "Squirt bottles"},
            {"CategoryID": 12, "id": 12, "value": "Sponges"},
            {"CategoryID": 13, "id": 13, "value": "Scrub brush"},
            {"CategoryID": 14, "id": 14, "value": "Scraper"},
            {"CategoryID": 15, "id": 15, "value": "Toothbrush"},
            {"CategoryID": 16, "id": 16, "value": "Buckets"},
            {"CategoryID": 17, "id": 17, "value": "Rubber gloves"},
            {"CategoryID": 18, "id": 18, "value": "Cleaning apron"},
            {"CategoryID": 19, "id": 19, "value": "Cleaning caddy"}
            ]

        }])
})();


(function() {
    'use strict';

    angular
        .module('cleaningList', [])
        .controller('CleaningListCtrl', ['Lists', function(Lists) {
            var vm = this;

            vm.lists = Lists.query();
            vm.orderProp = 'listId';
        }]);
})();
