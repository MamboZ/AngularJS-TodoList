import { Component, Inject } from "@angular/core";
import { StorageProvider } from "../services/storage";
import { Lang } from "../services/lang";
import { SettingsInterface } from "../Interfaces/storage.interfaces";

@Component({
    selector: 'base-comp',
    templateUrl: './base.component.html'
})
export class BaseComponent {
    public settings: SettingsInterface;

    constructor(private storageProvider: StorageProvider, private lang_: Lang) {
        this.settings = this.storageProvider.storage.settings;
        this.loadLanguages();
    }

    loadLanguages() {
        this.lang_.load(this.settings.language);
    }

}
