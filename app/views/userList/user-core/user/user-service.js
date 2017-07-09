(function() {
    'use strict';

    angular
        .module('user-core')
        .factory('Users', ['$resource', function($resource){
            return $resource('users/:userId.json', {}, {
                query: {
                    method: 'GET',
                    params: {userId: 'user'},
                    isArray: true
                }
            })
        }])
})();

