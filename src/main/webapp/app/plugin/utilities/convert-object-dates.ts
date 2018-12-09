import { Injectable } from '@angular/core';
import * as moment from 'jalali-moment';
import {JhiLanguageService} from "ng-jhipster";

@Injectable()
export class ConvertObjectDatesService {
    isfa:boolean;

    constructor(private translate: JhiLanguageService) {
        this.isfa = translate.currentLang == 'fa';
    }
    public changeDate(obj){

        if(this.isfa) {
            const mustChangeList: string[] = ['timepassed'];
            for (let key in obj) {
                if (obj.hasOwnProperty(key)) {
                    let value = obj[key];

                    if (key.toLowerCase().includes('date')) {
                        if (value)
                            value = moment(value).format('jYYYY/jM/jD');
                    }

                    if (mustChangeList.filter(a => a === key.toLowerCase()).length) {
                        if (value)
                            value = moment(value).format('jYYYY/jM/jD');
                    }
                    if (value === false)
                        value = 'خیر';
                    if (value === true)
                        value = 'بلی';

                    obj[key] = value;
                }
            }
        }
        return obj;
    }
    public changeArrayDate(objs){

        if(this.isfa) {
            const mustChangeList: string[] = ['timepassed'];
            for (let obj in objs)
            {
                objs[obj] = this.changeDate(objs[obj]);
            }
        }
        return objs;
    }
}
