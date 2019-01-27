import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {JhiAlertService, JhiDataUtils, JhiEventManager} from 'ng-jhipster';

import { IRequestNiazsanjiFardiMarineSuffix } from 'app/shared/model/request-niazsanji-fardi-marine-suffix.model';
import {ConvertObjectDatesService} from "app/plugin/utilities/convert-object-dates";
import {HttpErrorResponse, HttpResponse} from "@angular/common/http";
import {IFinalNiazsanjiReportPersonMarineSuffix} from "app/shared/model/final-niazsanji-report-person-marine-suffix.model";
import {IEducationalModuleJobMarineSuffix} from "app/shared/model/educational-module-job-marine-suffix.model";
import {FinalNiazsanjiReportPersonMarineSuffixService} from "app/entities/final-niazsanji-report-person-marine-suffix";
import {IFinalNiazsanjiReportMarineSuffix} from "app/shared/model/final-niazsanji-report-marine-suffix.model";
import {FinalNiazsanjiReportMarineSuffixService} from "app/entities/final-niazsanji-report-marine-suffix";
import {
    EducationalModuleMarineSuffix,
    IEducationalModuleMarineSuffix
} from "app/shared/model/educational-module-marine-suffix.model";
import {EducationalModuleMarineSuffixService} from "app/entities/educational-module-marine-suffix";
import {PersonMarineSuffixService} from "app/entities/person-marine-suffix";
import {IPersonMarineSuffix} from "app/shared/model/person-marine-suffix.model";
import {IOrganizationChartMarineSuffix} from "app/shared/model/organization-chart-marine-suffix.model";
import {OrganizationChartMarineSuffixService} from "app/entities/organization-chart-marine-suffix";

@Component({
    selector: 'mi-request-niazsanji-fardi-marine-suffix-detail',
    templateUrl: './request-niazsanji-fardi-marine-suffix-detail.component.html'
})
export class RequestNiazsanjiFardiMarineSuffixDetailComponent implements OnInit {
    requestNiazsanjiFardi: IRequestNiazsanjiFardiMarineSuffix;
    finalNiazsanjiReports: IFinalNiazsanjiReportMarineSuffix[];

    approvedHour: number = 0;
    approvedLevel: string;

    allHour: number = 0;
    allLevel: string;
    rows: number = 0;
    organizationcharts: IOrganizationChartMarineSuffix[];

    constructor(protected dataUtils: JhiDataUtils, protected activatedRoute: ActivatedRoute,
        private convertObjectDatesService : ConvertObjectDatesService,
        private finalNiazsanjiReportPersonMarineSuffixService: FinalNiazsanjiReportPersonMarineSuffixService,
        private personService: PersonMarineSuffixService,
        private finalNiazsanjiReportMarineSuffixService: FinalNiazsanjiReportMarineSuffixService,
        private educationalModuleMarineSuffixService: EducationalModuleMarineSuffixService,
        private organizationChartService: OrganizationChartMarineSuffixService,
        private jhiAlertService: JhiAlertService) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ requestNiazsanjiFardi }) => {
            this.requestNiazsanjiFardi = this.convertObjectDatesService.changeDate(requestNiazsanjiFardi);

            if(this.requestNiazsanjiFardi.approvedEducationalModuleId)
            {
                this.educationalModuleMarineSuffixService.find(this.requestNiazsanjiFardi.approvedEducationalModuleId).subscribe(
                    (resp: HttpResponse<IEducationalModuleMarineSuffix>) =>{
                    let event = resp.body;
                    this.approvedHour = (event.learningTimePractical ? event.learningTimePractical : 0) + (event.learningTimeTheorical ? event.learningTimeTheorical : 0);
                    this.approvedLevel = event.skillableLevelOfSkillTitle;
                });

            }
            if(this.requestNiazsanjiFardi.allEducationalModuleId)
            {
                this.educationalModuleMarineSuffixService.find(this.requestNiazsanjiFardi.allEducationalModuleId).subscribe(
                    (resp: HttpResponse<IEducationalModuleMarineSuffix>) =>{
                        let event = resp.body;
                        this.allHour = (event.learningTimePractical ? event.learningTimePractical : 0) + (event.learningTimeTheorical ? event.learningTimeTheorical : 0);
                        this.allLevel = event.skillableLevelOfSkillTitle;
                    });
            }
            this.personService.find(this.requestNiazsanjiFardi.personId).subscribe(
                (resp: HttpResponse<IPersonMarineSuffix>) =>{
                    let event = resp.body;
                    this.requestNiazsanjiFardi.personFamily = event.fullName;
                    this.onPersonChange(event);
                });
            this.organizationChartService.query().subscribe(

                (res: HttpResponse<IOrganizationChartMarineSuffix[]>) => {

                    this.organizationcharts = res.body;
                    this.requestNiazsanjiFardi.organizationChartTitle = this.organizationcharts.find(a => a.id == this.requestNiazsanjiFardi.organizationChartId).fullTitle;
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );

            this.rows = this.requestNiazsanjiFardi.conversation.split('\n').length;
        });
    }


    previousState() {
        window.history.back();
    }


    onPersonChange(event){

        if(event.id){
            let criteria = [{
                key:'personId.equals',
                value: event.id
            }];
            this.finalNiazsanjiReportPersonMarineSuffixService.query({
                page: 0,
                size: 20000,
                criteria,
                sort: ["id","asc"]
            }).subscribe((resp: HttpResponse<IFinalNiazsanjiReportPersonMarineSuffix[]>) => this.showEducations(resp.body),
                (error) => this.onError("موردی یافت نشد"));
        }
    }
    hasNoRow:boolean = false;
    showEducations(resp: IFinalNiazsanjiReportPersonMarineSuffix[]){

        if(resp.length) {
            this.hasNoRow = false;
            let ids: number[] = [];
            resp.forEach(a => {
                ids.push(a.finalNiazsanjiReportId);
            });
            let criteria = [{
                key: 'id.in',
                value: ids
            }];
            this.finalNiazsanjiReportMarineSuffixService.query({
                page: 0,
                size: 20000,
                criteria,
                sort: ["id", "asc"]
            }).subscribe((resp: HttpResponse<IFinalNiazsanjiReportMarineSuffix[]>) => {

                    this.finalNiazsanjiReports = resp.body
                },
                (error) => this.onError("موردی یافت نشد"));
        }
        else {
            //this.finalNiazsanjiReports.push("این فرد تا به الان هیچ دوره ای شرکت نکرده است.");
            this.finalNiazsanjiReports = [];
            this.hasNoRow = true;
        }
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

}
