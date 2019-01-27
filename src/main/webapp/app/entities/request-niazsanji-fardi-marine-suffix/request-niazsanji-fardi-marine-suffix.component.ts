import {Component, OnInit, OnDestroy} from '@angular/core';
import {HttpErrorResponse, HttpHeaders, HttpResponse} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {JhiEventManager, JhiParseLinks, JhiAlertService, JhiDataUtils} from 'ng-jhipster';

import {IRequestNiazsanjiFardiMarineSuffix} from 'app/shared/model/request-niazsanji-fardi-marine-suffix.model';
import {AccountService, IUser, Principal, UserService} from 'app/core';

import {ITEMS_PER_PAGE} from 'app/shared';
import {RequestNiazsanjiFardiMarineSuffixService} from './request-niazsanji-fardi-marine-suffix.service';
import {SearchPanelModel} from "app/shared/model/custom/searchbar.model";
import {GREGORIAN_START_END_DATE} from "app/shared/constants/years.constants";
import {IEducationalModuleMarineSuffix} from "app/shared/model/educational-module-marine-suffix.model";
import {EducationalModuleMarineSuffixService} from "app/entities/educational-module-marine-suffix";
import {ConvertObjectDatesService} from "app/plugin/utilities/convert-object-dates";
import {IOrganizationChartMarineSuffix} from "app/shared/model/organization-chart-marine-suffix.model";
import {OrganizationChartMarineSuffixService} from "app/entities/organization-chart-marine-suffix";
import {IRequestOrganizationNiazsanjiMarineSuffix} from "app/shared/model/request-organization-niazsanji-marine-suffix.model";
import {RequestStatus} from "app/shared/model/enums/RequestStatus";
import {
    FinalOrganizationNiazsanjiMarineSuffix,
    IFinalOrganizationNiazsanjiMarineSuffix
} from "app/shared/model/final-organization-niazsanji-marine-suffix.model";
import {IUsersRequestMarineSuffix} from "app/shared/model/users-request-marine-suffix.model";
import {ExcelService} from "app/plugin/export-excel/excel-service";
import {TranslateService} from '@ngx-translate/core';
import {IPersonMarineSuffix} from "app/shared/model/person-marine-suffix.model";
import {PersonMarineSuffixService} from "app/entities/person-marine-suffix";
import {TreeUtilities} from "app/plugin/utilities/tree-utilities";

@Component({
    selector: 'mi-request-niazsanji-fardi-marine-suffix',
    templateUrl: './request-niazsanji-fardi-marine-suffix.component.html',
    styleUrls: ['./request-niazsanji-fardi-marine-suffix.scss']
})
export class RequestNiazsanjiFardiMarineSuffixComponent implements OnInit, OnDestroy {
    currentAccount: any;
    requestNiazsanjiFardis: IRequestNiazsanjiFardiMarineSuffix[];
    educationalModules: IEducationalModuleMarineSuffix[];
    organizationcharts: IOrganizationChartMarineSuffix[];
    users: IUser[];
    people: IPersonMarineSuffix[];
    currentPerson: IPersonMarineSuffix;
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
    isKarbar: boolean = false;
    isModirGhesmat: boolean = false;
    isModirSannat: boolean = false;
    isOther: boolean = false;

    criteriaSubscriber: Subscription;
    searchbarModel: SearchPanelModel[];
    done: boolean = false;
    criteria: any;

    yearsCollections: any[];

