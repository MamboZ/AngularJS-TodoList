
import { HttpClient } from "@angular/common/http";
import { Injectable, Inject } from "@angular/core";
import { downgradeInjectable } from '@angular/upgrade/static';
import angular from "angular";

@Injectable()
export class Lang {
  // @Inject(HttpClient)
  constructor(@Inject(HttpClient) private http: HttpClient) { }
  load = (lang: string): Promise<any> => {
    if (lang == null) lang = 'en';
    var url = './languages/' + lang + '.json';
    return this.http.get(url).toPromise();
  };

}
angular
  .module("TodoList")
  .factory("Lang", downgradeInjectable(Lang));

// export class Lang {
//     public lang: any;
//     private $http: any;

//     constructor($http: any) {
//         this.$http = $http
//     }

//     load(lang: string) {
//         var loadedlang = {};
//         var url = './languages/' + lang + '.json';
//         return this.$http.get(url);
//     };

// }

// angular
//     .module("TodoList")
//     .service("Lang", Lang);

// app.factory('lang', function ($http: any) {
//     var lang: any = {};

//     lang.load = function (lang: any) {
//         var loadedlang = {};
//         var url = './languages/' + lang + '.json';
//         return $http.get(url);
//     };

//     return lang;
// });
