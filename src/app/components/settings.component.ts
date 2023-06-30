
import { Component, Inject } from "@angular/core";
import { Lang } from "../services/lang";
import { StorageProvider } from "../services/storage";
import { Router } from "@angular/router";
import { SettingsInterface, StorageInterface } from "../Interfaces/storage.interfaces";
import { HttpClient } from "@angular/common/http";
import { DomSanitizer } from "@angular/platform-browser";
import { Subscription, take } from "rxjs";


export interface Language {
    short: string,
    full: string
}

@Component({
    selector: "settings",
    templateUrl: './settings.component.html',
})
export class SettingsComponent {
    public externalHtml;
    public showReload = false;
    public languages: Language[];
    public lang: any = {};
    public storage: StorageInterface;
    public settings: SettingsInterface;

    private $externalHtmlSubscription: Subscription;

    constructor(
        @Inject(Lang) private lang_: Lang,
        @Inject(StorageProvider) private storageProvider: StorageProvider,
        @Inject(Router) private router: Router,
        @Inject(HttpClient) private http: HttpClient,
        private sanitizer: DomSanitizer
    ) {
        this.storage = this.storageProvider.storage;
        this.settings = this.storageProvider.storage.settings;
        this.languages = [
            { short: 'en', full: 'English' },
            { short: 'de', full: 'Deutsch' }
        ];

        this.$externalHtmlSubscription = this.http.get('assets/timezones.html', { responseType: 'text' })
            .pipe(take(1))
            .subscribe(
                data => {
                    return this.externalHtml = this.sanitizer.bypassSecurityTrustHtml(data)
                }
            );
    }

    ngOnDestroy() {

    }

    identify(index, item) {
        return item.id
    }

    back() {
        this.router.navigate(['/list/0']);
    }

    saveSettings() {
        // this.StorageProvider.saveStorage(); // Save storage
        this.router.navigate(['/list/0']); // Redirect to the first list
    };

}
