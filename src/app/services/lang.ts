
import { HttpClient } from "@angular/common/http";
import { Injectable, Inject } from "@angular/core";
import { Observable } from "rxjs";

@Injectable()
export class Lang {
  public $lang!: Observable<any>;
  constructor(@Inject(HttpClient) private http: HttpClient) { }
  load = (lang: string) => {
    if (lang == null) lang = 'en';
    var url = './assets/languages/' + lang + '.json';
    this.$lang = this.http.get(url)
  };

}