    constructor(
        protected requestNiazsanjiFardiService: RequestNiazsanjiFardiMarineSuffixService,
        private educationalModuleService: EducationalModuleMarineSuffixService,
        private organizationChartService: OrganizationChartMarineSuffixService,
        private personService: PersonMarineSuffixService,
        protected parseLinks: JhiParseLinks,
        protected jhiAlertService: JhiAlertService,
        protected principal: Principal,
        protected activatedRoute: ActivatedRoute,
        protected dataUtils: JhiDataUtils,
        protected router: Router,
        protected eventManager: JhiEventManager,
        protected jhiTranslate: TranslateService,
        protected treeUtilities: TreeUtilities,
        protected userService: UserService,
        private convertObjectDatesService: ConvertObjectDatesService
    ) {
        this.itemsPerPage = ITEMS_PER_PAGE;
        this.routeData = this.activatedRoute.data.subscribe(data => {
            this.page = data.pagingParams.page;
            this.previousPage = data.pagingParams.page;
            this.reverse = data.pagingParams.descending;
            this.predicate = data.pagingParams.predicate;
        });

        this.setPermission();
        this.criteriaSubscriber = this.eventManager.subscribe('marineindustryprojApp.criteria', (criteria) => {

            this.criteria = criteria.content;
            this.done = true;
            this.createCriteria(criteria.content);

        });

        this.yearsCollections = GREGORIAN_START_END_DATE;

    }

