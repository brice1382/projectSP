(function () {
    'use strict';

    angular
        .module('goal-details', ['ngRoute', 'goal-core'])
        .controller('GoalDetailsCtrl', ['$routeParams', 'GoalService', function ($routeParams, GoalService) {
            var vm = this;
            debugger;
            vm.goals = GoalService.get({id: $routeParams.id}, function(goals) {
                vm.setImage(goals.images[0]);
            });

            vm.setImage = function(imageUrl) {
                vm.mainImageUrl = imageUrl;
            };
        }])
})();
