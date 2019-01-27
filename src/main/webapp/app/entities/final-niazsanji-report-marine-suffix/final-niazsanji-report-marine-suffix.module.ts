import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MarineindustryprojSharedModule } from 'app/shared';
import {
    FinalNiazsanjiReportMarineSuffixComponent,
    FinalNiazsanjiReportMarineSuffixDetailComponent,
    FinalNiazsanjiReportMarineSuffixUpdateComponent,
    FinalNiazsanjiReportMarineSuffixDeletePopupComponent,
    FinalNiazsanjiReportMarineSuffixDeleteDialogComponent,
    finalNiazsanjiReportRoute,
    finalNiazsanjiReportPopupRoute
} from './';
import {ConvertObjectDatesService} from "app/plugin/utilities/convert-object-dates";

const ENTITY_STATES = [...finalNiazsanjiReportRoute, ...finalNiazsanjiReportPopupRoute];

@NgModule({
    imports: [MarineindustryprojSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        FinalNiazsanjiReportMarineSuffixComponent,
        FinalNiazsanjiReportMarineSuffixDetailComponent,
        FinalNiazsanjiReportMarineSuffixUpdateComponent,
        FinalNiazsanjiReportMarineSuffixDeleteDialogComponent,
        FinalNiazsanjiReportMarineSuffixDeletePopupComponent
    ],
    providers: [ ConvertObjectDatesService ],
    entryComponents: [
        FinalNiazsanjiReportMarineSuffixComponent,
        FinalNiazsanjiReportMarineSuffixUpdateComponent,
        FinalNiazsanjiReportMarineSuffixDeleteDialogComponent,
        FinalNiazsanjiReportMarineSuffixDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class MarineindustryprojFinalNiazsanjiReportMarineSuffixModule {}
