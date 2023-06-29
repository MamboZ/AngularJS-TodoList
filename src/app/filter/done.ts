import angular from "angular";
import "@angular/compiler";
import 'zone.js';

angular
    .module("TodoList")
    .filter('doneFilter', function () {
        return function (state: any, langOpen: any, langDone: any) { // langOpen and langDone are used for translation
            if (state === true) {
                return langOpen;
            } else {
                return langDone;
            }
        };
    });