import { app } from "../../src/app/app.main";

app.filter('doneFilter', function () {
    return function (state: any, langOpen: any, langDone: any) { // langOpen and langDone are used for translation
        if (state === true) {
            return langOpen;
        } else {
            return langDone;
        }
    };
});