// import angular from "angular";
import "@angular/compiler";
import 'zone.js';
import { Component, Inject } from "@angular/core";
import { Lang } from "../services/lang";
import { StorageProvider } from "../services/storage"; 
import { downgradeComponent } from "@angular/upgrade/static";
import { ActivatedRoute, ParamMap, Router } from "@angular/router";

@Component({
    selector: 'todoList',
    templateUrl: '/src/app/components/todolist.component.html',
})
export class TodoListComponent {
    // Shortcut to use $location inside HTML
    location;

    // Set current showing tab to the id passed by url
    showTab;

    // Add-Todo form model
    addTodoForm: any = {};

    lists;
    settings: any;
    lang: any = {};


    private $routeParams;
    private storage;

    constructor(
        @Inject(Lang) private Lang: Lang,
        @Inject(StorageProvider) private storageProvider: StorageProvider,
        @Inject(ActivatedRoute) private route: ActivatedRoute,
        @Inject(Router) private router: Router
        ){
        // Set priority to '0' so the first option in the selection ('Select Priority...') is selected by default
        this.addTodoForm.priority = '0';
        
        this.lists = this.storageProvider.storage.lists;
        this.settings = this.storageProvider.storage.settings;
        this.storage = this.storageProvider.storage;
        this.loadLanguages();
    }

    ngOnInit() {
        // Set current showing tab to the id passed by url
        this.showTab = this.route.snapshot.paramMap.get('id')!;
        // [routerLink]="['/hero', hero.id]"
        // this.router.navigate(['/heroes']);
        // const id = 
        // this.hero$ = this.route.paramMap.pipe(
        //   switchMap((params: ParamMap) =>
        //     this.service.getHero(params.get('id')!))
        // );
      }

    trackBy(index, item){
        return item.id
    }

    identify(index, item){
        return item.id
    }

    async loadLanguages() {
        await this.Lang.load(this.settings.language).then((res) =>{
            console.log('res:', res);
            this.lang = res;
        }); 
        console.log('lang:', this.lang);
    }
    

    // Called when clicking the checkbox next to a todo.
    checkTodo(listID: number, todoID: number){
        if (this.lists[listID].todos[todoID].done){ // Check if todo is done
            this.lists[listID].todos[todoID].done = false; // If it was already done, set it back to false ('open')
            console.log('Unchecked ' + listID + ',' + todoID );
        } else {
            this.lists[listID].todos[todoID].done = true; // If it was open, set it to true ('done')
            console.log('Checked ' + listID + ',' + todoID);
        }
        this.storageProvider.saveStorage(this.storage); // Save storage
    };

    // Called when the Add-Todo form gets submitted
    addTodo(){
        // Default values
        this.addTodoForm.done = false;
        this.addTodoForm.id = this.lists[this.showTab].todos.length;
        this.addTodoForm.date = Date.now();

        this.addTodoForm.priority = parseInt(this.addTodoForm.priority); // Convert priority from string (from option value) to integer
        
        // If no notice was set, set notice to an empty string
        if (typeof this.addTodoForm.notice == 'undefined'){
            this.addTodoForm.notice = '';
        }

        console.log('Added todo:');
        console.log(this.addTodoForm);

        this.lists[this.showTab].todos.push(this.addTodoForm); // Push the new todo to the todo-list of the current list 

        this.storageProvider.saveStorage(this.storage); // Save storage

        this.addTodoForm = {}; // Reset form
        this.addTodoForm.priority = '0'; // Set priority to the first option in the selection again
    };

    // Called when the 'Remove ticked todos' button is clicked
    removeTickedTodos(listID: number) {
        // Filter out checked todos
        this.lists[listID].todos = this.lists[listID].todos.filter(function (val: any) {
            if (val.done) {
                console.log('Removed todo ' + listID + ',' + val.id);
                return false;
            }
            return true;
        });

        // Reindex todos
        for (var t = 0; t < this.lists[listID].todos.length; t++) {
            this.lists[listID].todos[t].id = t;
        }

        this.storageProvider.saveStorage(this.storage); // Save storage
    };

    // Called when the 'New list' button is clicked
    newList(){
        var newlist: any = {}; // Object for the newlist

        var title = prompt(this.lang.newlistprompt + ': ', 'New list'); // Display Prompt with input. 'title' is input after submitting
        if (title != null){ // Check if title isn't empty
            // Default values
            newlist.id = this.lists.length;
            newlist.title = title;
            newlist.todos = [];

            this.lists.push(newlist); // Push the new list to the list of lists

            this.storageProvider.saveStorage(this.storage); // Save storage

            console.log('Added new list: ' + newlist.title);

            this.location.path('/list/' + newlist.id); // Show the new list
        }
    };

