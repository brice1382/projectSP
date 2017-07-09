(function () {
    'use strict';

    angular
        .module('contact')
        .service('ContactSvc', ContactSvc);

    ContactSvc.$inject = ['$http'];
    function ContactSvc($http) {
        var service = {};

        service.SendContactForm = SendContactForm;

        return service;

        function SendContactForm(user) {
            var baseUrl = 'http://localhost:1313';
            return $http.post(baseUrl + '/api/contact', user).then(handleSuccess, handleError('Error creating user'));
        }

        function handleSuccess(res) {
            return res.data;
        }

        function handleError(error) {
            return function () {
                return {success: false, message: error};
            };
        }
    }
})();

