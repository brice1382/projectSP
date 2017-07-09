(function() {
    'use strict';

    angular
        .module('cleaning-core')
        .factory('Lists', ['$resource', function($resource){
            return $resource('lists/:listId.json', {}, {
                query: {
                    method: 'GET',
                    params: {listId: 'list'},
                    isArray: true
                }
            })
        }])
})();

