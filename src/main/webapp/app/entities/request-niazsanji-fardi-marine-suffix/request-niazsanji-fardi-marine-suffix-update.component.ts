import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {HttpErrorResponse, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {JhiAlertService, JhiDataUtils} from 'ng-jhipster';

import {IRequestNiazsanjiFardiMarineSuffix} from 'app/shared/model/request-niazsanji-fardi-marine-suffix.model';
import {RequestNiazsanjiFardiMarineSuffixService} from './request-niazsanji-fardi-marine-suffix.service';
import {IDocumentMarineSuffix} from 'app/shared/model/document-marine-suffix.model';
import {DocumentMarineSuffixService} from 'app/entities/document-marine-suffix';
import {
    EducationalModuleMarineSuffix,
    IEducationalModuleMarineSuffix
} from 'app/shared/model/educational-module-marine-suffix.model';
import {EducationalModuleMarineSuffixService} from 'app/entities/educational-module-marine-suffix';
import {IPersonMarineSuffix} from 'app/shared/model/person-marine-suffix.model';
import {PersonMarineSuffixService} from 'app/entities/person-marine-suffix';
import {IOrganizationChartMarineSuffix} from 'app/shared/model/organization-chart-marine-suffix.model';
import {OrganizationChartMarineSuffixService} from 'app/entities/organization-chart-marine-suffix';
import {FinalNiazsanjiReportPersonMarineSuffixService} from "app/entities/final-niazsanji-report-person-marine-suffix";
import {IFinalNiazsanjiReportPersonMarineSuffix} from "app/shared/model/final-niazsanji-report-person-marine-suffix.model";
import {FinalNiazsanjiReportMarineSuffixService} from "app/entities/final-niazsanji-report-marine-suffix";
import {IFinalNiazsanjiReportMarineSuffix} from "app/shared/model/final-niazsanji-report-marine-suffix.model";
import {EducationalModuleJobMarineSuffixService} from "app/entities/educational-module-job-marine-suffix";
import {IEducationalModuleJobMarineSuffix} from "app/shared/model/educational-module-job-marine-suffix.model";
import {RequestStatus} from "app/shared/model/enums/RequestStatus";
import {IUser, Principal, UserService} from "app/core";
import {TreeUtilities} from "app/plugin/utilities/tree-utilities";
import {ConvertObjectDatesService} from "app/plugin/utilities/convert-object-dates";
import {IFinalOrganizationNiazsanjiMarineSuffix} from "app/shared/model/final-organization-niazsanji-marine-suffix.model";

@Component({
    selector: 'mi-request-niazsanji-fardi-marine-suffix-update',
    templateUrl: './request-niazsanji-fardi-marine-suffix-update.component.html',
    styleUrls:['./request-niazsanji-fardi-marine-suffix.scss']
})
export class RequestNiazsanjiFardiMarineSuffixUpdateComponent implements OnInit {
    requestNiazsanjiFardi: IRequestNiazsanjiFardiMarineSuffix;
    isSaving: boolean;

    documents: IDocumentMarineSuffix[];

    educationalmodules: IEducationalModuleMarineSuffix[];
    approvedEducationalmodules: IEducationalModuleMarineSuffix[];
    finalNiazsanjiReports: IFinalNiazsanjiReportMarineSuffix[];

    currentAccount: any;
    isAdmin: boolean = false;
    isKarbar: boolean = false;
    isModirGhesmat: boolean = false;
    isModirSannat: boolean = false;
    isOther: boolean = false;

    people: IPersonMarineSuffix[];
    predicate: any;
    reverse: any;

    organizationcharts: IOrganizationChartMarineSuffix[];
    createDate: string;
    modifyDate: string;
    archivedDate: string;
    answer:string;

    approvedHour: number = 0;
    approvedLevel: string;

    allHour: number = 0;
    allLevel: string;

    message: string;
    targetPeople: IPersonMarineSuffix[];

    constructor(
        protected dataUtils: JhiDataUtils,
        protected jhiAlertService: JhiAlertService,
        protected educationalModuleJobService: EducationalModuleJobMarineSuffixService,
        protected requestNiazsanjiFardiService: RequestNiazsanjiFardiMarineSuffixService,
        protected finalNiazsanjiReportPersonMarineSuffixService: FinalNiazsanjiReportPersonMarineSuffixService,
        protected finalNiazsanjiReportMarineSuffixService: FinalNiazsanjiReportMarineSuffixService,
        protected documentService: DocumentMarineSuffixService,
        protected educationalModuleService: EducationalModuleMarineSuffixService,
        protected personService: PersonMarineSuffixService,
        protected organizationChartService: OrganizationChartMarineSuffixService,
        private principal : Principal,
        protected activatedRoute: ActivatedRoute,
        private treeUtilities: TreeUtilities,
        private userService: UserService,
        private convertObjectDatesService: ConvertObjectDatesService
    ) {}
    onApprovedChange(event){
        this.approvedHour = (event.learningTimePractical ? event.learningTimePractical : 0) + (event.learningTimeTheorical ? event.learningTimeTheorical : 0);
        this.approvedLevel = event.skillableLevelOfSkillTitle;
    }
    onAllChange(event){
        this.allHour = (event.learningTimePractical ? event.learningTimePractical : 0) + (event.learningTimeTheorical ? event.learningTimeTheorical : 0);
        this.allLevel = event.skillableLevelOfSkillTitle;
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
            //this.currentUserFullName = document.getElementById("currenUserFullNameTopBar").innerText;

            if(this.isKarbar)
            {
                this.personService.find(this.currentAccount.personId).subscribe((resp: HttpResponse<IPersonMarineSuffix>) => {

                    this.requestNiazsanjiFardi.organizationChartId = resp.body.organizationChartId;
                    this.requestNiazsanjiFardi.personId = resp.body.id;
                    this.people = [];
                    this.people.push(resp.body);

                    this.onPersonChange(resp.body);
                    this.findTargetPeople(resp.body);

                }, (res: HttpErrorResponse) => this.onError(res.message));
            }

        });
    }
    findTargetPeople(person: IPersonMarineSuffix){
        let neededOrgIds : number[];

        if(this.isKarbar)
            neededOrgIds = this.treeUtilities.getParentIds(this.organizationcharts ,person.organizationChartId);
        if(this.isModirGhesmat)
            neededOrgIds = this.treeUtilities.getAllOfThisTreeIds(this.organizationcharts, person.organizationChartId);


        let criteria = [{
            key:'organizationChartId.in',
            value: neededOrgIds
        }];
        this.personService.query({
            page: 0,
            size: 20000,
            criteria,
            sort: ["id","asc"]
        }).subscribe((resp: HttpResponse<IPersonMarineSuffix[]>) => {
                let orgPeople = resp.body;
                let orgPeopleIds = resp.body.map(a => a.id);

                this.userService.query().subscribe((resp: HttpResponse<IUser[]>) =>{

                    let targetUsers = resp.body.filter(a => orgPeopleIds.includes(a.personId));
                    if(targetUsers) {
                        if (this.isKarbar) {
                            targetUsers = targetUsers.filter(a => a.authorities.includes('ROLE_MODIR_GHESMAT'));
                            if (targetUsers) {
                                let personIds = targetUsers.map(a => a.personId);
                                this.targetPeople = orgPeople.filter(a => personIds.includes(a.id));
                            }
                        }
                        if (this.isModirGhesmat) {
                            targetUsers = targetUsers.filter(a => a.authorities.includes('ROLE_MODIR_AMOOZESH'));
                            if (targetUsers) {
                                let personIds = targetUsers.map(a => a.personId);
                                this.targetPeople = orgPeople.filter(a => personIds.includes(a.id));
                            }
                        }
                    }
                });
            },
            (error) => this.onError("فردی یافت نشد."));

    }
    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ requestNiazsanjiFardi }) => {
            this.requestNiazsanjiFardi = requestNiazsanjiFardi;

            if(this.requestNiazsanjiFardi.id == null) {
                this.requestNiazsanjiFardi.costApprovedEducationalModule = 0;
                this.requestNiazsanjiFardi.costAllEducationalModule = 0;
            }

        });



        /*this.documentService.query().subscribe(
            (res: HttpResponse<IDocumentMarineSuffix[]>) => {
                this.documents = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );*/
        this.educationalModuleService.query().subscribe(
            (res: HttpResponse<IEducationalModuleMarineSuffix[]>) => {
                this.educationalmodules = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );

        this.organizationChartService.query().subscribe(
            (res: HttpResponse<IOrganizationChartMarineSuffix[]>) => {
                this.organizationcharts = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.organizationChartService.query().subscribe(

            (res: HttpResponse<IOrganizationChartMarineSuffix[]>) => {

                this.organizationcharts = res.body;

                this.organizationcharts.forEach(a => {
                    let hasChild = this.organizationcharts.find(w => w.parentId == a.id);
                    if(hasChild)
                        a["disabled"] = true;
                    else
                        a["disabled"] = false;
                });
                if(this.requestNiazsanjiFardi.organizationChartId){
                    let org = this.organizationcharts.find(a => a.id == this.requestNiazsanjiFardi.organizationChartId);
                    this.onOrganizationChartChange(org);
                }
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.setPermission();
    }
    onOrganizationChartChange(event){

        if(event.id){
            let criteria = [{
                key:'organizationChartId.equals',
                value: event.id
            }];
            this.personService.query({
                page: 0,
                size: 20000,
                criteria,
                sort: ["id","asc"]
            }).subscribe((resp) => {
                this.people = resp.body;
                if(this.requestNiazsanjiFardi.personId){
                    this.onPersonChange(this.people.find(a => a.id == this.requestNiazsanjiFardi.personId));
                }
                },
                (error) => this.onError("فردی یافت نشد."));
        }
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


            let educationCriteria = [{
                key:'jobId.equals',
                value: event.jobId
            }];
            this.educationalModuleJobService.query({
                page: 0,
                size: 20000,
                criteria,
                sort: ["id","asc"]
            }).subscribe((resp: HttpResponse<IEducationalModuleJobMarineSuffix[]>) => this.showEducationalModules(resp.body),
                (error) => this.onError("موردی یافت نشد"));
        }
    }
    showEducationalModules(resp: IEducationalModuleJobMarineSuffix[]){
        if(resp.length){
            let ids: number[] = [];
            resp.forEach(a => {
                ids.push(a.educationalModuleId);
            });
            this.approvedEducationalmodules = this.educationalmodules.filter(a => ids.includes(a.id));

            if(this.requestNiazsanjiFardi.approvedEducationalModuleId)
            {
                let approve = this.approvedEducationalmodules.find(a => a.id == this.requestNiazsanjiFardi.approvedEducationalModuleId);
                if(approve){
                    this.onApprovedChange(approve);
                }
            }
            if(this.requestNiazsanjiFardi.allEducationalModuleId)
            {
                let all = this.educationalmodules.find(a => a.id == this.requestNiazsanjiFardi.allEducationalModuleId);
                if(all){
                    this.onAllChange(all);
                }
            }
        }
        else{
            this.approvedEducationalmodules = [];
            this.approvedEducationalmodules.push(new EducationalModuleMarineSuffix(0,0,"","پودمانی برای این شغل مصوب نشده است."));
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

    previousState() {
        window.history.back();
    }
    currentUserFullName: string = "";
    currentRequestStatus: RequestStatus;
    save() {

        this.isSaving = true;
        this.message = "";

        if (this.requestNiazsanjiFardi.allEducationalModuleId == undefined && this.requestNiazsanjiFardi.approvedEducationalModuleId == undefined) {
            this.message = "حداقل یکی از دو پودمان باید انتخاب شود.";
            this.isSaving = false;
            return;
        }
        if (this.requestNiazsanjiFardi.allEducationalModuleId == this.requestNiazsanjiFardi.approvedEducationalModuleId) {
            this.message = "پودمان های انتخابی هر دو یک پودمان هستند لطفا یکی از آنها را انتخاب نمائید.";
            this.isSaving = false;
            return;
        }

        if (this.requestNiazsanjiFardi.organizationChartId == undefined) {
            this.message = "لطفا قسمت پیشنهاد دهنده را انتخاب نمائید.";
            this.isSaving = false;
            return;
        }
        if (this.requestNiazsanjiFardi.personId == undefined) {
            this.message = "لطفا فرد مورد نظر را انتخاب نمائید.";
            this.isSaving = false;
            return;
        }



        if(this.requestNiazsanjiFardi.allEducationalModuleId == undefined)
            this.requestNiazsanjiFardi.costAllEducationalModule = 0;
        else {
            if(isNaN(this.requestNiazsanjiFardi.costAllEducationalModule))
            {
                this.message = "لطفا در باکس هزینه کلیه پودمان فقط عدد وارد نمائید.";
                this.isSaving = false;
                return;
            }
        }
        if(this.requestNiazsanjiFardi.approvedEducationalModuleId == undefined)
            this.requestNiazsanjiFardi.costApprovedEducationalModule = 0;
        else {
            if(isNaN(this.requestNiazsanjiFardi.costApprovedEducationalModule))
            {
                this.message = "لطفا در باکس هزینه پودمان مصوب فقط عدد وارد نمائید.";
                this.isSaving = false;
                return;
            }
        }

        this.currentUserFullName = document.getElementById("currenUserFullNameTopBar").innerText;

        if (this.requestNiazsanjiFardi.id !== undefined) {
            this.subscribeToSaveResponse(this.requestNiazsanjiFardiService.update(this.requestNiazsanjiFardi));
        } else {
            if (this.isKarbar)
                this.requestNiazsanjiFardi.status = 5;
            else
                this.requestNiazsanjiFardi.status = 10;
            /*if (this.isOther) {
                this.requestNiazsanjiFardi.status = 6;
            }*/

            this.requestNiazsanjiFardi.requestStatus = RequestStatus.NEW;
            this.requestNiazsanjiFardi.changeStatusUserLogin = this.currentAccount.login;
            this.requestNiazsanjiFardi.conversation = " درخواست توسط " + this.currentUserFullName + " در تاریخ: " + this.convertObjectDatesService.miladi2Shamsi(new Date()) + " ثبت شد. "
            if (this.requestNiazsanjiFardi.description) {
                this.requestNiazsanjiFardi.conversation += "\n";
                this.requestNiazsanjiFardi.conversation += this.currentUserFullName + ": " + this.requestNiazsanjiFardi.description;
            }
            this.subscribeToSaveResponse(this.requestNiazsanjiFardiService.create(this.requestNiazsanjiFardi));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IRequestNiazsanjiFardiMarineSuffix>>) {
        result.subscribe(
            (res: HttpResponse<IRequestNiazsanjiFardiMarineSuffix>) => this.onSaveSuccess(res.body),
            (res: HttpErrorResponse) => this.onSaveError()
        );
    }

    protected onSaveSuccess(res: IRequestNiazsanjiFardiMarineSuffix) {
        if(this.isOther && (!this.isModirSannat)){
            this.requestNiazsanjiFardi.status = 20;
            this.requestNiazsanjiFardi.conversation += " تایید درخواست توسط " + this.currentUserFullName + " در تاریخ: " + this.convertObjectDatesService.miladi2Shamsi(new Date()) + " انجام شد. ";
            this.requestNiazsanjiFardiService.finalize(res).subscribe(
                (res: HttpResponse<IFinalOrganizationNiazsanjiMarineSuffix>) => res,
                (res: HttpErrorResponse) => res
            );
        }
        this.isSaving = false;
        this.previousState();
    }

    protected onSaveError() {
        this.isSaving = false;
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    trackEducationalModuleById(index: number, item: IEducationalModuleMarineSuffix) {
        return item.id;
    }

    trackPersonById(index: number, item: IPersonMarineSuffix) {
        return item.id;
    }

    trackOrganizationChartById(index: number, item: IOrganizationChartMarineSuffix) {
        return item.id;
    }

    getSelected(selectedVals: Array<any>, option: any) {
        if (selectedVals) {
            for (let i = 0; i < selectedVals.length; i++) {
                if (option.id === selectedVals[i].id) {
                    return selectedVals[i];
                }
            }
        }
        return option;
    }
}
