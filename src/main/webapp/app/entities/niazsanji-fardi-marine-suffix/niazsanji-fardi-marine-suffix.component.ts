import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiParseLinks, JhiAlertService, JhiDataUtils } from 'ng-jhipster';

import { INiazsanjiFardiMarineSuffix } from 'app/shared/model/niazsanji-fardi-marine-suffix.model';
import {AccountService, Principal} from 'app/core';

import { ITEMS_PER_PAGE } from 'app/shared';
import { NiazsanjiFardiMarineSuffixService } from './niazsanji-fardi-marine-suffix.service';
import {ConvertObjectDatesService} from "app/plugin/utilities/convert-object-dates";
import {SearchPanelModel} from "app/shared/model/custom/searchbar.model";
import {GREGORIAN_START_END_DATE} from "app/shared/constants/years.constants";
import {IOrganizationChartMarineSuffix} from "app/shared/model/organization-chart-marine-suffix.model";
import {IEducationalModuleMarineSuffix} from "app/shared/model/educational-module-marine-suffix.model";
import {EducationalModuleMarineSuffixService} from "app/entities/educational-module-marine-suffix";
import {OrganizationChartMarineSuffixService} from "app/entities/organization-chart-marine-suffix";
import {IFinalOrganizationNiazsanjiMarineSuffix} from "app/shared/model/final-organization-niazsanji-marine-suffix.model";

@Component({
    selector: 'mi-niazsanji-fardi-marine-suffix',
    templateUrl: './niazsanji-fardi-marine-suffix.component.html'
})
export class NiazsanjiFardiMarineSuffixComponent implements OnInit, OnDestroy {
    currentAccount: any;
    niazsanjiFardis: INiazsanjiFardiMarineSuffix[];
    educationalModules: IEducationalModuleMarineSuffix[];
    organizationcharts: IOrganizationChartMarineSuffix[];
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
    isAdmin: boolean;

    criteriaSubscriber: Subscription;
    searchbarModel: SearchPanelModel[];
    done:boolean = false;
    criteria: any;

    yearsCollections: any[];

