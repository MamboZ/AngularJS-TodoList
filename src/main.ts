/// <reference types="@angular/localize" />

import './app/polyfills';

import { DoBootstrap, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { UpgradeModule } from '@angular/upgrade/static';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app/app.routes';

import { StorageProvider } from './app/services/storage';
import { Lang } from './app/services/lang';
import { BaseComponent } from './app/components/base.component';
import { TodoListComponent } from './app/components/todolist/todolist.component';
import { SettingsComponent } from './app/components/settings.component';
import { DoneFilterPipe } from './app/filter/done-filter.pipe';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DxCheckBoxModule, DxFormModule, DxTabPanelModule, DxTemplateModule } from 'devextreme-angular';

@NgModule({
    imports: [
        NgbModule,
        AppRoutingModule,
        BrowserModule,
        UpgradeModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule,
        DxTabPanelModule,
        DxFormModule,
        DxCheckBoxModule,
        DxTemplateModule,
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
platformBrowserDynamic().bootstrapModule(AppModule)
    .catch(err => console.error(err));
// .then(platformRef => {
//     console.log("Bootstrapping in Hybrid mode with Angular & AngularJS");
//     const upgrade = platformRef.injector.get(UpgradeModule) as UpgradeModule;
//     upgrade.bootstrap(document.body, ['TodoList']);
// });
