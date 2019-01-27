import { Moment } from 'moment';
import { IPersonMarineSuffix } from 'app/shared/model//person-marine-suffix.model';
import { IOrganizationChartMarineSuffix } from 'app/shared/model//organization-chart-marine-suffix.model';
import { IRequestOrganizationNiazsanjiMarineSuffix } from 'app/shared/model//request-organization-niazsanji-marine-suffix.model';
import { IFinalOrganizationNiazsanjiMarineSuffix } from 'app/shared/model//final-organization-niazsanji-marine-suffix.model';
import { IOrganizationChartAuthorityMarineSuffix } from 'app/shared/model//organization-chart-authority-marine-suffix.model';
import { INiazsanjiFardiMarineSuffix } from 'app/shared/model//niazsanji-fardi-marine-suffix.model';
import { IRequestNiazsanjiFardiMarineSuffix } from 'app/shared/model//request-niazsanji-fardi-marine-suffix.model';

export interface IOrganizationChartMarineSuffix {
    id?: number;
    title?: string;
    fullTitle?: string;
    code?: string;
    createUserLogin?: string;
    createDate?: Moment;
    modifyUserLogin?: string;
    modifyDate?: Moment;
    archived?: boolean;
    archivedUserLogin?: string;
    archivedDate?: Moment;
    status?: number;
    people?: IPersonMarineSuffix[];
    organizationCharts?: IOrganizationChartMarineSuffix[];
    requestOrganizationNiazsanjis?: IRequestOrganizationNiazsanjiMarineSuffix[];
    finalOrganizationNiazsanjis?: IFinalOrganizationNiazsanjiMarineSuffix[];
    organizationChartAuthorities?: IOrganizationChartAuthorityMarineSuffix[];
    niazsanjiFardis?: INiazsanjiFardiMarineSuffix[];
    requestNiazsanjiFardis?: IRequestNiazsanjiFardiMarineSuffix[];
    parentTitle?: string;
    parentId?: number;
}

export class OrganizationChartMarineSuffix implements IOrganizationChartMarineSuffix {
    constructor(
        public id?: number,
        public title?: string,
        public fullTitle?: string,
        public code?: string,
        public createUserLogin?: string,
        public createDate?: Moment,
        public modifyUserLogin?: string,
        public modifyDate?: Moment,
        public archived?: boolean,
        public archivedUserLogin?: string,
        public archivedDate?: Moment,
        public status?: number,
        public people?: IPersonMarineSuffix[],
        public organizationCharts?: IOrganizationChartMarineSuffix[],
        public requestOrganizationNiazsanjis?: IRequestOrganizationNiazsanjiMarineSuffix[],
        public finalOrganizationNiazsanjis?: IFinalOrganizationNiazsanjiMarineSuffix[],
        public organizationChartAuthorities?: IOrganizationChartAuthorityMarineSuffix[],
        public niazsanjiFardis?: INiazsanjiFardiMarineSuffix[],
        public requestNiazsanjiFardis?: IRequestNiazsanjiFardiMarineSuffix[],
        public parentTitle?: string,
        public parentId?: number
    ) {
        this.archived = this.archived || false;
    }
}
