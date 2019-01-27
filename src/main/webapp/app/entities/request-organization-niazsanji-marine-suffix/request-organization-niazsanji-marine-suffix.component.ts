import {Component, OnDestroy, OnInit} from '@angular/core';
import {HttpErrorResponse, HttpHeaders, HttpResponse} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {JhiAlertService, JhiEventManager, JhiParseLinks} from 'ng-jhipster';

import {IRequestOrganizationNiazsanjiMarineSuffix} from 'app/shared/model/request-organization-niazsanji-marine-suffix.model';
import {Principal} from 'app/core';

import {ITEMS_PER_PAGE} from 'app/shared';
import {RequestOrganizationNiazsanjiMarineSuffixService} from './request-organization-niazsanji-marine-suffix.service';
import {ExcelService} from "app/plugin/export-excel/excel-service";
import {TranslateService} from '@ngx-translate/core';
import {
    FinalOrganizationNiazsanjiMarineSuffix,
    IFinalOrganizationNiazsanjiMarineSuffix
} from "app/shared/model/final-organization-niazsanji-marine-suffix.model";
import {FinalOrganizationNiazsanjiMarineSuffixService} from "app/entities/final-organization-niazsanji-marine-suffix/final-organization-niazsanji-marine-suffix.service";
import {RequestStatus} from "app/shared/model/enums/RequestStatus";
import {ConvertObjectDatesService} from "app/plugin/utilities/convert-object-dates";
import {SearchPanelModel} from "app/shared/model/custom/searchbar.model";
import {IEducationalModuleMarineSuffix} from "app/shared/model/educational-module-marine-suffix.model";
import {EducationalModuleMarineSuffixService} from "app/entities/educational-module-marine-suffix";
import {GREGORIAN_START_END_DATE} from "app/shared/constants/years.constants";
import {IOrganizationChartMarineSuffix} from "app/shared/model/organization-chart-marine-suffix.model";
import {OrganizationChartMarineSuffixService} from "app/entities/organization-chart-marine-suffix";

