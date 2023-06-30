import { Component, Inject } from "@angular/core";
import { StorageProvider } from "src/app/services/storage";
import { Lang } from "src/app/services/lang";
import { ActivatedRoute, ParamMap, Router } from "@angular/router";
import { ListInterface, SettingsInterface } from "src/app/Interfaces/storage.interfaces";

@Component({
    selector: 'todoList',
    templateUrl: 'todolist.component.html',
    styleUrls: ['todolist.component.css']
})
export class TodoListComponent {
 
    // Set current showing tab to the id passed by url
    showTab: number = 0;

    // Add-Todo form model
    addTodoForm: any = {};

    public lists: ListInterface[] = [];
    public settings: SettingsInterface;
    public $lang = this.Lang.$lang;
    public title: string;


    private $routeParams;
    private storage;

    constructor(
        private Lang: Lang,
        private storageProvider: StorageProvider,
        private route: ActivatedRoute,
        private router: Router
    ) {
        // Set priority to '0' so the first option in the selection ('Select Priority...') is selected by default
        this.addTodoForm.priority = '0';

        this.lists = this.storageProvider.storage.lists;
        this.settings = this.storageProvider.storage.settings;
        this.storage = this.storageProvider.storage;
    }

    ngOnInit(): void {
        // Set current showing tab to the id passed by 
        this.setShowToTab(Number(this.route.snapshot.paramMap.get('id')));
    }

    onTitleClick(event): void {
        this.title = event.itemData.title;
        this.setShowToTab(event.itemData.id)
    }

    trackBy(index, item) {
        return item.id
    }

    identify(index, item) {
        return item.id
    }

    setShowToTab(idTab: number) {
        this.showTab = idTab
    }


    // Called when clicking the checkbox next to a todo.
    checkTodo(listID: number, todoID: number) {
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
    addTodo() {
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
    newList() {
        let newlist: any = {}; // Object for the newlist

        // TODO: get data from Observable 
        // prompt(this.lang.newlistprompt + ': ', 'New list'); // Display Prompt with input. 'title' is input after submitting
        var title = prompt('Title of the new list: ', 'New list');
        if (title != null || title != ''){ // Check if title isn't empty
            // Default values
            console.log('newlist.id ',this.lists.length )
            newlist.id = this.lists.length;
            newlist.title = title;
            newlist.todos = [];

            this.lists.push(newlist); // Push the new list to the list of lists

            this.storageProvider.saveStorage(this.storage); // Save storage

            console.log('Added new list: ' + newlist.title);

            this.router.navigate(['/list/' + newlist.id]); // Show the new list
            this.setShowToTab(newlist.id);
        }
    };

    // Called when the 'Delete list' button is clicked
    deleteList(listID: number) {
        //TODO translation for confirm
        // confirm(this.lang.deleteconfirm)
        var confirmed = confirm('This cannot be undone!'); // Get confirmation if the user really wants to delete the current list. 'confirmed' is true if the user confirms

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

        this.router.navigate(['/list/0']); // Redirect to the first list
        this.setShowToTab(0);
    };

}

