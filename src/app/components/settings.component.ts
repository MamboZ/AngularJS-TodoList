import angular from "angular";
import "@angular/compiler";
import 'zone.js';
import { Component, Inject } from "@angular/core";
import { downgradeComponent } from "@angular/upgrade/static";
import { Lang } from "../services/lang";
import { StorageProvider } from "../services/storage"; 
import { Router } from "@angular/router";


@Component({
    selector: "settings",
    templateUrl: '/src/app/components/settings.component.html',
})
export class SettingsComponent {
    public showReload = false;
    public languages: any;
    public location: any;
    public lang: any = {};
    public storage: any;
    public settings: any;

    private $location: any;
    private StorageProvider: any;
    private lang_;

    // $location: any,
    constructor(
        @Inject(Lang) private Lang: Lang,
        @Inject(StorageProvider) private storageProvider: StorageProvider,
        @Inject(Router) private router: Router) {
        this.lang_ = Lang;
        this.storage = this.storageProvider.storage;
        this.settings = this.storageProvider.storage.settings;
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
        // this.$location.path('/list/0');
        this.router.navigate(['/list/0']);
    }

    saveSettings() {
        // this.StorageProvider.saveStorage(); // Save storage
        this.$location.path('/list/0'); // Redirect to the first list
    };

}

angular
    .module("TodoList")
    .directive('settings', downgradeComponent({ component: SettingsComponent }));

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
