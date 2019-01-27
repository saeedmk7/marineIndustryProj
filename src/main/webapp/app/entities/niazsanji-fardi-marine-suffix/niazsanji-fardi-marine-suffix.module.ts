import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MarineindustryprojSharedModule } from 'app/shared';
import {
    NiazsanjiFardiMarineSuffixComponent,
    NiazsanjiFardiMarineSuffixDetailComponent,
    NiazsanjiFardiMarineSuffixUpdateComponent,
    NiazsanjiFardiMarineSuffixDeletePopupComponent,
    NiazsanjiFardiMarineSuffixDeleteDialogComponent,
    niazsanjiFardiRoute,
    niazsanjiFardiPopupRoute
} from './';

const ENTITY_STATES = [...niazsanjiFardiRoute, ...niazsanjiFardiPopupRoute];

@NgModule({
    imports: [MarineindustryprojSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        NiazsanjiFardiMarineSuffixComponent,
        NiazsanjiFardiMarineSuffixDetailComponent,
        NiazsanjiFardiMarineSuffixUpdateComponent,
        NiazsanjiFardiMarineSuffixDeleteDialogComponent,
        NiazsanjiFardiMarineSuffixDeletePopupComponent
    ],
    entryComponents: [
        NiazsanjiFardiMarineSuffixComponent,
        NiazsanjiFardiMarineSuffixUpdateComponent,
        NiazsanjiFardiMarineSuffixDeleteDialogComponent,
        NiazsanjiFardiMarineSuffixDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class MarineindustryprojNiazsanjiFardiMarineSuffixModule {}
