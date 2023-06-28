import { Injectable } from "@angular/core";
import { downgradeInjectable } from "@angular/upgrade/static";
import angular from "angular";
// import { app } from "../app.main";

@Injectable()
export class StorageProvider {

    private defaultStorage = {
        settings: {
            title: 'TodoListr',
            language: 'en',
            dateformat: 'HH:mm dd.MM.yyyy',
            timezone: '+0000'
        },
        lists: [
            {
                id: 0,
                title: 'Default',
                todos: [
                    {
                        id: 0,
                        name: 'Enjoy!',
                        priority: 2,
                        notice: 'Thanks for using!',
                        done: false,
                        date: 1494939867372
                    }
                ]
            }
        ]
    };

    // The loaded storage
    public storage = {};
    constructor(){
        if (localStorage.length === 0) { // If localstorage is emtpy (First page load)
            this.defaultStorage.lists[0].todos[0].date = Date.now(); // Set date of default todo as now
    
            localStorage.setItem('storage', JSON.stringify(this.defaultStorage)); // Save storage to localstorage
            
            this.storage = this.defaultStorage; // Set the loaded storage to the default storage
            
            console.log('Created new storage');
        } else { // If localstorage is not empty and the user has a saved storage
            this.storage = JSON.parse(localStorage.getItem('storage') || '{}'); // Load the saved storage
        }
    
        console.log('Loaded storage!', this.storage);
    }

    

    // Save function to save to the localstorage
    saveStorage = (newstorage: any) => {
        localStorage.setItem('storage', JSON.stringify(newstorage)); // Save storage to localstorage

        this.storage = newstorage; // Set the loaded storage to the new storage
         
        console.log('Saved storage');
    };

}

angular
    .module("TodoList")
    .factory("StorageProvider", downgradeInjectable(StorageProvider));
// app.factory('storageProvider', function () {
//     var storageProvider: any = {};
//     // var localStorage: any;

//     // Default storage wich is set on the first page load
//     storageProvider.defaultStorage = {
//         settings: {
//             title: 'TodoListr',
//             language: 'en',
//             dateformat: 'HH:mm dd.MM.yyyy',
//             timezone: '+0000'
//         },
//         lists: [
//             {
//                 id: 0,
//                 title: 'Default',
//                 todos: [
//                     {
//                         id: 0,
//                         name: 'Enjoy!',
//                         priority: 2,
//                         notice: 'Thanks for using!',
//                         done: false,
//                         date: 1494939867372
//                     }
//                 ]
//             }
//         ]
//     };

//     // The loaded storage
//     storageProvider.storage = {};

//     if (localStorage?.length === 0) { // If localstorage is emtpy (First page load)
//         storageProvider.defaultStorage.lists[0].todos[0].date = Date.now(); // Set date of default todo as now

//         localStorage.setItem('storage', JSON.stringify(storageProvider.defaultStorage)); // Save storage to localstorage
        
//         storageProvider.storage = storageProvider.defaultStorage; // Set the loaded storage to the default storage
        
//         console.log('Created new storage');
//     } else { // If localstorage is not empty and the user has a saved storage
//         storageProvider.storage = JSON.parse(localStorage.getItem('storage') || '{}'); // Load the saved storage
//     }

//     console.log('Loaded storage');

//     // Save function to save to the localstorage
//     storageProvider.save = function (newstorage: any) {
//         localStorage.setItem('storage', JSON.stringify(newstorage)); // Save storage to localstorage

//         storageProvider.storage = newstorage; // Set the loaded storage to the new storage
         
//         console.log('Saved storage');
//     };

//     return storageProvider;
// });