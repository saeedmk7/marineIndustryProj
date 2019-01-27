import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpErrorResponse, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {JhiAlertService} from 'ng-jhipster';

import {
    IRequestOrganizationNiazsanjiMarineSuffix
} from 'app/shared/model/request-organization-niazsanji-marine-suffix.model';
import {RequestOrganizationNiazsanjiMarineSuffixService} from './request-organization-niazsanji-marine-suffix.service';
import {IPersonMarineSuffix} from 'app/shared/model/person-marine-suffix.model';
import {PersonMarineSuffixService} from 'app/entities/person-marine-suffix';
import {IEducationalModuleMarineSuffix} from 'app/shared/model/educational-module-marine-suffix.model';
import {EducationalModuleMarineSuffixService} from 'app/entities/educational-module-marine-suffix';
import {ITeachApproachMarineSuffix} from 'app/shared/model/teach-approach-marine-suffix.model';
import {TeachApproachMarineSuffixService} from 'app/entities/teach-approach-marine-suffix';
import {Principal} from "app/core";
import {RequestStatus} from "app/shared/model/enums/RequestStatus";
import {ITeacherMarineSuffix} from "app/shared/model/teacher-marine-suffix.model";
import {TeacherMarineSuffixService} from "app/entities/teacher-marine-suffix/teacher-marine-suffix.service";
import {IJobMarineSuffix} from "app/shared/model/job-marine-suffix.model";
import {JobMarineSuffixService} from "app/entities/job-marine-suffix";
import {IOrganizationChartMarineSuffix} from "app/shared/model/organization-chart-marine-suffix.model";
import {OrganizationChartMarineSuffixService} from "app/entities/organization-chart-marine-suffix";

@Component({
    selector: 'mi-request-organization-niazsanji-marine-suffix-update',
    templateUrl: './request-organization-niazsanji-marine-suffix-update.component.html'
})
export class RequestOrganizationNiazsanjiMarineSuffixUpdateComponent implements OnInit {
    private _requestOrganizationNiazsanji: IRequestOrganizationNiazsanjiMarineSuffix;
    isSaving: boolean;

    people: IPersonMarineSuffix[];
    fullPeople: IPersonMarineSuffix[];
    jobs: IJobMarineSuffix[];
    fullJobs: IJobMarineSuffix[];
    selectedJob: IJobMarineSuffix;
    firstThreeJobCode: string;
    educationalmodules: IEducationalModuleMarineSuffix[];
    organizationCharts: IOrganizationChartMarineSuffix[];

    teachapproaches: ITeachApproachMarineSuffix[];

