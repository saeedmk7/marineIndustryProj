import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpErrorResponse, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {JhiAlertService} from 'ng-jhipster';

import {
    IFinalOrganizationNiazsanjiMarineSuffix
} from 'app/shared/model/final-organization-niazsanji-marine-suffix.model';
import {FinalOrganizationNiazsanjiMarineSuffixService} from './final-organization-niazsanji-marine-suffix.service';
import {IPersonMarineSuffix} from 'app/shared/model/person-marine-suffix.model';
import {PersonMarineSuffixService} from 'app/entities/person-marine-suffix';
import {ITeacherMarineSuffix} from 'app/shared/model/teacher-marine-suffix.model';
import {TeacherMarineSuffixService} from 'app/entities/teacher-marine-suffix';
import {IEducationalModuleMarineSuffix} from 'app/shared/model/educational-module-marine-suffix.model';
import {EducationalModuleMarineSuffixService} from 'app/entities/educational-module-marine-suffix';
import {ITeachApproachMarineSuffix} from 'app/shared/model/teach-approach-marine-suffix.model';
import {TeachApproachMarineSuffixService} from 'app/entities/teach-approach-marine-suffix';
import {IRequestOrganizationNiazsanjiMarineSuffix} from 'app/shared/model/request-organization-niazsanji-marine-suffix.model';
import {RequestOrganizationNiazsanjiMarineSuffixService} from 'app/entities/request-organization-niazsanji-marine-suffix';
import {RequestStatus} from "app/shared/model/enums/RequestStatus";

@Component({
    selector: 'mi-final-organization-niazsanji-marine-suffix-update',
    templateUrl: './final-organization-niazsanji-marine-suffix-update.component.html'
})
export class FinalOrganizationNiazsanjiMarineSuffixUpdateComponent implements OnInit {
    private _finalOrganizationNiazsanji: IFinalOrganizationNiazsanjiMarineSuffix;
    isSaving: boolean;

    people: IPersonMarineSuffix[];

    teachers: ITeacherMarineSuffix[];

    educationalmodules: IEducationalModuleMarineSuffix[];

    teachapproaches: ITeachApproachMarineSuffix[];

    requestorganizationniazsanjis: IRequestOrganizationNiazsanjiMarineSuffix[];

    constructor(
        private jhiAlertService: JhiAlertService,
        private finalOrganizationNiazsanjiService: FinalOrganizationNiazsanjiMarineSuffixService,
        private personService: PersonMarineSuffixService,
        private teacherService: TeacherMarineSuffixService,
        private educationalModuleService: EducationalModuleMarineSuffixService,
        private teachApproachService: TeachApproachMarineSuffixService,
        private requestOrganizationNiazsanjiService: RequestOrganizationNiazsanjiMarineSuffixService,
        private activatedRoute: ActivatedRoute,
        private router: Router
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ finalOrganizationNiazsanji }) => {
            this.finalOrganizationNiazsanji = finalOrganizationNiazsanji;
            if(this.finalOrganizationNiazsanji.people)
                this.finalOrganizationNiazsanji.people.forEach(a => a.fullName = a.name + " " + a.family);
        });
        this.personService.query().subscribe(
            (res: HttpResponse<IPersonMarineSuffix[]>) => {
                this.people = res.body;
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
        this.requestOrganizationNiazsanjiService.query().subscribe(
            (res: HttpResponse<IRequestOrganizationNiazsanjiMarineSuffix[]>) => {
                this.requestorganizationniazsanjis = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    change(i){
        this.router.navigateByUrl(i);
    }

    previousState() {
        window.history.back();
    }

    save() {

        this.isSaving = true;
        this.finalOrganizationNiazsanji.status = 0;
        this.finalOrganizationNiazsanji.requestStatus = RequestStatus.NEW;

        if (this.finalOrganizationNiazsanji.id !== undefined) {
            this.subscribeToSaveResponse(this.finalOrganizationNiazsanjiService.update(this.finalOrganizationNiazsanji));
        } else {
            this.subscribeToSaveResponse(this.finalOrganizationNiazsanjiService.create(this.finalOrganizationNiazsanji));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IFinalOrganizationNiazsanjiMarineSuffix>>) {
        result.subscribe(
            (res: HttpResponse<IFinalOrganizationNiazsanjiMarineSuffix>) => this.onSaveSuccess(),
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

    trackTeacherById(index: number, item: ITeacherMarineSuffix) {
        return item.id;
    }

    trackEducationalModuleById(index: number, item: IEducationalModuleMarineSuffix) {
        return item.id;
    }

    trackTeachApproachById(index: number, item: ITeachApproachMarineSuffix) {
        return item.id;
    }

    trackRequestOrganizationNiazsanjiById(index: number, item: IRequestOrganizationNiazsanjiMarineSuffix) {
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
    get finalOrganizationNiazsanji() {
        return this._finalOrganizationNiazsanji;
    }

    set finalOrganizationNiazsanji(finalOrganizationNiazsanji: IFinalOrganizationNiazsanjiMarineSuffix) {
        this._finalOrganizationNiazsanji = finalOrganizationNiazsanji;
    }
}
