import angular from "angular";
// import { app } from "../app";

let SettingsComponent = {
    selector: "settings",
    templateUrl: 'src/app/components/settings.html',
    bindings: {},
    controller: class SettingsController {
        public base: any;
        public showReload = false;
        public languages: any[] = [];
        public location: any;

        private $location: any;
        private storageProvider: any;

        constructor($location: any, storageProvider: any) {
            this.location = $location;
            this.languages = [
                { short: 'en', full: 'English' },
                { short: 'de', full: 'Deutsch' }
            ];
        }

        saveSettings() {
            this.storageProvider.saveStorage(); // Save storage

            this.$location.path('/list/0'); // Redirect to the first list
        };

    }

};

angular
    .module("TodoList")
    .component(SettingsComponent.selector, SettingsComponent);

// app.controller('SettingsController', function ($scope,  $rootScope, $location) {
//     // Base.js variable
//     var base = $scope.$parent;

//     // Shortcut to use $location inside HTML
//     $scope.location = $location;

//     // Show var
//     $scope.showReload = false; // True if the user changed the language

//     // Languages
//     $scope.languages = [{ short: 'en', full: 'English' }, { short: 'de', full: 'Deutsch' }]; //   <<<    Add new languages here!

//     // Called when the 'Save' button is clicked
//     $scope.saveSettings = function () {
//         base.saveStorage(); // Save storage

//         $location.path('/list/0'); // Redirect to the first list
//     };
// });