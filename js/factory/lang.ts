import { app } from "../../src/app/app.main";

app.factory('lang', function ($http: any) {
    var lang: any = {};

    lang.load = function (lang: any) {
        var loadedlang = {};
        var url = './languages/' + lang + '.json';
        return $http.get(url);
    };

    return lang;
});