@Component({
    selector: 'mi-request-organization-niazsanji-marine-suffix',
    templateUrl: './request-organization-niazsanji-marine-suffix.component.html',
    styleUrls: ['./request-organization-niazsanji-marine-suffix.scss']
})
export class RequestOrganizationNiazsanjiMarineSuffixComponent implements OnInit, OnDestroy {
    currentAccount: any;
    requestOrganizationNiazsanjis: IRequestOrganizationNiazsanjiMarineSuffix[];
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
        private requestOrganizationNiazsanjiService: RequestOrganizationNiazsanjiMarineSuffixService,
        private finalOrganizationNiazsanjiMarineSuffixService: FinalOrganizationNiazsanjiMarineSuffixService,
        private organizationChartService: OrganizationChartMarineSuffixService,
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
        if(!this.isAdmin) {
            if (criteria) {
                criteria.push({key: 'createUserLogin.equals', value: this.currentAccount.login})
            }
            else {
                criteria = [
                    {key: 'createUserLogin.equals', value: this.currentAccount.login}
                ];
            }
        }
        return criteria;
    }
    loadAll(criteria?) {
        criteria = this.createCriteria(criteria)
        this.requestOrganizationNiazsanjiService
            .query({
                page: this.page - 1,
                size: this.itemsPerPage,
                criteria,
                sort: this.sort()
            })
            .subscribe(
                (res: HttpResponse<IRequestOrganizationNiazsanjiMarineSuffix[]>) =>
                    this.paginateRequestOrganizationNiazsanjis(res.body, res.headers),
                (res: HttpErrorResponse) => this.onError(res.message)
            );
    }
    reject(mymodel: IRequestOrganizationNiazsanjiMarineSuffix)
    {
        if(confirm("آیا برای رد کردن کامل درخواست موافقید؟")) {
            this.requestOrganizationNiazsanjiService.find(mymodel.id).subscribe((resp) => {
                let model = resp.body;
                model.requestStatus = RequestStatus.IGNORE;
                model.changeStatusUserLogin = this.currentAccount.login;
                this.requestOrganizationNiazsanjiService.update(model).subscribe(
                    (res: HttpResponse<IRequestOrganizationNiazsanjiMarineSuffix>) => this.onSaveSuccessIgnore(),
                    (res: HttpErrorResponse) => this.onSaveError()
                );
        });
        }
    }
    complete(mymodel: IRequestOrganizationNiazsanjiMarineSuffix){
        this.requestOrganizationNiazsanjiService.find(mymodel.id).subscribe((resp) => {
            let model = resp.body;
            if (model.teacherNotFound) {
                this.onError("marineindustryprojApp.requestOrganizationNiazsanji.teacherNotFoundError");
                return;
            }
            if (confirm("آیا از تایید و نهایی کردن این درخواست مطمئنید.")) {

                let finalOrganizationNiazsanji: IFinalOrganizationNiazsanjiMarineSuffix = new FinalOrganizationNiazsanjiMarineSuffix();
                finalOrganizationNiazsanji.organizationChartId = model.organizationChartId;
                finalOrganizationNiazsanji.requestOrganizationNiazsanjiId = model.id;
                finalOrganizationNiazsanji.code = model.code;
                finalOrganizationNiazsanji.requestStatus = RequestStatus.ACCEPT;
                finalOrganizationNiazsanji.archived = false;
                finalOrganizationNiazsanji.description = model.description;
                finalOrganizationNiazsanji.documents = model.documents;
                finalOrganizationNiazsanji.educationalModuleId = model.educationalModuleId;
                finalOrganizationNiazsanji.neededHardware = model.neededHardware;
                finalOrganizationNiazsanji.neededSoftwares = model.neededSoftwares;
                finalOrganizationNiazsanji.people = model.people;
                finalOrganizationNiazsanji.priceCost = model.priceCost;
                finalOrganizationNiazsanji.recommendedByOrgchart = model.recommendedByOrgchart;
                finalOrganizationNiazsanji.studentsType = model.studentsType;
                finalOrganizationNiazsanji.teachApproachId = model.teachApproachId;
                finalOrganizationNiazsanji.teacherMobile = model.teacherMobile;
                finalOrganizationNiazsanji.trainingGoals = model.trainingGoals;
                finalOrganizationNiazsanji.status = 0;
                finalOrganizationNiazsanji.teacherId = model.teacherId;
                this.finalOrganizationNiazsanjiMarineSuffixService.create(finalOrganizationNiazsanji).subscribe(
                    (res: HttpResponse<IFinalOrganizationNiazsanjiMarineSuffix>) => this.updateRequest(model),
                    (res: HttpErrorResponse) => this.onSaveError()
                );
            }
        });
    }
    private updateRequest(model: IRequestOrganizationNiazsanjiMarineSuffix){
        //let ss: RequestStatus = RequestStatus.ACCEPT;
        model.requestStatus = RequestStatus.ACCEPT;
        model.changeStatusUserLogin = this.currentAccount.login;
        this.requestOrganizationNiazsanjiService.update(model).subscribe(
            (res: HttpResponse<IRequestOrganizationNiazsanjiMarineSuffix>) => this.onSaveSuccess(),
            (res: HttpErrorResponse) => this.onSaveError()
        );
    }
    private onSaveSuccess() {
        this.loadAll(this.criteria);
        this.jhiAlertService.success("marineindustryprojApp.requestOrganizationNiazsanji.completed");
    }
    private onSaveSuccessIgnore() {
        this.loadAll(this.criteria);
        this.jhiAlertService.success("marineindustryprojApp.requestOrganizationNiazsanji.rejected");
    }
    private onSaveError() {

    }
    export() {
        let a = new ExcelService(this.jhiTranslate);
        a.exportAsExcelFile(this.requestOrganizationNiazsanjis, 'requestOrganizationNiazsanjis', 'marineindustryprojApp.requestOrganizationNiazsanji');
    }
    loadPage(page: number) {
        if (page !== this.previousPage) {
            this.previousPage = page;
            this.transition();
        }
    }

    transition() {
        /*this.router.navigate(['/request-organization-niazsanji-marine-suffix'], {
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
            '/request-organization-niazsanji-marine-suffix',
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
                    this.searchbarModel.push(new SearchPanelModel('requestOrganizationNiazsanji','educationalModuleId','select', 'equals', res.body));
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
        //this.registerChangeInRequestOrganizationNiazsanjis();
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

    trackId(index: number, item: IRequestOrganizationNiazsanjiMarineSuffix) {
        return item.id;
    }

    registerChangeInRequestOrganizationNiazsanjis() {
        this.eventSubscriber = this.eventManager.subscribe('requestOrganizationNiazsanjiListModification', response => this.loadAll());
    }

    sort() {

        const result = [this.predicate + ',' + (this.reverse ? 'asc' : 'desc')];
        if (this.predicate !== 'id') {
            result.push('id');
        }
        return result;
    }

    private paginateRequestOrganizationNiazsanjis(data: IRequestOrganizationNiazsanjiMarineSuffix[], headers: HttpHeaders) {

        this.links = this.parseLinks.parse(headers.get('link'));
        this.totalItems = parseInt(headers.get('X-Total-Count'), 10);
        this.queryCount = this.totalItems;
        this.requestOrganizationNiazsanjis = this.convertObjectDatesService.changeArrayDate(data);
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.warning(errorMessage);
    }
}
