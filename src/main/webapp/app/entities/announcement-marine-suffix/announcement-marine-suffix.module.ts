import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MarineindustryprojSharedModule } from 'app/shared';
import {
    AnnouncementMarineSuffixComponent,
    AnnouncementMarineSuffixDetailComponent,
    AnnouncementMarineSuffixUpdateComponent,
    AnnouncementMarineSuffixDeletePopupComponent,
    AnnouncementMarineSuffixDeleteDialogComponent,
    announcementRoute,
    announcementPopupRoute
} from './';
/*import {CKEditorModule} from "@ckeditor/ckeditor5-angular";*/


const ENTITY_STATES = [...announcementRoute, ...announcementPopupRoute];


@NgModule({
    imports: [MarineindustryprojSharedModule, /*CKEditorModule,*/ RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        AnnouncementMarineSuffixComponent,
        AnnouncementMarineSuffixDetailComponent,
        AnnouncementMarineSuffixUpdateComponent,
        AnnouncementMarineSuffixDeleteDialogComponent,
        AnnouncementMarineSuffixDeletePopupComponent
    ],
    entryComponents: [
        AnnouncementMarineSuffixComponent,
        AnnouncementMarineSuffixUpdateComponent,
        AnnouncementMarineSuffixDeleteDialogComponent,
        AnnouncementMarineSuffixDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class MarineindustryprojAnnouncementMarineSuffixModule {}
