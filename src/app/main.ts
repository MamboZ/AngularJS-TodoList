import 'angular';
import 'angular-resource';
// import 'angular-animate';
// import 'angular-ladda';
// import 'angular-strap';
// import 'angular-ui-router';
import 'angular-route';

import './app.main';
import './app.routes';
import './components';
import './filter';
import './services';

import './polyfills';

import { DoBootstrap, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { UpgradeModule } from '@angular/upgrade/static';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { HttpClientModule } from '@angular/common/http';

import { StorageProvider } from './services/storage';
import { Lang } from './services/lang';

@NgModule({
    imports: [
        BrowserModule,
        UpgradeModule,
        HttpClientModule,
    ],
    providers: [
        Lang,
        StorageProvider,        
    ]
})
export class AppModule {
    // Override Angular bootstrap so it doesn't do anything
    ngDoBootstrap() { }
}

// Bootstrap using the UpgradeModule
platformBrowserDynamic().bootstrapModule(AppModule).then(platformRef => {
    console.log("Bootstrapping in Hybrid mode with Angular & AngularJS");
    const upgrade = platformRef.injector.get(UpgradeModule) as UpgradeModule;
    upgrade.bootstrap(document.body, ['TodoList']);
});
