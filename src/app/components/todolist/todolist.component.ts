import { Component, Inject } from "@angular/core";
import { StorageProvider } from "src/app/services/storage";
import { Lang } from "src/app/services/lang";
import { ActivatedRoute, ParamMap, Router } from "@angular/router";
import { ListInterface, SettingsInterface } from "src/app/Interfaces/storage.interfaces";

export class Company {
    ID: number;
  
    CompanyName: string;
  
    Address: string;
  
    City: string;
  
    State: string;
  
    Zipcode: number;
  
    Phone: string;
  
    Fax: string;
  
    Website: string;
  }

 export const companies: Company[] = [{
    ID: 1,
    CompanyName: 'SuprMart',
    Address: '702 SW 8th Street',
    City: 'Bentonville',
    State: 'Arkansas',
    Zipcode: 72716,
    Phone: '(800) 555-2797',
    Fax: '(800) 555-2171',
    Website: 'http://www.nowebsitesupermart.com',
  }, {
    ID: 2,
    CompanyName: "El'Depot",
    Address: '2455 Paces Ferry Road NW',
    City: 'Atlanta',
    State: 'Georgia',
    Zipcode: 30339,
    Phone: '(800) 595-3232',
    Fax: '(800) 595-3231',
    Website: 'http://www.nowebsitedepot.com',
  }, {
    ID: 3,
    CompanyName: 'K&S Music',
    Address: '1000 Nicllet Mall',
    City: 'Minneapolis',
    State: 'Minnesota',
    Zipcode: 55403,
    Phone: '(612) 304-6073',
    Fax: '(612) 304-6074',
    Website: 'http://www.nowebsitemusic.com',
  }, {
    ID: 4,
    CompanyName: 'Tom Club',
    Address: '999 Lake Drive',
    City: 'Issaquah',
    State: 'Washington',
    Zipcode: 98027,
    Phone: '(800) 955-2292',
    Fax: '(800) 955-2293',
    Website: 'http://www.nowebsitetomsclub.com',
  }];

@Component({
    selector: 'todoList',
    templateUrl: 'todolist.component.html',
    styleUrls: ['todolist.component.css']
})
export class TodoListComponent {


    companies: Company[] = companies;

    itemCount: number = this.companies.length;
 
    selectedTabIndex = 0;
 
    // Set current showing tab to the id passed by url
    showTab: number;

    // Add-Todo form model
    addTodoForm: any = {};

    lists: ListInterface[];
    settings: SettingsInterface;
    public $lang = this.Lang.$lang;


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

    ngOnInit() {
        // Set current showing tab to the id passed by 
        this.setShowToTab(Number(this.route.snapshot.paramMap.get('id')));
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
        var newlist: ListInterface; // Object for the newlist

        var title = prompt('Title of the new list:: ', 'New list');
        // TODO: get data from Observable 
        // prompt(this.lang.newlistprompt + ': ', 'New list'); // Display Prompt with input. 'title' is input after submitting
        if (title != null){ // Check if title isn't empty
            // Default values
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

