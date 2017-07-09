(function () {
    'use strict';

    angular
        .module('goal-service')
        .service('GoalService', ['$resource', function ($resource) {
            return $resource('goals/:id.json', {}, {
                query: {
                    method: 'GET',
                    params: {id: 'goals'},
                    isArray: true
                }
            })


        }])
})();