    createCriteria(criteria?,excelExport: boolean = false) {

        if (criteria) {
            let val = +criteria.find(a => a.key == 'yearId.equals').value;
            criteria.pop('yearId');
            if (val) {
                let yearDetail = this.yearsCollections.find(a => a.year == val);
                let beginDate = new Date(yearDetail.beginDate).toISOString();
                let endDate = new Date(yearDetail.endDate).toISOString();

                criteria.push({
                    key: 'createDate.lessOrEqualThan', value: endDate
                });
                criteria.push({
                    key: 'createDate.greaterOrEqualThan', value: beginDate
                });
            }
        }
        if(!this.organizationcharts) {
            this.organizationChartService.query().subscribe(
                (res: HttpResponse<IOrganizationChartMarineSuffix[]>) => {

                    this.organizationcharts = res.body;
                    this.organizationcharts = this.makeOrganizationChart();

                    this.educationalModuleService.query().subscribe(
                        (res: HttpResponse<IEducationalModuleMarineSuffix[]>) => {
                            let dates = [{id: 1395, title: '1395'}, {id: 1396, title: '1396'}, {
                                id: 1397,
                                title: '1397'
                            }, {id: 1398, title: '1398'},
                                {id: 1399, title: '1399'}, {id: 1400, title: '1400'}, {
                                    id: 1401,
                                    title: '1401'
                                }, {id: 1402, title: '1402'}, {id: 1403, title: '1403'}, {id: 1404, title: '1404'}
                                , {id: 1405, title: '1405'}];
                            this.educationalModules = res.body;
                            this.searchbarModel = new Array<SearchPanelModel>();
                            this.searchbarModel.push(new SearchPanelModel('requestNiazsanjiFardi', 'organizationChartId', 'select', 'equals', this.organizationcharts));
                            this.searchbarModel.push(new SearchPanelModel('requestNiazsanjiFardi', 'allEducationalModuleId', 'select', 'equals', res.body));
                            this.searchbarModel.push(new SearchPanelModel('requestNiazsanjiFardi', 'approvedEducationalModuleId', 'select', 'equals', res.body));
                            this.searchbarModel.push(new SearchPanelModel('requestOrganizationNiazsanji', 'yearId', 'select', 'equals', dates));

                            this.finalCreateCriteria(criteria, excelExport);
                        },
                        (res: HttpErrorResponse) => {
                            this.onError(res.message);
                        }
                    );
                },
                (res: HttpErrorResponse) => {
                    this.onError(res.message);
                }
            );
        }
        else{
            this.finalCreateCriteria(criteria, excelExport);
        }

    }
    finalCreateCriteria(criteria,excelExport: boolean = false){
        if (!this.isAdmin) {
            if(!criteria){
                criteria = [];
            }
            if(this.isKarbar){
                if(this.currentPerson == undefined){
                    this.personService.query().subscribe((resp: HttpResponse<IPersonMarineSuffix[]>) => {

                        this.people = resp.body;
                        this.currentPerson = this.people.find(a => a.id == this.currentAccount.personId);
                    });
                }
                criteria.push({key: 'createUserLogin.equals', value: this.currentAccount.login});
                this.loadAll(criteria, excelExport);
                return;
            }
            if(this.isModirGhesmat){


                if(this.currentPerson == undefined){
                    this.personService.query().subscribe((resp: HttpResponse<IPersonMarineSuffix[]>) => {

                        this.people = resp.body;
                        this.currentPerson = this.people.find(a => a.id == this.currentAccount.personId);
                        this.handleModirGhesmat(criteria, excelExport);
                    });
                }
                else {
                    this.handleModirGhesmat(criteria, excelExport);
                }
            }
            if(this.isOther){
                if(this.currentPerson == undefined){
                    this.personService.query().subscribe((resp: HttpResponse<IPersonMarineSuffix[]>) => {

                        this.people = resp.body;
                        this.currentPerson = this.people.find(a => a.id == this.currentAccount.personId);
                        this.handleOther(criteria, excelExport);
                    });
                }
                else {
                    this.handleOther(criteria, excelExport);
                }
            }
        }
        else{
            if(this.currentPerson == undefined){
                this.personService.query().subscribe((resp: HttpResponse<IPersonMarineSuffix[]>) => {

                    this.people = resp.body;
                    this.currentPerson = this.people.find(a => a.id == this.currentAccount.personId);
                });
            }
            this.loadAll(criteria, excelExport);
        }
    }
    handleOther(criteria, excelExport: boolean = false){
        if(!this.users) {
            this.userService.query().subscribe((resp: HttpResponse<IUser[]>) => {
                this.users = resp.body;
                debugger;
                let orgIds = this.treeUtilities.getAllOfThisTreeIds(this.organizationcharts, this.currentPerson.organizationChartId);
                if(orgIds) {
                    let wantPeopleIds = this.people.filter(a => orgIds.includes(a.organizationChartId)).map(a => a.id);
                    if(wantPeopleIds){
                        let selectedUsers = this.users.filter(a => wantPeopleIds.includes(a.personId));
                        if(selectedUsers) {
                            //selectedUsers = selectedUsers.filter(a => a.authorities.includes('ROLE_KARBAR') || a.authorities.includes('ROLE_MODIR_GHESMAT'));
                            if(selectedUsers) {
                                criteria.push({key: 'createUserLogin.in', value: selectedUsers.map(a => a.login)});
                            }
                        }
                    }
                }
                criteria.push({
                    key:'status.greaterOrEqualThan', value: 10
                });
                this.loadAll(criteria, excelExport);
                return;
            });
        }
        else{
            debugger;
            let orgIds = this.treeUtilities.getAllOfThisTreeIds(this.organizationcharts, this.currentPerson.organizationChartId);
            if(orgIds) {
                let wantPeopleIds = this.people.filter(a => orgIds.includes(a.organizationChartId)).map(a => a.id);
                if(wantPeopleIds){
                    let selectedUsers = this.users.filter(a => wantPeopleIds.includes(a.personId));
                    if(selectedUsers) {
                        //selectedUsers = selectedUsers.filter(a => a.authorities.includes('ROLE_KARBAR') || a.authorities.includes('ROLE_MODIR_GHESMAT'));
                        if(selectedUsers) {
                            criteria.push({key: 'createUserLogin.in', value: selectedUsers.map(a => a.login)});
                        }
                    }
                }
            }
            criteria.push({
                key:'status.greaterOrEqualThan', value: 10
            });
            this.loadAll(criteria, excelExport);
            return;
        }
    }
    handleModirGhesmat(criteria, excelExport: boolean = false){
        if(!this.users) {
            this.userService.query().subscribe((resp: HttpResponse<IUser[]>) => {

                this.users = resp.body;
                let orgIds = this.treeUtilities.getAllOfChilderenIdsOfThisId(this.organizationcharts, this.currentPerson.organizationChartId);
                if(orgIds) {
                    let wantPeopleIds = this.people.filter(a => orgIds.includes(a.organizationChartId)).map(a => a.id);
                    if(wantPeopleIds) {
                        let selectedUsers = this.users.filter(a => wantPeopleIds.includes(a.personId));
                        if(selectedUsers) {
                            selectedUsers = selectedUsers.filter(a => a.authorities.includes('ROLE_KARBAR') || a.authorities.includes('ROLE_MODIR_GHESMAT'));
                            if(selectedUsers) {
                                criteria.push({key: 'createUserLogin.in', value: selectedUsers.map(a => a.login)});
                            }
                        }
                    }
                }
                criteria.push({
                    key:'status.greaterOrEqualThan', value: 5
                });
                this.loadAll(criteria, excelExport);
                return;
            });
        }
        else{

            let orgIds = this.treeUtilities.getAllOfChilderenIdsOfThisId(this.organizationcharts, this.currentPerson.organizationChartId);
            if(orgIds) {
                let wantPeopleIds = this.people.filter(a => orgIds.includes(a.organizationChartId)).map(a => a.id);
                if(wantPeopleIds) {
                    let selectedUsers = this.users.filter(a => wantPeopleIds.includes(a.personId));
                    if(selectedUsers) {
                        selectedUsers = selectedUsers.filter(a => a.authorities.includes('ROLE_KARBAR') || a.authorities.includes('ROLE_MODIR_GHESMAT'));
                        if(selectedUsers) {
                            criteria.push({key: 'createUserLogin.in', value: selectedUsers.map(a => a.login)});
                        }
                    }
                }
            }
            criteria.push({
                key:'status.greaterOrEqualThan', value: 5
            });
            this.loadAll(criteria, excelExport);
            return;
        }
    }

