import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import {JhiEventManager, JhiParseLinks, JhiAlertService, JhiDataUtils} from 'ng-jhipster';

import { IFinalNiazsanjiReportMarineSuffix } from 'app/shared/model/final-niazsanji-report-marine-suffix.model';
import { Principal } from 'app/core';

import { ITEMS_PER_PAGE } from 'app/shared';
import { FinalNiazsanjiReportMarineSuffixService } from './final-niazsanji-report-marine-suffix.service';
import {IReportMarineSuffix} from "app/shared/model/report-marine-suffix.model";
import {ExcelService} from "app/plugin/export-excel/excel-service";
import {TranslateService} from '@ngx-translate/core';
import {SearchPanelModel} from "app/shared/model/custom/searchbar.model";
import {EducationalModuleMarineSuffixService} from "app/entities/educational-module-marine-suffix";
import {GREGORIAN_START_END_DATE} from "app/shared/constants/years.constants";
import {ConvertObjectDatesService} from "app/plugin/utilities/convert-object-dates";
import {IEducationalModuleMarineSuffix} from "app/shared/model/educational-module-marine-suffix.model";

@Component({
    selector: 'mi-final-niazsanji-report-marine-suffix',
    templateUrl: './final-niazsanji-report-marine-suffix.component.html'
})
export class FinalNiazsanjiReportMarineSuffixComponent implements OnInit, OnDestroy {
    currentAccount: any;
    finalNiazsanjiReports: IFinalNiazsanjiReportMarineSuffix[];
    educationalModules: IEducationalModuleMarineSuffix[];
    _report : IReportMarineSuffix;
    error: any;
    success: any;
    eventSubscriber: Subscription;
    routeData: any;
    links: any;
    totalItems: any;
    queryCount: any;
    itemsPerPage: any;
    page: any;
    predicate: any;
    previousPage: any;
    reverse: any;
    isAdmin:any;

    criteriaSubscriber: Subscription;
    searchbarModel: SearchPanelModel[];
    done:boolean = false;
    criteria: any;
    yearsCollections: any[];

    constructor(
        private finalNiazsanjiReportService: FinalNiazsanjiReportMarineSuffixService,
        private educationalModuleService: EducationalModuleMarineSuffixService,
        private parseLinks: JhiParseLinks,
        private jhiAlertService: JhiAlertService,
        private principal: Principal,
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private eventManager: JhiEventManager,
        private dataUtils: JhiDataUtils,
        private jhiTranslate: TranslateService,
        private convertObjectDatesService : ConvertObjectDatesService
    ) {
        this.itemsPerPage = ITEMS_PER_PAGE;
        this.routeData = this.activatedRoute.data.subscribe(data => {
            this.page = data.pagingParams.page;
            this.previousPage = data.pagingParams.page;
            this.reverse = data.pagingParams.ascending;
            this.predicate = data.pagingParams.predicate;
        });
        this.criteriaSubscriber = this.eventManager.subscribe('marineindustryprojApp.criteria', (criteria) =>{
            this.criteria = criteria.content;
            this.done = true;
            this.loadAll(criteria.content);

        });
        this.yearsCollections = GREGORIAN_START_END_DATE;
    }
    createCriteria(criteria?): any{

        if(criteria)
        {
            let val = +criteria.find(a => a.key == 'yearId.equals').value;
            criteria.pop('yearId');
            if(val){
                let yearDetail = this.yearsCollections.find(a => a.year == val);
                let beginDate = new Date(yearDetail.beginDate).toISOString();
                let endDate = new Date(yearDetail.endDate).toISOString();

                criteria.push({
                    key:'createDate.lessOrEqualThan', value: endDate
                });
                criteria.push({
                    key:'createDate.greaterOrEqualThan', value: beginDate
                });
            }
        }
        return criteria;
    }
    loadAll(criteria?) {
        criteria = this.createCriteria(criteria)
        this.finalNiazsanjiReportService
            .query({
                page: this.page - 1,
                size: this.itemsPerPage,
                criteria,
                sort: this.sort()
            })
            .subscribe(
                (res: HttpResponse<IFinalNiazsanjiReportMarineSuffix[]>) => this.paginateFinalNiazsanjiReports(res.body, res.headers),
                (res: HttpErrorResponse) => this.onError(res.message)
            );
    }
    export() {
        let a = new ExcelService(this.jhiTranslate);
        a.exportAsExcelFile(this.finalNiazsanjiReports, 'finalNiazsanjiReports', 'marineindustryprojApp.finalNiazsanjiReport');
    }
    loadPage(page: number) {
        if (page !== this.previousPage) {
            this.previousPage = page;
            this.transition();
        }
    }
    makeReport(i){
        let id = i;
        this.finalNiazsanjiReportService.postReport(id).subscribe((res: HttpResponse<IReportMarineSuffix>)=>{
            this._report = res.body;
        })
    }
    transition() {
       /* this.router.navigate(['/final-niazsanji-report-marine-suffix'], {
            queryParams: {
                page: this.page,
                size: this.itemsPerPage,
                sort: this.predicate + ',' + (this.reverse ? 'asc' : 'desc')
            }
        });*/
        this.loadAll(this.criteria);
    }

