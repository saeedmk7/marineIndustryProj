import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiParseLinks, JhiAlertService } from 'ng-jhipster';

import {
    FinalOrganizationNiazsanjiMarineSuffix,
    IFinalOrganizationNiazsanjiMarineSuffix
} from 'app/shared/model/final-organization-niazsanji-marine-suffix.model';
import { Principal } from 'app/core';

import { ITEMS_PER_PAGE } from 'app/shared';
import { FinalOrganizationNiazsanjiMarineSuffixService } from './final-organization-niazsanji-marine-suffix.service';
import {TranslateService} from '@ngx-translate/core';
import {ExcelService} from "app/plugin/export-excel/excel-service";
import {SearchPanelModel} from "app/shared/model/custom/searchbar.model";
import {GREGORIAN_START_END_DATE} from "app/shared/constants/years.constants";
import {IEducationalModuleMarineSuffix} from "app/shared/model/educational-module-marine-suffix.model";
import {EducationalModuleMarineSuffixService} from "app/entities/educational-module-marine-suffix";
import {ConvertObjectDatesService} from "app/plugin/utilities/convert-object-dates";
import {RequestStatus} from "app/shared/model/enums/RequestStatus";

@Component({
    selector: 'mi-final-organization-niazsanji-marine-suffix',
    templateUrl: './final-organization-niazsanji-marine-suffix.component.html'
})
export class FinalOrganizationNiazsanjiMarineSuffixComponent implements OnInit, OnDestroy {
    currentAccount: any;
    finalOrganizationNiazsanjis: IFinalOrganizationNiazsanjiMarineSuffix[];
    educationalModules: IEducationalModuleMarineSuffix[];
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
        private finalOrganizationNiazsanjiService: FinalOrganizationNiazsanjiMarineSuffixService,
        private educationalModuleService: EducationalModuleMarineSuffixService,
        private parseLinks: JhiParseLinks,
        private jhiAlertService: JhiAlertService,
        private principal: Principal,
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private eventManager: JhiEventManager,
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
        this.finalOrganizationNiazsanjiService
            .query({
                page: this.page - 1,
                size: this.itemsPerPage,
                criteria,
                sort: this.sort()
            })
            .subscribe(
                (res: HttpResponse<IFinalOrganizationNiazsanjiMarineSuffix[]>) =>
                    this.paginateFinalOrganizationNiazsanjis(res.body, res.headers),
                (res: HttpErrorResponse) => this.onError(res.message)
            );
    }
    export() {
        let a = new ExcelService(this.jhiTranslate);
        a.exportAsExcelFile(this.finalOrganizationNiazsanjis, 'finalOrganizationNiazsanjis', 'marineindustryprojApp.finalOrganizationNiazsanji');
    }
    loadPage(page: number) {
        if (page !== this.previousPage) {
            this.previousPage = page;
            this.transition();
        }
    }

    transition() {
        /*this.router.navigate(['/final-organization-niazsanji-marine-suffix'], {
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
            '/final-organization-niazsanji-marine-suffix',
            {
                page: this.page,
                sort: this.predicate + ',' + (this.reverse ? 'asc' : 'desc')
            }
        ]);
        this.loadAll();
    }
    complete(mymodel){

        this.finalOrganizationNiazsanjiService.find(mymodel.id).subscribe((resp) => {
            let model = resp.body;

            if (confirm("آیا از اجرا کردن دوره متمرکز مورد نظر مطمئنید.")) {

                this.finalOrganizationNiazsanjiService.finalize(model).subscribe(
                    (res: HttpResponse<IFinalOrganizationNiazsanjiMarineSuffix>) => this.onSuccess("دوره متمرکز مورد نظر شما به مرحله اجرا وارد شد."),
                    (res: HttpErrorResponse) => this.onError(res.message)
                );
            }
        });
    }
    ngOnInit() {
        //this.loadAll();
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
                    this.searchbarModel.push(new SearchPanelModel('requestOrganizationNiazsanji','educationalModuleId','select', 'equals', res.body));
                    this.searchbarModel.push(new SearchPanelModel('requestOrganizationNiazsanji','yearId','select','equals', dates));
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
            if(!this.done){
                this.loadAll();
            }

        });
        //this.registerChangeInFinalOrganizationNiazsanjis();
    }

    ngOnDestroy() {
        //this.eventManager.destroy(this.eventSubscriber);
        this.eventManager.destroy(this.criteriaSubscriber);
    }

    trackId(index: number, item: IFinalOrganizationNiazsanjiMarineSuffix) {
        return item.id;
    }

    registerChangeInFinalOrganizationNiazsanjis() {
        this.eventSubscriber = this.eventManager.subscribe('finalOrganizationNiazsanjiListModification', response => this.loadAll());
    }

    sort() {
        const result = [this.predicate + ',' + (this.reverse ? 'asc' : 'desc')];
        if (this.predicate !== 'id') {
            result.push('id');
        }
        return result;
    }

    private paginateFinalOrganizationNiazsanjis(data: IFinalOrganizationNiazsanjiMarineSuffix[], headers: HttpHeaders) {
        this.links = this.parseLinks.parse(headers.get('link'));
        this.totalItems = parseInt(headers.get('X-Total-Count'), 10);
        this.queryCount = this.totalItems;
        this.finalOrganizationNiazsanjis = this.convertObjectDatesService.changeArrayDate(data);
    }
    private onSuccess(errorMessage: string) {
        this.jhiAlertService.success(errorMessage, null, null);
        this.loadAll(this.criteria);
    }
    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
        this.loadAll(this.criteria);
    }
}
