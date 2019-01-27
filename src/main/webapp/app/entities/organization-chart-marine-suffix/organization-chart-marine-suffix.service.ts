import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IOrganizationChartMarineSuffix } from 'app/shared/model/organization-chart-marine-suffix.model';
import {append} from "@progress/kendo-angular-grid/dist/es2015/dragdrop/common";

type EntityResponseType = HttpResponse<IOrganizationChartMarineSuffix>;
type EntityArrayResponseType = HttpResponse<IOrganizationChartMarineSuffix[]>;

@Injectable({ providedIn: 'root' })
export class OrganizationChartMarineSuffixService {
    private resourceUrl = SERVER_API_URL + 'api/organization-charts';

    constructor(private http: HttpClient) {}

    create(organizationChart: IOrganizationChartMarineSuffix): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(organizationChart);
        return this.http
            .post<IOrganizationChartMarineSuffix>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(organizationChart: IOrganizationChartMarineSuffix): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(organizationChart);
        return this.http
            .put<IOrganizationChartMarineSuffix>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<IOrganizationChartMarineSuffix>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IOrganizationChartMarineSuffix[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    private convertDateFromClient(organizationChart: IOrganizationChartMarineSuffix): IOrganizationChartMarineSuffix {
        const copy: IOrganizationChartMarineSuffix = Object.assign({}, organizationChart, {
            createDate:
                organizationChart.createDate != null && organizationChart.createDate.isValid()
                    ? organizationChart.createDate.toJSON()
                    : null,
            modifyDate:
                organizationChart.modifyDate != null && organizationChart.modifyDate.isValid()
                    ? organizationChart.modifyDate.toJSON()
                    : null,
            archivedDate:
                organizationChart.archivedDate != null && organizationChart.archivedDate.isValid()
                    ? organizationChart.archivedDate.toJSON()
                    : null
        });
        return copy;
    }

    private convertDateFromServer(res: EntityResponseType): EntityResponseType {
        res.body.createDate = res.body.createDate != null ? moment(res.body.createDate) : null;
        res.body.modifyDate = res.body.modifyDate != null ? moment(res.body.modifyDate) : null;
        res.body.archivedDate = res.body.archivedDate != null ? moment(res.body.archivedDate) : null;
        return res;
    }
    appendParent(org: IOrganizationChartMarineSuffix): string{

        let fullTitle = org.title;
        if(org.parentId){
            let father = this.organizationcharts.find(a => a.id == org.parentId);
            return this.appendParent(father) + " > " + fullTitle;
        }
        return fullTitle;
    }
    organizationcharts: IOrganizationChartMarineSuffix[];
    private convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        this.organizationcharts = res.body;
        res.body.forEach((organizationChart: IOrganizationChartMarineSuffix) => {
            organizationChart.createDate = organizationChart.createDate != null ? moment(organizationChart.createDate) : null;
            organizationChart.modifyDate = organizationChart.modifyDate != null ? moment(organizationChart.modifyDate) : null;
            organizationChart.archivedDate = organizationChart.archivedDate != null ? moment(organizationChart.archivedDate) : null;
            organizationChart.fullTitle = this.appendParent(organizationChart);
        });
        return res;
    }
}
