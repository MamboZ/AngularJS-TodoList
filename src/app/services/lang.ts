
import { HttpClient } from "@angular/common/http";
import { Injectable, Inject } from "@angular/core";

@Injectable()
export class Lang {
  public lang = {};
  constructor(@Inject(HttpClient) private http: HttpClient) { }
  load = (lang: string): Promise<any> => {
    if (lang == null) lang = 'en';
    var url = './assets/languages/' + lang + '.json';
    return this.http.get(url).toPromise();
  };

}
