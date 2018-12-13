import { Pipe, PipeTransform } from '@angular/core';
import {SERVER_API_URL} from "app/app.constants";

@Pipe({ name: 'url' })
export class urlPipe implements PipeTransform {
    constructor() {}
    transform(url) {
        return SERVER_API_URL + url;
    }
}