    loadAll(criteria?,excelExport: boolean = false) {
        //criteria = this.createCriteria(criteria)
        this.requestNiazsanjiFardiService
            .query({
                page: this.page - 1,
                size: this.itemsPerPage,
                criteria,
                sort: this.sort()
            })
            .subscribe(
                (res: HttpResponse<IRequestNiazsanjiFardiMarineSuffix[]>) => {
                    if(excelExport)
                        this.prepareForExportExcel(res.body);
                    else
                        this.paginateRequestNiazsanjiFardis(res.body, res.headers)
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
    }

    loadPage(page: number) {
        if (page !== this.previousPage) {
            this.previousPage = page;
            this.transition();
        }
    }

    export() {

        let criteria = this.createCriteria(this.criteria,true);
        /*this.requestNiazsanjiFardiService
            .query({
                page: this.page - 1,
                size: this.itemsPerPage,
                criteria,
                sort: this.sort()
            })
            .subscribe(
                (res: HttpResponse<IRequestNiazsanjiFardiMarineSuffix[]>) => this.prepareForExportExcel(res.body),
                (res: HttpErrorResponse) => this.onError(res.message)
            );*/

    }
    prepareForExportExcel(res : IRequestNiazsanjiFardiMarineSuffix[]){
        let a = new ExcelService(this.jhiTranslate);
        res = this.convertObjectDatesService.changeArrayDate(res);
        let report = [];
        let index: number = 0;
        res.forEach(a => {

            index++;
            let org = this.organizationcharts.find(w => w.id == a.organizationChartId).fullTitle;
            let person = this.people.find(w => w.id == a.personId);
            if(a.allEducationalModuleId)
            {
                index++;
                let allEducationalModule = this.educationalModules.find(w => w.id == a.allEducationalModuleId);
                let obj: Object;
                obj = {'index': index,
                    'organizationChartId': org,
                    'personName': person.fullName,
                    'jobTitle': person.jobTitle,
                    'educationalModule': a.allEducationalModuleTitle,
                    'timeEducationalModule': (allEducationalModule.learningTimePractical ? allEducationalModule.learningTimePractical : 0) + (allEducationalModule.learningTimeTheorical ? allEducationalModule.learningTimeTheorical : 0),
                    'levelEducationalModule': allEducationalModule.skillableLevelOfSkillTitle,
                    'costEducationalModule': a.costAllEducationalModule,
                    'createDate': a.createDate,
                };
                report.push(obj);
            }
            if(a.approvedEducationalModuleId){
                index++;
                let approvedEducationalModule = this.educationalModules.find(w => w.id == a.approvedEducationalModuleId);
                let obj: Object;
                obj = {'index': index,
                    'organizationChartId': org,
                    'personName': person.fullName,
                    'jobTitle': person.jobTitle,
                    'educationalModule': a.approvedEducationalModuleTitle,
                    'timeEducationalModule': (approvedEducationalModule.learningTimePractical ? approvedEducationalModule.learningTimePractical : 0) + (approvedEducationalModule.learningTimeTheorical ? approvedEducationalModule.learningTimeTheorical : 0),
                    'levelEducationalModule': approvedEducationalModule.skillableLevelOfSkillTitle,
                    'costEducationalModule': a.costApprovedEducationalModule,
                    'createDate': a.createDate,
                };
                report.push(obj);
            }
        });
        a.exportAsExcelFile(report, 'requestNiazsanjiFardis', 'marineindustryprojApp.requestNiazsanjiFardi');
    }
    transition() {
        /*this.router.navigate(['/request-niazsanji-fardi-marine-suffix'], {
            queryParams: {
                page: this.page,
                size: this.itemsPerPage,
                sort: this.predicate + ',' + (this.reverse ? 'asc' : 'desc')
            }
        });*/

        this.createCriteria(this.criteria);
    }

    clear() {
        this.page = 0;
        this.router.navigate([
            '/request-niazsanji-fardi-marine-suffix',
            {
                page: this.page,
                sort: this.predicate + ',' + (this.reverse ? 'asc' : 'desc')
            }
        ]);

        this.createCriteria();
    }

    changeStatus(requestNiazsanjiFardi: IRequestNiazsanjiFardiMarineSuffix, newStatus: string) {
        if (confirm("آیا از تغییر وضعیت مطمئنید؟")) {
            this.requestNiazsanjiFardiService.find(requestNiazsanjiFardi.id).subscribe((resp) => {
                let model = resp.body;
                //var requestStatus : RequestStatus = RequestStatus[newStatus];
                //let requestStatus: keyof typeof RequestStatus = newStatus;
                //var requestStatus: RequestStatus = <RequestStatus>RequestStatus[newStatus];

                model.requestStatus = this.convertObjectDatesService.convertString2RequestStatus(newStatus);
                model.changeStatusUserLogin = this.currentAccount.login;
                this.requestNiazsanjiFardiService.update(model).subscribe(
                    (res: HttpResponse<IRequestNiazsanjiFardiMarineSuffix>) => this.onSaveSuccess(),
                    (res: HttpErrorResponse) => this.onSaveError()
                );
            });
        }
    }
    ngOnInit() {

        if (!this.done) {
            this.createCriteria();
        }
        //this.registerChangeInRequestNiazsanjiFardis();
    }

   /* reject(mymodel: IRequestNiazsanjiFardiMarineSuffix) {
        if (confirm("آیا برای رد کردن کامل درخواست موافقید؟")) {
            this.requestNiazsanjiFardiService.find(mymodel.id).subscribe((resp) => {
                let model = resp.body;
                model.requestStatus = RequestStatus.IGNORE;
                model.changeStatusUserLogin = this.currentAccount.login;
                this.requestNiazsanjiFardiService.update(model).subscribe(
                    (res: HttpResponse<IRequestNiazsanjiFardiMarineSuffix>) => this.onSaveSuccessIgnore(),
                    (res: HttpErrorResponse) => this.onSaveError()
                );
            });
        }
    }

    complete(mymodel: IRequestOrganizationNiazsanjiMarineSuffix) {
        this.requestNiazsanjiFardiService.find(mymodel.id).subscribe((resp) => {
            let model = resp.body;
            if (confirm("آیا از تایید و نهایی کردن این درخواست مطمئنید.")) {

                this.requestNiazsanjiFardiService.finalize(model).subscribe(
                    (res: HttpResponse<IFinalOrganizationNiazsanjiMarineSuffix>) => this.onSaveSuccess(),
                    (res: HttpErrorResponse) => this.onSaveError()
                );
            }
        });
    }*/

    private onSaveSuccess() {
        this.createCriteria(this.criteria);
        this.jhiAlertService.success("marineindustryprojApp.requestNiazsanjiFardi.completed");
    }

    private onSaveSuccessIgnore() {
        this.createCriteria(this.criteria);
        this.jhiAlertService.success("marineindustryprojApp.requestNiazsanjiFardi.rejected");
    }

    private onSaveError() {

    }

    /*private updateRequest(model: IRequestNiazsanjiFardiMarineSuffix){
        //let ss: RequestStatus = RequestStatus.ACCEPT;
        model.requestStatus = RequestStatus.ACCEPT;
        model.changeStatusUserLogin = this.currentAccount.login;
        this.requestNiazsanjiFardiService.update(model).subscribe(
            (res: HttpResponse<IRequestNiazsanjiFardiMarineSuffix>) => this.onSaveSuccess(),
            (res: HttpErrorResponse) => this.onSaveError()
        );
    }*/
    makeOrganizationChart(): IOrganizationChartMarineSuffix[] {
        this.organizationcharts.forEach(a => {
            let fathers = this.appendParent(a);
            //a.title = this.appendParent(a);
            let array = fathers.split('>');
            if (array.length) {
                for (let i = 0; i < array.length - 1; i++) {
                    array[i] = '-----';
                    if (i == array.length - 2) {
                        array[i] += "|";
                    }
                }
                a.title = array.join("");
            }
            else {
                a.title = fathers;
            }

            let hasChild = this.organizationcharts.find(w => w.parentId == a.id);
            if (hasChild) {
                a["disabled"] = true;
            } else {
                a["disabled"] = false;
            }
        });
        return this.organizationcharts;
    }

    appendParent(org: IOrganizationChartMarineSuffix): string {
        let fullTitle = org.title;
        if (org.parentId) {
            let father = this.organizationcharts.find(a => a.id == org.parentId);
            return this.appendParent(father) + " > " + fullTitle;
        }
        return fullTitle;
    }

    ngOnDestroy() {
        //this.eventManager.destroy(this.eventSubscriber);
        this.eventManager.destroy(this.criteriaSubscriber);
        /*this.eventManager.destroy(this.subOrg);
        this.eventManager.destroy(this.subEducation);*/
    }

    trackId(index: number, item: IRequestNiazsanjiFardiMarineSuffix) {
        return item.id;
    }

    registerChangeInRequestNiazsanjiFardis() {
        this.eventSubscriber = this.eventManager.subscribe('requestNiazsanjiFardiListModification', response => this.createCriteria());
    }

    sort() {

        const result = [this.predicate + ',' + (this.reverse ? 'asc' : 'desc')];
        if (this.predicate !== 'id') {
            result.push('id');
        }
        return result;
    }

    protected paginateRequestNiazsanjiFardis(data: IRequestNiazsanjiFardiMarineSuffix[], headers: HttpHeaders) {
        this.links = this.parseLinks.parse(headers.get('link'));
        this.totalItems = parseInt(headers.get('X-Total-Count'), 10);
        this.queryCount = this.totalItems;
        this.requestNiazsanjiFardis = this.convertObjectDatesService.changeArrayDate(data);
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
    setPermission(){
        this.principal.identity().then(account => {

            this.currentAccount = account;
            if(account.authorities.find(a => a == "ROLE_ADMIN") !== undefined)
                this.isAdmin = true;

            if(account.authorities.find(a => a == "ROLE_KARBAR") !== undefined)
                this.isKarbar = true;

            if(account.authorities.find(a => a == "ROLE_MODIR_GHESMAT") !== undefined)
                this.isModirGhesmat = true;

            if(account.authorities.find(a => a == "ROLE_MODIR_SANNAT") !== undefined)
                this.isModirSannat = true;

            if(account.authorities.find(a => a == "ROLE_MODIR_GHESMAT") == undefined && account.authorities.find(a => a == "ROLE_KARBAR") == undefined)
                this.isOther = true;
        });
    }
}
