import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MarineindustryprojSharedModule } from 'app/shared';
import {
    FinalOrganizationNiazsanjiMarineSuffixComponent,
    FinalOrganizationNiazsanjiMarineSuffixDetailComponent,
    FinalOrganizationNiazsanjiMarineSuffixUpdateComponent,
    FinalOrganizationNiazsanjiMarineSuffixDeletePopupComponent,
    FinalOrganizationNiazsanjiMarineSuffixDeleteDialogComponent,
    finalOrganizationNiazsanjiRoute,
    finalOrganizationNiazsanjiPopupRoute
} from './';
import {ConvertObjectDatesService} from "app/plugin/utilities/convert-object-dates";
import {NgSelectModule} from "@ng-select/ng-select";
import {FormsModule} from "@angular/forms";

const ENTITY_STATES = [...finalOrganizationNiazsanjiRoute, ...finalOrganizationNiazsanjiPopupRoute];

@NgModule({
    imports: [MarineindustryprojSharedModule, NgSelectModule, FormsModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        FinalOrganizationNiazsanjiMarineSuffixComponent,
        FinalOrganizationNiazsanjiMarineSuffixDetailComponent,
        FinalOrganizationNiazsanjiMarineSuffixUpdateComponent,
        FinalOrganizationNiazsanjiMarineSuffixDeleteDialogComponent,
        FinalOrganizationNiazsanjiMarineSuffixDeletePopupComponent
    ],
    providers: [ ConvertObjectDatesService ],
    entryComponents: [
        FinalOrganizationNiazsanjiMarineSuffixComponent,
        FinalOrganizationNiazsanjiMarineSuffixUpdateComponent,
        FinalOrganizationNiazsanjiMarineSuffixDeleteDialogComponent,
        FinalOrganizationNiazsanjiMarineSuffixDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class MarineindustryprojFinalOrganizationNiazsanjiMarineSuffixModule {}
