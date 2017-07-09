(function() {
    'use strict';

    angular
        .module('CleaningSvc', [])
        .factory('CleaningSvc', CleaningSvc);

    CleaningSvc.$inject = ['$http'];
    function CleaningSvc($http) {
        var service = {};

        service.GetAll = GetAll;
        service.GetById = GetById;
        service.GetByUsername = GetByUsername;
        service.Create = Create;
        service.Update = Update;
        service.Delete = Delete;

        return service;
        function GetAll() {
            var baseUrl = "http://localhost:1313";
            return $http.get(baseUrl + '/api/lists').then(handleSuccess, handleError('Error getting all users'));
        }

        function GetById(id) {
            var baseUrl = "http://localhost:1313";
            return $http.get(baseUrl + '/api/lists' + id).then(handleSuccess, handleError('Error getting user by id'));
        }

        function GetByUsername(username) {
            var baseUrl = "http://localhost:1313";
            return $http.get(baseUrl + '/api/lists' + username).then(handleSuccess, handleError('Error getting user by username'));
        }

        function Create(list) {
            var baseUrl = "http://localhost:1313";
            return $http.post(baseUrl + '/api/lists', list).then(handleSuccess, handleError('Error creating user'));
        }

        function Update(list) {
            var baseUrl = "http://localhost:1313";
            return $http.put(baseUrl + '/api/lists/' + list.id, list).then(handleSuccess, handleError('Error updating user'));
        }

        function Delete(id) {
            var baseUrl = "http://localhost:1313";
            return $http.delete(baseUrl + '/api/lists/' + id).then(handleSuccess, handleError('Error deleting user'));
        }

        // private functions

        function handleSuccess(res) {
            return res.data;
        }

        function handleError(error) {
            return function () {
                return { success: false, message: error };
            };
        }
    }
})();


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

