// import angular from "angular";
import "@angular/compiler";
import 'zone.js';
// import { downgradeComponent } from "@angular/upgrade/static";
import { Component, Inject } from "@angular/core";
import { StorageProvider } from "../services/storage";
import { Lang } from "../services/lang";
import { SettingsInterface } from "../Interfaces/storage.interfaces";

@Component({
    selector: 'base-comp',
    templateUrl: '/src/app/components/base.component.html'
})
export class BaseComponent {
    public settings: SettingsInterface;
    // public lists;
    public lang;

    constructor(@Inject(StorageProvider) private storageProvider: StorageProvider, @Inject(Lang) private lang_: Lang) {
        this.settings = this.storageProvider.storage.settings;
        // this.lists = StorageProvider.storage.lists;
        this.loadLanguages()
    }

    async loadLanguages() {
        // this.settings.language
        await this.lang_.load(this.settings.language).then((res) => {
            this.lang_.lang = res;
            this.lang = this.lang_.lang
        });
        console.log('base comp lang:', this.lang);
    }

    // Simplyfied save storage (for easier use in app)
    // saveStorage() {
    //     this.storageProvider.save(this.storageProvider.storage);
    // };
}

// angular
//     .module("TodoList")
//     .directive("baseComp", downgradeComponent({ component: BaseComponent }));

// app.controller('BaseController', function ($scope, Lang, StorageProvider) {
//     // Shortcuts
//     $scope.settings = StorageProvider.storage.settings;
//     $scope.lists = StorageProvider.storage.lists;

//     // Load languages
//     $scope.lang = {};
//     Lang.load($scope.settings.language) // Returns the return of '$http.get()' object to use 'then()' in this controller
//         .then(
//             function success(response: any) {
//                 $scope.lang = response.data;
//                 console.log('Loaded language ' + $scope.settings.language);
//             },

//             function error(response: any) {
//                 console.error('Cannot load language \'' + $scope.settings.language + '\'. Response:', response);
//             }
//         );

//     // Simplyfied save storage (for easier use in app)
//     $scope.saveStorage = function () {
//         StorageProvider.save(StorageProvider.storage);
//     };
// });
