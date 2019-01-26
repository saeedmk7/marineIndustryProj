import { Injectable } from '@angular/core';
import * as moment from 'jalali-moment';
import {JhiLanguageService} from "ng-jhipster";
import {RequestStatus} from "app/shared/model/enums/RequestStatus";

@Injectable({ providedIn: 'root' })
export class ConvertObjectDatesService {
    isfa:boolean;

    constructor(private translate: JhiLanguageService) {
        this.isfa = translate.currentLang == 'fa';
    }
    public changeDate(obj,notbool = false){

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
                    if(!notbool) {
                        if (value === false)
                            value = 'خیر';
                        if (value === true)
                            value = 'بلی';
                    }
                    obj[key] = value;
                }
            }
        }
        return obj;
    }
    public changeArrayDate(objs,notbool = false){

        if(this.isfa) {
            const mustChangeList: string[] = ['timepassed'];
            for (let obj in objs)
            {
                objs[obj] = this.changeDate(objs[obj],notbool);
            }
        }
        return objs;
    }
    public miladi2Shamsi(date: Date): string {
        return date.getHours() + ":" + date.getMinutes() + "  " + moment(date).format('jYYYY/jMM/jDD');
    }
    convertString2RequestStatus(newStatus: string): RequestStatus {
        switch (newStatus) {
            case 'NEW':
                return RequestStatus.NEW;
            case 'READ':
                return RequestStatus.READ;
            case 'RETURNED':
                return RequestStatus.RETURNED;
            case 'IGNORE':
                return RequestStatus.IGNORE;
            case 'ACCEPT':
                return RequestStatus.ACCEPT;
        }
    }
}
