import 'angular';
import "@angular/compiler";
import 'zone.js';

import 'angular-resource';
// import 'angular-animate';
// import 'angular-ladda';
// import 'angular-strap';
// import 'angular-ui-router';
import 'angular-route';

import './app.main';
// import './app.routes';
import './components';
// import './filter';
import './services';

import './polyfills';

import { DoBootstrap, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { UpgradeModule } from '@angular/upgrade/static';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app.routes';

import { StorageProvider } from './services/storage';
import { Lang } from './services/lang';
import { BaseComponent } from './components/base.component';
import { TodoListComponent } from './components/todolist.component';
import { SettingsComponent } from './components/settings.component';
import { DoneFilterPipe } from './filter/done-filter.pipe';
import { RouterModule } from '@angular/router';


@NgModule({
    imports: [
        AppRoutingModule,
        BrowserModule,
        UpgradeModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule
    ],
    providers: [
        Lang,
        StorageProvider,
    ],
    declarations: [
        BaseComponent,
        SettingsComponent,
        TodoListComponent,
        DoneFilterPipe,
    ],
    exports: [
        BaseComponent,
        SettingsComponent,
        TodoListComponent,
    ],
    bootstrap: [
        BaseComponent
    ]
})
export class AppModule {
    // Override Angular bootstrap so it doesn't do anything
    // ngDoBootstrap() { }
}

// Bootstrap using the UpgradeModule
platformBrowserDynamic().bootstrapModule(AppModule);
// .then(platformRef => {
//     console.log("Bootstrapping in Hybrid mode with Angular & AngularJS");
//     const upgrade = platformRef.injector.get(UpgradeModule) as UpgradeModule;
//     upgrade.bootstrap(document.body, ['TodoList']);
// });
