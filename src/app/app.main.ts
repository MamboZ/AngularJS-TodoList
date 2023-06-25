import * as angular from 'angular';

// Create angular module
export var app = angular.module('TodoList', ['ngRoute']);
// app.config(['$routeProvider', function ($routeProvider: any) {
//     $routeProvider
//         .when('/', {
//             redirectTo: '/list/0'
//         })
//         .when('/list/:id', {
//             templateUrl: 'pages/todolist.html',
//             controller: 'TodoListController'
//         })
//         .when('/settings', {
//             templateUrl: 'pages/settings.html',
//             controller: 'SettingsController'
//         })
//         .otherwise({
//             redirectTo: '/list/0'
//         });
// }]);

