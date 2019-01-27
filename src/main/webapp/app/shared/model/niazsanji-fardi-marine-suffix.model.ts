import { Moment } from 'moment';
import { IDocumentMarineSuffix } from 'app/shared/model//document-marine-suffix.model';
import {EducationalModuleType} from "app/shared/model/enums/EducationalModuleType";

export interface INiazsanjiFardiMarineSuffix {
    id?: number;
    code?: string;
    educationalModuleType?: EducationalModuleType;
    priceCost?: number;
    description?: any;
    createUserLogin?: string;
    createDate?: Moment;
    modifyUserLogin?: string;
    modifyDate?: Moment;
    archived?: boolean;
    archivedUserLogin?: string;
    archivedDate?: Moment;
    documents?: IDocumentMarineSuffix[];
    requestNiazsanjiFardiCode?: string;
    requestNiazsanjiFardiId?: number;
    educationalModuleTitle?: string;
    educationalModuleId?: number;
    personFamily?: string;
    personId?: number;
    organizationChartTitle?: string;
    organizationChartId?: number;
}

export class NiazsanjiFardiMarineSuffix implements INiazsanjiFardiMarineSuffix {
    constructor(
        public id?: number,
        public code?: string,
        public educationalModuleType?: EducationalModuleType,
        public priceCost?: number,
        public description?: any,
        public createUserLogin?: string,
        public createDate?: Moment,
        public modifyUserLogin?: string,
        public modifyDate?: Moment,
        public archived?: boolean,
        public archivedUserLogin?: string,
        public archivedDate?: Moment,
        public documents?: IDocumentMarineSuffix[],
        public requestNiazsanjiFardiCode?: string,
        public requestNiazsanjiFardiId?: number,
        public educationalModuleTitle?: string,
        public educationalModuleId?: number,
        public personFamily?: string,
        public personId?: number,
        public organizationChartTitle?: string,
        public organizationChartId?: number
    ) {
        this.archived = this.archived || false;
    }
}
