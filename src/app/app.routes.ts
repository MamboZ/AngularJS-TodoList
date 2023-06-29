import "@angular/compiler";
import 'zone.js';
import angular from "angular";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { SettingsComponent } from "./components/settings.component";
import { TodoListComponent } from "./components/todolist.component";

export const routes: Routes = [
  { path: '', redirectTo: '/list/0', pathMatch: 'full' },
  { path: 'settings', component: SettingsComponent },
  { path: 'list/:id', component: TodoListComponent },
  // { path: '', redirectTo: '/list/0', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { enableTracing: true })],
  exports: [RouterModule]
})

export class AppRoutingModule { }

// angular
//     .module("TodoList")
//     .config(['$routeProvider', function ($routeProvider: any) {
//         $routeProvider
//             .when('/', {
//                 redirectTo: '/list/0'
//             })
//             .when('/list/:id', {
//                 template: "<todo-list></todo-list>"
//                 // templateUrl: 'pages/todolist.html',
//                 // controller: 'TodoListController'
//             })
//             .when('/settings', {
//                 template: "<settings></settings>"
//                 // templateUrl: 'pages/settings.html',
//                 // controller: 'SettingsController'
//             })
//             .otherwise({
//                 redirectTo: '/list/0'
//             });
//     }]);