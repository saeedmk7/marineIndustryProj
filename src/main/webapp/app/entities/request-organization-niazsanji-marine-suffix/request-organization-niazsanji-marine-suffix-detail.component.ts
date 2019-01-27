import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

import {
    IRequestOrganizationNiazsanjiMarineSuffix
} from 'app/shared/model/request-organization-niazsanji-marine-suffix.model';
import {RequestOrganizationNiazsanjiMarineSuffixService} from 'app/entities/request-organization-niazsanji-marine-suffix';
import {Observable} from "rxjs";
import {HttpErrorResponse, HttpResponse} from "@angular/common/http";
import {Principal} from "app/core";
import {ConvertObjectDatesService} from "app/plugin/utilities/convert-object-dates";
import {RequestStatus} from "app/shared/model/enums/RequestStatus";

@Component({
    selector: 'mi-request-organization-niazsanji-marine-suffix-detail',
    templateUrl: './request-organization-niazsanji-marine-suffix-detail.component.html',
    styleUrls: ['./request-organization-niazsanji-marine-suffix.scss']
})
export class RequestOrganizationNiazsanjiMarineSuffixDetailComponent implements OnInit {
    requestOrganizationNiazsanji: IRequestOrganizationNiazsanjiMarineSuffix;

    constructor(private activatedRoute: ActivatedRoute,
        private requestOrganizationNiazsanjiMarineSuffixService :RequestOrganizationNiazsanjiMarineSuffixService,
        private principal: Principal,private convertObjectDatesService : ConvertObjectDatesService) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ requestOrganizationNiazsanji }) => {
            this.principal.identity().then(account => {

                this.requestOrganizationNiazsanji = requestOrganizationNiazsanji;
                if(account.authorities.find(a => a == "ROLE_ADMIN") !== undefined)
                {
                    if(this.requestOrganizationNiazsanji.requestStatus === 'NEW') {
                        this.requestOrganizationNiazsanji.requestStatus = RequestStatus.READ;
                        this.subscribeToSaveResponse(this.requestOrganizationNiazsanjiMarineSuffixService.update(this.requestOrganizationNiazsanji));
                    }
                }
                this.requestOrganizationNiazsanji = this.convertObjectDatesService.changeDate(requestOrganizationNiazsanji);
            });

        });

    }
    private subscribeToSaveResponse(result: Observable<HttpResponse<IRequestOrganizationNiazsanjiMarineSuffix>>) {
        result.subscribe(
            (res: HttpResponse<IRequestOrganizationNiazsanjiMarineSuffix>) => this.onSaveSuccess(),
            (res: HttpErrorResponse) => this.onSaveError()
        );
    }
    private onSaveSuccess() {
    }

    private onSaveError() {
    }
    previousState() {
        window.history.back();
    }
}