    clear() {
        this.page = 0;
        this.router.navigate([
            '/final-niazsanji-report-marine-suffix',
            {
                page: this.page,
                sort: this.predicate + ',' + (this.reverse ? 'asc' : 'desc')
            }
        ]);
        this.loadAll();
    }

    ngOnInit() {
        this.principal.identity().then(account => {
            this.currentAccount = account;
            if(account.authorities.find(a => a == "ROLE_ADMIN") !== undefined)
                this.isAdmin = true;
            this.educationalModuleService.query().subscribe(
                (res: HttpResponse<IEducationalModuleMarineSuffix[]>) => {
                    let dates = [{id:1395,title:'1395'},{id:1396,title:'1396'},{id:1397,title:'1397'},{id:1398,title:'1398'},
                        {id:1399,title:'1399'},{id:1400,title:'1400'},{id:1401,title:'1401'},{id:1402,title:'1402'},{id:1403,title:'1403'},{id:1404,title:'1404'}
                        ,{id:1405,title:'1405'}];
                    this.educationalModules = res.body;
                    this.searchbarModel = new Array<SearchPanelModel>();
                    this.searchbarModel.push(new SearchPanelModel('finalNiazsanjiReport','educationalModuleId','select', 'equals', res.body));
                    this.searchbarModel.push(new SearchPanelModel('requestOrganizationNiazsanji','yearId','select','equals', dates));
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
            if(!this.done){
                this.loadAll();
            }

        });
        this._report = new class implements IReportMarineSuffix {
            fileDoc: any;
            fileDocContentType: string;
        };
        //this.registerChangeInFinalNiazsanjiReports();
    }
    byteSize(field) {
        return this.dataUtils.byteSize(field);
    }
    openFile(contentType, field) {
        return this.dataUtils.openFile(contentType, field);
    }
    ngOnDestroy() {
        //this.eventManager.destroy(this.eventSubscriber);
        this.eventManager.destroy(this.criteriaSubscriber);
    }

    trackId(index: number, item: IFinalNiazsanjiReportMarineSuffix) {
        return item.id;
    }

    registerChangeInFinalNiazsanjiReports() {
        this.eventSubscriber = this.eventManager.subscribe('finalNiazsanjiReportListModification', response => this.loadAll());
    }

    sort() {
        const result = [this.predicate + ',' + (this.reverse ? 'asc' : 'desc')];
        if (this.predicate !== 'id') {
            result.push('id');
        }
        return result;
    }

    private paginateFinalNiazsanjiReports(data: IFinalNiazsanjiReportMarineSuffix[], headers: HttpHeaders) {
        this.links = this.parseLinks.parse(headers.get('link'));
        this.totalItems = parseInt(headers.get('X-Total-Count'), 10);
        this.queryCount = this.totalItems;
        this.finalNiazsanjiReports = this.convertObjectDatesService.changeArrayDate(data);
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