    teachers: ITeacherMarineSuffix[];
    selectionType: boolean = false;
    disable: boolean = false;
    answer: string;
    currentAccount: any;
    isAdmin: boolean = false;
    buttonClass: string = "btn btn-danger";
    constructor(
        private jhiAlertService: JhiAlertService,
        private requestOrganizationNiazsanjiService: RequestOrganizationNiazsanjiMarineSuffixService,
        private organizationChartService: OrganizationChartMarineSuffixService,
        private personService: PersonMarineSuffixService,
        private jobService: JobMarineSuffixService,
        private educationalModuleService: EducationalModuleMarineSuffixService,
        private teachApproachService: TeachApproachMarineSuffixService,
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private principal : Principal,
        private teacherService: TeacherMarineSuffixService
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.principal.identity().then(account => {

            this.currentAccount = account;
            if(account.authorities.find(a => a == "ROLE_ADMIN") !== undefined)
                this.isAdmin = true;
            this.currentUserFullName = document.getElementById("currenUserFullNameTopBar").innerText;
        });
        this.activatedRoute.data.subscribe(({ requestOrganizationNiazsanji }) => {
            this.requestOrganizationNiazsanji = requestOrganizationNiazsanji;
            if(this.requestOrganizationNiazsanji.people)
                this.requestOrganizationNiazsanji.people.forEach(a => a.fullName = a.name + " " + a.family);
        });
        this.personService.query().subscribe(
            (res: HttpResponse<IPersonMarineSuffix[]>) => {
                this.people = res.body;
                this.fullPeople = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.jobService.query().subscribe(
            (res: HttpResponse<IJobMarineSuffix[]>) => {
                this.jobs = res.body;
                this.fullJobs = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.teacherService.query().subscribe(
            (res: HttpResponse<ITeacherMarineSuffix[]>) => {
                this.teachers = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.educationalModuleService.query().subscribe(
            (res: HttpResponse<IEducationalModuleMarineSuffix[]>) => {
                this.educationalmodules = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.teachApproachService.query().subscribe(
            (res: HttpResponse<ITeachApproachMarineSuffix[]>) => {
                this.teachapproaches = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.organizationChartService.query().subscribe(

            (res: HttpResponse<IOrganizationChartMarineSuffix[]>) => {

                this.organizationCharts = res.body;
                /*var listOfObjects = [];
                res.body.map(function (item) {
                    var singleObj = {};
                    singleObj['id'] = item.id;
                    singleObj['name'] = item.title;
                    singleObj['parentId'] = item.parentId;
                    listOfObjects.push(singleObj);
                });
                let item = this.list_to_tree(listOfObjects);*/
                this.organizationCharts.forEach(a => {
                    /*let fathers = this.appendParent(a);*/
                    a.fullTitle = this.appendParent(a);
                    /*let array = fathers.split('>');
                    if(array.length){
                        for (let i = 0; i < array.length - 1; i++) {
                            array[i] = '--------';
                            if(i == array.length - 2)
                            {
                                array[i] += "|";
                            }
                        }
                        a.fullTitle = array.join("");
                    }
                    else {
                        a.fullTitle = fathers;
                    }*/


                    let hasChild = this.organizationCharts.find(w => w.parentId == a.id);
                    if(hasChild)
                        a["disabled"] = true;
                    else
                        a["disabled"] = false;
                });


                /*for (let i = 0; i < item.length; i++) {
                    this.items.push(new TreeviewItem(item[i]));
                }*/

            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    appendParent(org: IOrganizationChartMarineSuffix): string{

        let fullTitle = org.title;
        if(org.parentId){
            let father = this.organizationCharts.find(a => a.id == org.parentId);
            return this.appendParent(father) + " > " + fullTitle;
        }
        return fullTitle;
    }
    /*appendParent(org: IOrganizationChartMarineSuffix): string{

        let fullTitle = org.title;
        if(org.parentId){
            let father = this.organizationCharts.find(a => a.id == org.parentId);
            return this.appendParent(father) + " < " + fullTitle;
        }
        return fullTitle;
    }*/
    list_to_tree(list) {


        var map = {}, node, roots = [], i;
        for (i = 0; i < list.length; i += 1) {
            map[list[i].id] = i; // initialize the map
            list[i].children = []; // initialize the children
        }
        for (i = 0; i < list.length; i += 1) {
            node = list[i];
            node.parentId = node.parentId == null ? 0 : node.parentId;
            if (node.parentId !== 0) {
                // if you have dangling branches check that map[node.parentId] exists
                list[map[node.parentId]].children.push(node);
            } else {
                roots.push(node);
            }
        }
        return roots;
    }
    showRelatedJobs(input){
        this.disable = true;
        let jobCode = input.firstThreeJobCode;
        if(jobCode.length === 3) {
            this.jobs = this.fullJobs.filter(entity => entity.jobCode.startsWith(jobCode));
            this.disable = false;
        }
    }
    onChange(event){
        this.people = this.fullPeople.filter(a => a.jobId == event.id);
    }
    previousState() {
        window.history.back();
    }

    change(i){
        this.router.navigateByUrl(i);
    }
    currentUserFullName: string = "";
    currentRequestStatus: RequestStatus;
    save() {
        this.isSaving = true;
        this.requestOrganizationNiazsanji.status = 0;

        if(this.requestOrganizationNiazsanji.organizationChartId)
        {
            this.requestOrganizationNiazsanji.recommendedByOrgchart = this.organizationCharts.find(a => a.id == this.requestOrganizationNiazsanji.organizationChartId).fullTitle;
        }
        if(!this.currentUserFullName)
            this.currentUserFullName = document.getElementById("currenUserFullNameTopBar").innerText;

        if (this.requestOrganizationNiazsanji.id !== undefined) {
            if(this.requestOrganizationNiazsanji.requestStatus != this.currentRequestStatus)
                this.requestOrganizationNiazsanji.changeStatusUserLogin = this.currentAccount.login;

            if(this.requestOrganizationNiazsanji.conversation)
                this.requestOrganizationNiazsanji.conversation += "\r\n";
            else
                this.requestOrganizationNiazsanji.conversation = " ";

            if(this.answer)
                this.requestOrganizationNiazsanji.conversation += this.currentUserFullName + ": " + this.answer;

            /*this.requestOrganizationNiazsanji.conversation += "\r\n" + this.currentUserFullName + ": " + this.answer;*/
            this.subscribeToSaveResponse(this.requestOrganizationNiazsanjiService.update(this.requestOrganizationNiazsanji));

        } else {
            this.requestOrganizationNiazsanji.requestStatus = RequestStatus.NEW;
            this.requestOrganizationNiazsanji.changeStatusUserLogin = this.currentAccount.login;
            if(this.requestOrganizationNiazsanji.description)
                this.requestOrganizationNiazsanji.conversation = this.currentUserFullName + ": " + this.requestOrganizationNiazsanji.description;
            this.subscribeToSaveResponse(this.requestOrganizationNiazsanjiService.create(this.requestOrganizationNiazsanji));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IRequestOrganizationNiazsanjiMarineSuffix>>) {
        result.subscribe(
            (res: HttpResponse<IRequestOrganizationNiazsanjiMarineSuffix>) => this.onSaveSuccess(),
            (res: HttpErrorResponse) => this.onSaveError()
        );
    }

    private onSaveSuccess() {

        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {

        this.isSaving = false;
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    trackPersonById(index: number, item: IPersonMarineSuffix) {
        return item.id;
    }

    trackEducationalModuleById(index: number, item: IEducationalModuleMarineSuffix) {
        return item.id;
    }

    trackTeachApproachById(index: number, item: ITeachApproachMarineSuffix) {
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
    get requestOrganizationNiazsanji() {
        return this._requestOrganizationNiazsanji;
    }

    set requestOrganizationNiazsanji(requestOrganizationNiazsanji: IRequestOrganizationNiazsanjiMarineSuffix) {
        this._requestOrganizationNiazsanji = requestOrganizationNiazsanji;
    }
}
