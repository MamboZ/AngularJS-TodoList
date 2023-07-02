
import { Component, Inject } from "@angular/core";
import { Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { DomSanitizer } from "@angular/platform-browser";
import { Subscription, take } from "rxjs";
import { StorageInterface, SettingsInterface } from "src/app/Interfaces/storage.interfaces";
import { Lang } from "src/app/services/lang";
import { StorageProvider } from "src/app/services/storage";


export interface Language {
    short: string,
    full: string
}

@Component({
    selector: "settings",
    templateUrl: './settings.component.html',
})
export class SettingsComponent {
    // public externalHtml!: any;
    public showReload = false;
    public languages: Language[];
    public $lang = this.lang.$lang;
    public storage: StorageInterface;
    public settings: SettingsInterface;

    // private $externalHtmlSubscription!: Subscription;

    constructor(
        @Inject(Lang) private lang: Lang,
        @Inject(StorageProvider) private storageProvider: StorageProvider,
        @Inject(Router) private router: Router,
    ) {
        this.storage = this.storageProvider.storage;
        this.settings = this.storageProvider.storage.settings;
        this.languages = [
            { short: 'en', full: 'English' },
            { short: 'de', full: 'Deutsch' }
        ];

        
    }

    identify(index: any, item: any) {
        return item.id
    }

    back() {
        this.router.navigate(['/list/0']);
    }

    saveSettings() {
        this.storageProvider.saveStorage(this.storage); // Save storage
        this.router.navigate(['/list/0']); // Redirect to the first list
    };

}