    constructor(
        protected niazsanjiFardiService: NiazsanjiFardiMarineSuffixService,
        private educationalModuleService: EducationalModuleMarineSuffixService,
        private organizationChartService: OrganizationChartMarineSuffixService,
        protected parseLinks: JhiParseLinks,
        protected jhiAlertService: JhiAlertService,
        protected principal: Principal,
        protected activatedRoute: ActivatedRoute,
        protected dataUtils: JhiDataUtils,
        protected router: Router,
        protected eventManager: JhiEventManager,
        private convertObjectDatesService : ConvertObjectDatesService
    ) {
        this.itemsPerPage = ITEMS_PER_PAGE;
        this.routeData = this.activatedRoute.data.subscribe(data => {
            this.page = data.pagingParams.page;
            this.previousPage = data.pagingParams.page;
            this.reverse = data.pagingParams.descending;
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
        this.niazsanjiFardiService
            .query({
                page: this.page - 1,
                size: this.itemsPerPage,
                criteria,
                sort: this.sort()
            })
            .subscribe(
                (res: HttpResponse<INiazsanjiFardiMarineSuffix[]>) => this.paginateNiazsanjiFardis(res.body, res.headers),
                (res: HttpErrorResponse) => this.onError(res.message)
            );
    }

    loadPage(page: number) {
        if (page !== this.previousPage) {
            this.previousPage = page;
            this.transition();
        }
    }

    transition() {
        /*this.router.navigate(['/niazsanji-fardi-marine-suffix'], {
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
            '/niazsanji-fardi-marine-suffix',
            {
                page: this.page,
                sort: this.predicate + ',' + (this.reverse ? 'asc' : 'desc')
            }
        ]);
        this.loadAll();
    }
    complete(mymodel){

        this.niazsanjiFardiService.find(mymodel.id).subscribe((resp) => {
            let model = resp.body;

            if (confirm("آیا از اجرا کردن این دوره فردی مورد نظر مطمئنید.")) {

                this.niazsanjiFardiService.finalize(model).subscribe(
                    (res: HttpResponse<IFinalOrganizationNiazsanjiMarineSuffix>) => this.onSuccess("دوره متمرکز مورد نظر شما به مرحله اجرا وارد شد."),
                    (res: HttpErrorResponse) => this.onError(res.message)
                );
            }
        });
    }
    ngOnInit() {
        this.principal.identity().then(account => {
            this.currentAccount = account;
            if(account.authorities.find(a => a == "ROLE_ADMIN") !== undefined)
                this.isAdmin = true;
            this.organizationChartService.query().subscribe(

                (res: HttpResponse<IOrganizationChartMarineSuffix[]>) => {

                    this.organizationcharts = res.body;
                    this.organizationcharts = this.makeOrganizationChart();

                    this.educationalModuleService.query().subscribe(
                        (res: HttpResponse<IEducationalModuleMarineSuffix[]>) => {

                            let dates = [{id:1395,title:'1395'},{id:1396,title:'1396'},{id:1397,title:'1397'},{id:1398,title:'1398'},
                                {id:1399,title:'1399'},{id:1400,title:'1400'},{id:1401,title:'1401'},{id:1402,title:'1402'},{id:1403,title:'1403'},{id:1404,title:'1404'}
                                ,{id:1405,title:'1405'}];
                            this.educationalModules = res.body;
                            this.searchbarModel = new Array<SearchPanelModel>();
                            this.searchbarModel.push(new SearchPanelModel('requestNiazsanjiFardi','organizationChartId','select', 'equals', this.organizationcharts));
                            this.searchbarModel.push(new SearchPanelModel('niazsanjiFardi','educationalModuleId','select', 'equals', res.body));
                            this.searchbarModel.push(new SearchPanelModel('requestOrganizationNiazsanji','yearId','select','equals', dates));
                        },
                        (res: HttpErrorResponse) => this.onError(res.message)
                    );
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
            if(!this.done){
                this.loadAll();
            }
        });
        //this.registerChangeInNiazsanjiFardis();
    }
    makeOrganizationChart() : IOrganizationChartMarineSuffix[] {
        this.organizationcharts.forEach(a => {
            let fathers = this.appendParent(a);
            //a.title = this.appendParent(a);
            let array = fathers.split('>');
            if(array.length){
                for (let i = 0; i < array.length - 1; i++) {
                    array[i] = '-----';
                    if(i == array.length - 2)
                    {
                        array[i] += "|";
                    }
                }
                a.title = array.join("");
            }
            else {
                a.title = fathers;
            }

            let hasChild = this.organizationcharts.find(w => w.parentId == a.id);
            if(hasChild)
                a["disabled"] = true;
            else
                a["disabled"] = false;
        });
        return this.organizationcharts;
    }
    appendParent(org: IOrganizationChartMarineSuffix): string{
        let fullTitle = org.title;
        if(org.parentId){
            let father = this.organizationcharts.find(a => a.id == org.parentId);
            return this.appendParent(father) + " > " + fullTitle;
        }
        return fullTitle;
    }
    ngOnDestroy() {
        //this.eventManager.destroy(this.eventSubscriber);
        this.eventManager.destroy(this.criteriaSubscriber);
    }

    trackId(index: number, item: INiazsanjiFardiMarineSuffix) {
        return item.id;
    }

    byteSize(field) {
        return this.dataUtils.byteSize(field);
    }

    openFile(contentType, field) {
        return this.dataUtils.openFile(contentType, field);
    }

    registerChangeInNiazsanjiFardis() {
        this.eventSubscriber = this.eventManager.subscribe('niazsanjiFardiListModification', response => this.loadAll());
    }

    sort() {
        const result = [this.predicate + ',' + (this.reverse ? 'asc' : 'desc')];
        if (this.predicate !== 'id') {
            result.push('id');
        }
        return result;
    }

    protected paginateNiazsanjiFardis(data: INiazsanjiFardiMarineSuffix[], headers: HttpHeaders) {
        debugger;
        this.links = this.parseLinks.parse(headers.get('link'));
        this.totalItems = parseInt(headers.get('X-Total-Count'), 10);
        this.queryCount = this.totalItems;
        this.niazsanjiFardis = this.convertObjectDatesService.changeArrayDate(data,true);
    }
    private onSuccess(errorMessage: string) {
        this.jhiAlertService.success(errorMessage, null, null);
        this.loadAll(this.criteria);
    }
    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
        this.loadAll(this.criteria);
    }
}
