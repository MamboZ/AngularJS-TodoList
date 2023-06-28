import angular from "angular";
// import { app } from "../app";

let SettingsComponent = {
    selector: "settings",
    templateUrl: 'src/app/components/settings.html',
    bindings: {},
    controller: class SettingsController {
        public showReload = false;
        public languages: any;
        public location: any;
        public lang: any = {};
        public storage: any;
        public settings: any;

        private $location: any;
        private StorageProvider: any;
        private lang_;

        constructor($location: any, Lang: any, StorageProvider: any) {
            this.lang_ = Lang;
            this.StorageProvider = StorageProvider;
            this.storage = StorageProvider.storage;
            this.settings = StorageProvider.storage.settings;
            this.$location = $location;
            // this.location = this.$location;
            this.languages = [
                { short: 'en', full: 'English' },
                { short: 'de', full: 'Deutsch' }
            ];
            this.loadLanguages()
        }

        async loadLanguages() {
            await this.lang_.load('en').then((res) =>{
                console.log('res:', res);
                this.lang = res;
            }); 
            console.log('lang:', this.lang);
        }

        back() {
            this.$location.path('/list/0');
        }

        saveSettings() {
            // this.StorageProvider.saveStorage(); // Save storage
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
