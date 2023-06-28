import angular from "angular";
import "@angular/compiler";
import 'zone.js';

let BaseComponent = {
    selector: 'baseComp',
    template: `
    <div class="container-fluid content">
        <div class="row">
            <div class="col-md-8 col-centered">

                <div class="title">
                    <h1 class="check-load">{{$ctrl.settings.title}}</h1>
                </div>

                <div ng-view>
                    <h1>Loading...</h1>
                </div>

            </div>
        </div>
    </div>
    `,
    bindings: {},
    controller: class BaseController {

        public settings;
        // public lists;
        public lang;

        private lang_;
        private StorageProvider;

        constructor(StorageProvider: any, Lang: any) {
            this.lang_ = Lang;
            this.StorageProvider = StorageProvider;
            this.settings = StorageProvider.storage.settings;
            // this.lists = StorageProvider.storage.lists;
            this.loadLanguages()
        }

        async loadLanguages() {
            // this.settings.language
            await this.lang_.load('en').then((res) =>{
                console.log('res:', res);
                this.lang = res;
            }); 
            console.log('lang:', this.lang);
        }

        // Simplyfied save storage (for easier use in app)
        saveStorage() {
            this.StorageProvider.save(this.StorageProvider.storage);
        };

    }
}

angular
    .module("TodoList")
    .component(BaseComponent.selector, BaseComponent);
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
