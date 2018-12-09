import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import {UploadFileModule} from "./upload-file/upload-file.module";
import {ConvertObjectDatesService} from "./utilities/convert-object-dates";
import {UtilitiesModule} from "app/plugin/utilities/utilities.module";

@NgModule({
    imports: [
       UploadFileModule,
       UtilitiesModule,

    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class MarineindustryprojPluginModule {}
