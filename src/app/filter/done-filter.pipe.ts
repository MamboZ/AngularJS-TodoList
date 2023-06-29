import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'doneFilter' })
export class DoneFilterPipe implements PipeTransform {
    transform(state: any, langOpen: any, langDone: any) {
        if (state === true) {
            return langOpen;
        } else {
            return langDone;
        }
    }
}