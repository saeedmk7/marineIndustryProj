import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { JhiAlertService, JhiDataUtils } from 'ng-jhipster';

import { INiazsanjiFardiMarineSuffix } from 'app/shared/model/niazsanji-fardi-marine-suffix.model';
import { NiazsanjiFardiMarineSuffixService } from './niazsanji-fardi-marine-suffix.service';
import { IDocumentMarineSuffix } from 'app/shared/model/document-marine-suffix.model';
import { DocumentMarineSuffixService } from 'app/entities/document-marine-suffix';
import { IRequestNiazsanjiFardiMarineSuffix } from 'app/shared/model/request-niazsanji-fardi-marine-suffix.model';
import { RequestNiazsanjiFardiMarineSuffixService } from 'app/entities/request-niazsanji-fardi-marine-suffix';
import { IEducationalModuleMarineSuffix } from 'app/shared/model/educational-module-marine-suffix.model';
import { EducationalModuleMarineSuffixService } from 'app/entities/educational-module-marine-suffix';
import { IPersonMarineSuffix } from 'app/shared/model/person-marine-suffix.model';
import { PersonMarineSuffixService } from 'app/entities/person-marine-suffix';
import { IOrganizationChartMarineSuffix } from 'app/shared/model/organization-chart-marine-suffix.model';
import { OrganizationChartMarineSuffixService } from 'app/entities/organization-chart-marine-suffix';

@Component({
    selector: 'mi-niazsanji-fardi-marine-suffix-update',
    templateUrl: './niazsanji-fardi-marine-suffix-update.component.html'
})
export class NiazsanjiFardiMarineSuffixUpdateComponent implements OnInit {
    niazsanjiFardi: INiazsanjiFardiMarineSuffix;
    isSaving: boolean;

    documents: IDocumentMarineSuffix[];

    requestniazsanjifardis: IRequestNiazsanjiFardiMarineSuffix[];

    educationalmodules: IEducationalModuleMarineSuffix[];

    people: IPersonMarineSuffix[];

    organizationcharts: IOrganizationChartMarineSuffix[];
    createDate: string;
    modifyDate: string;
    archivedDate: string;

    constructor(
        protected dataUtils: JhiDataUtils,
        protected jhiAlertService: JhiAlertService,
        protected niazsanjiFardiService: NiazsanjiFardiMarineSuffixService,
        protected documentService: DocumentMarineSuffixService,
        protected requestNiazsanjiFardiService: RequestNiazsanjiFardiMarineSuffixService,
        protected educationalModuleService: EducationalModuleMarineSuffixService,
        protected personService: PersonMarineSuffixService,
        protected organizationChartService: OrganizationChartMarineSuffixService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ niazsanjiFardi }) => {
            this.niazsanjiFardi = niazsanjiFardi;
            this.createDate = this.niazsanjiFardi.createDate != null ? this.niazsanjiFardi.createDate.format(DATE_TIME_FORMAT) : null;
            this.modifyDate = this.niazsanjiFardi.modifyDate != null ? this.niazsanjiFardi.modifyDate.format(DATE_TIME_FORMAT) : null;
            this.archivedDate = this.niazsanjiFardi.archivedDate != null ? this.niazsanjiFardi.archivedDate.format(DATE_TIME_FORMAT) : null;
        });
        this.documentService.query().subscribe(
            (res: HttpResponse<IDocumentMarineSuffix[]>) => {
                this.documents = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.requestNiazsanjiFardiService.query().subscribe(
            (res: HttpResponse<IRequestNiazsanjiFardiMarineSuffix[]>) => {
                this.requestniazsanjifardis = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.educationalModuleService.query().subscribe(
            (res: HttpResponse<IEducationalModuleMarineSuffix[]>) => {
                this.educationalmodules = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.personService.query().subscribe(
            (res: HttpResponse<IPersonMarineSuffix[]>) => {
                this.people = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.organizationChartService.query().subscribe(
            (res: HttpResponse<IOrganizationChartMarineSuffix[]>) => {
                this.organizationcharts = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    byteSize(field) {
        return this.dataUtils.byteSize(field);
    }

    openFile(contentType, field) {
        return this.dataUtils.openFile(contentType, field);
    }

    setFileData(event, entity, field, isImage) {
        this.dataUtils.setFileData(event, entity, field, isImage);
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        this.niazsanjiFardi.createDate = this.createDate != null ? moment(this.createDate, DATE_TIME_FORMAT) : null;
        this.niazsanjiFardi.modifyDate = this.modifyDate != null ? moment(this.modifyDate, DATE_TIME_FORMAT) : null;
        this.niazsanjiFardi.archivedDate = this.archivedDate != null ? moment(this.archivedDate, DATE_TIME_FORMAT) : null;
        if (this.niazsanjiFardi.id !== undefined) {
            this.subscribeToSaveResponse(this.niazsanjiFardiService.update(this.niazsanjiFardi));
        } else {
            this.subscribeToSaveResponse(this.niazsanjiFardiService.create(this.niazsanjiFardi));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<INiazsanjiFardiMarineSuffix>>) {
        result.subscribe(
            (res: HttpResponse<INiazsanjiFardiMarineSuffix>) => this.onSaveSuccess(),
            (res: HttpErrorResponse) => this.onSaveError()
        );
    }

    protected onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    protected onSaveError() {
        this.isSaving = false;
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    trackDocumentById(index: number, item: IDocumentMarineSuffix) {
        return item.id;
    }

    trackRequestNiazsanjiFardiById(index: number, item: IRequestNiazsanjiFardiMarineSuffix) {
        return item.id;
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
