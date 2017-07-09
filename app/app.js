(function(){
    'use strict';

    angular.module('myApp', [
        'ngRoute',
        'auth0.lock',
        'angular-jwt',
        'ngResource',
        'ngMaterial',
        'ngAnimate',
        'sp-manager',
        'login',
        'playground',
        'forgotPassword',
        'register',
        'contact',
        'home',
        'navbar',
        'deps',
        'dashboard',
        'list',
        'footer',
        'layouts',
        'userList',
        'userDetails',
        'cleaningList',
        'cleaningDetails',
        'cleaning-core',
        'upload',
        'core',
        'goal-core',
        'myApp.alert',
        'myApp.version'
    ]).
    config(['$locationProvider', '$routeProvider', 'lockProvider', 'jwtOptionsProvider', function($locationProvider, $routeProvider, lockProvider, jwtOptionsProvider) {
        $locationProvider.hashPrefix('!');

        $routeProvider.
        when('/login', {
            templateUrl: 'views/login/login.html',
            controller: 'LoginCtrl',
            controllerAs: 'vm'
        }).
        when('/forgotPassword', {
            templateUrl: 'views/login/forgotPassword/forgotPassword.html',
            controller: 'ForgotPasswordCtrl',
            controllerAs: 'vm'
        }).
        when('/register', {
            templateUrl: 'views/register/register.html',
            controller: 'RegisterCtrl',
            controllerAs: 'vm'
        }).
        when('/home', {
            templateUrl: 'views/home/home.html',
            controller: 'HomeCtrl',
            controllerAs: 'home'
        }).
        when('/dashboard', {
            templateUrl: 'views/dashboard/dashboard.html',
            controller: 'DashboardCtrl',
            controllerAs: 'DbdCtrl'
        }).
        when('/dashboard/goals/:id', {
            templateUrl: 'views/dashboard/goals/goal-details.html',
            controller: 'GoalDetailsCtrl'
        }).
        when('/contact', {
            templateUrl: 'views/contact/contact.html',
            controller: 'ContactCtrl',
            controllerAs: 'vm'
        }).
        when('/upload', {
            templateUrl: 'views/uploader/upload.html',
            controller: 'UploadCtrl',
            controllerAs: 'vm'
        }).
        when('/playground', {
            templateUrl: 'playground/index.html',
            controller: 'PlaygroundCtrl',
            controllerAs: 'pgCtrl'
        }).
        when('/users', {
            templateUrl: 'views/userList/userList.html',
            controller: 'UsersCtrl',
            controllerAs: 'vm'
        }).
        when('/users/:userId', {
            templateUrl: 'views/userDetails/userDetails.html',
            controller: 'UserDetailsCtrl',
            controllerAs: 'vm'
        }).
        when('/list', {
            templateUrl: 'views/list/list.html',
            controller: 'ListCtrl',
            controllerAs: 'vm'
        }).
        when('/lists/:listId', {
            templateUrl: 'views/cleaningDetails/cleaningDetails.html',
            controller: 'CleaningDetailsCtrl',
            controllerAs: 'vm'
        }).
        when('/lists', {
            templateUrl: 'views/cleaningList/cleaningList.html',
            controller: 'CleaningListCtrl',
            controllerAs: 'vm'
        }).otherwise({redirectTo: '/home'});

        lockProvider.init({
            clientID: AUTH0_CLIENT_ID,
            domain: AUTH0_DOMAIN,
            options: {
                _idTokenVerification: false
            }
        });

        jwtOptionsProvider.config({
            tokenGetter: ['options', function(options) {
                if(options && options.url.substr(options.url.length - 5) == '.html'){
                    return null;
                }
                return localStorage.getItem('id_token');
            }],

            whiteListedDomains: ['localhost'],
            unauthenticatedRedirectPath: '/login'
        });
    }]);
})();

