import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { SettingsComponent } from "./components/settings.component";
import { TodoListComponent } from "./components/todolist.component";

export const routes: Routes = [
  { path: '', redirectTo: 'list/0', pathMatch: 'full'},
  { path: 'list/:id', component: TodoListComponent },
  { path: 'settings', component: SettingsComponent },
  {path: '**', redirectTo: 'list/0'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { enableTracing: false })],
  exports: [RouterModule]
})

export class AppRoutingModule { }