    // Called when the 'Delete list' button is clicked
    deleteList(listID: number) {
        var confirmed = confirm(this.lang.deleteconfirm); // Get confirmation if the user really wants to delete the current list. 'confirmed' is true if the user confirms

        // If the user pressed 'Cancel', abort
        if (confirmed === false){
            return;
        }

        this.lists.splice(listID, 1); // Remove list from the list of lists

        console.log('Removed list ' + listID);

        // Reindex lists
        for (var l = 0; l < this.lists.length; l++) {
            this.lists[l].id = l;
        }

        this.storageProvider.saveStorage(this.storage); // Save storage

        this.location.path('/list/0'); // Redirect to the first list
    };

}

// angular
// .module("TodoList")
// .directive('todoList', downgradeComponent({ component: TodoListComponent }));
// app.controller('TodoListController', function($scope, $routeParams, $location){
//     // Base.js variable
//     var base = $scope.$parent;

//     // Shortcut to use $location inside HTML
//     $scope.location = $location;

//     // Set current showing tab to the id passed by url
//     $scope.showTab = $routeParams.id;

//     // Add-Todo form model
//     $scope.addTodoForm = {};

//     // Set priority to '0' so the first option in the selection ('Select Priority...') is selected by default
//     $scope.addTodoForm.priority = '0';

//     // Called when clicking the checkbox next to a todo.
//     $scope.checkTodo = function(listID: number, todoID: number){
//         if (base.lists[listID].todos[todoID].done){ // Check if todo is done
//             base.lists[listID].todos[todoID].done = false; // If it was already done, set it back to false ('open')
//             console.log('Unchecked ' + listID + ',' + todoID );
//         } else {
//             base.lists[listID].todos[todoID].done = true; // If it was open, set it to true ('done')
//             console.log('Checked ' + listID + ',' + todoID);
//         }
//         base.saveStorage(); // Save storage
//     };

//     // Called when the Add-Todo form gets submitted
//     $scope.addTodo = function(){
//         // Default values
//         $scope.addTodoForm.done = false;
//         $scope.addTodoForm.id = base.lists[$scope.showTab].todos.length;
//         $scope.addTodoForm.date = Date.now();

//         $scope.addTodoForm.priority = parseInt($scope.addTodoForm.priority); // Convert priority from string (from option value) to integer
        
//         // If no notice was set, set notice to an empty string
//         if (typeof $scope.addTodoForm.notice == 'undefined'){
//             $scope.addTodoForm.notice = '';
//         }

//         console.log('Added todo:');
//         console.log($scope.addTodoForm);

//         base.lists[$scope.showTab].todos.push($scope.addTodoForm); // Push the new todo to the todo-list of the current list 

//         base.saveStorage(); // Save storage

//         $scope.addTodoForm = {}; // Reset form
//         $scope.addTodoForm.priority = '0'; // Set priority to the first option in the selection again
//     };

//     // Called when the 'Remove ticked todos' button is clicked
//     $scope.removeTickedTodos = function (listID: number) {
//         // Filter out checked todos
//         base.lists[listID].todos = base.lists[listID].todos.filter(function (val: any) {
//             if (val.done) {
//                 console.log('Removed todo ' + listID + ',' + val.id);
//                 return false;
//             }
//             return true;
//         });

//         // Reindex todos
//         for (var t = 0; t < base.lists[listID].todos.length; t++) {
//             base.lists[listID].todos[t].id = t;
//         }

//         base.saveStorage(); // Save storage
//     };

//     // Called when the 'New list' button is clicked
//     $scope.newList = function(){
//         var newlist: any = {}; // Object for the newlist

//         var title = prompt(base.lang.newlistprompt + ': ', 'New list'); // Display Prompt with input. 'title' is input after submitting
//         if (title != null){ // Check if title isn't empty
//             // Default values
//             newlist.id = base.lists.length;
//             newlist.title = title;
//             newlist.todos = [];

//             base.lists.push(newlist); // Push the new list to the list of lists

//             base.saveStorage(); // Save storage

//             console.log('Added new list: ' + newlist.title);

//             $location.path('/list/' + newlist.id); // Show the new list
//         }
//     };

//     // Called when the 'Delete list' button is clicked
//     $scope.deleteList = function (listID: number) {
//         var confirmed = confirm(base.lang.deleteconfirm); // Get confirmation if the user really wants to delete the current list. 'confirmed' is true if the user confirms

//         // If the user pressed 'Cancel', abort
//         if (confirmed === false){
//             return;
//         }

//         base.lists.splice(listID, 1); // Remove list from the list of lists

//         console.log('Removed list ' + listID);

//         // Reindex lists
//         for (var l = 0; l < base.lists.length; l++) {
//             base.lists[l].id = l;
//         }

//         base.saveStorage(); // Save storage

//         $location.path('/list/0'); // Redirect to the first list
//     };
// });
