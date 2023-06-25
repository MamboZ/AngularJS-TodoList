

angular
    .module("TodoList")
    .config(['$routeProvider', function ($routeProvider: any) {
        $routeProvider
            .when('/', {
                redirectTo: '/list/0'
            })
            .when('/list/:id', {
                templateUrl: 'pages/todolist.html',
                controller: 'TodoListController'
            })
            .when('/settings', {
                template: "<settings></settings>"
                // templateUrl: 'pages/settings.html',
                // controller: 'SettingsController'
            })
            .otherwise({
                redirectTo: '/list/0'
            });
    }]);