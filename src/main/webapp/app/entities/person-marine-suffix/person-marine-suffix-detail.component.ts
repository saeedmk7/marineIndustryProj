import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IPersonMarineSuffix } from 'app/shared/model/person-marine-suffix.model';
import {ConvertObjectDatesService} from "app/plugin/utilities/convert-object-dates";
import {FormUploadComponent, UploadFileService} from "app/plugin/upload-file";

@Component({
    selector: 'mi-person-marine-suffix-detail',
    templateUrl: './person-marine-suffix-detail.component.html'
})
export class PersonMarineSuffixDetailComponent implements OnInit {
    person: IPersonMarineSuffix;
    constructor(private activatedRoute: ActivatedRoute,private convertObjectDatesService : ConvertObjectDatesService) {
    }

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ person }) => {

            this.person =  this.convertObjectDatesService.changeDate(person);
            //this.person = person;
        });
    }

    previousState() {
        window.history.back();
    }
}
