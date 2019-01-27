import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiParseLinks, JhiAlertService } from 'ng-jhipster';

import { IEducationalModuleJobMarineSuffix } from 'app/shared/model/educational-module-job-marine-suffix.model';
import { Principal } from 'app/core';

import { ITEMS_PER_PAGE } from 'app/shared';
import { EducationalModuleJobMarineSuffixService } from './educational-module-job-marine-suffix.service';
import {DataResult, GroupDescriptor, process} from "@progress/kendo-data-query";
import {PlatformLocation} from "@angular/common";

@Component({
    selector: 'mi-educational-module-job-marine-suffix',
    templateUrl: './educational-module-job-marine-suffix.component.html'
})
export class EducationalModuleJobMarineSuffixComponent implements OnInit, OnDestroy {
    currentAccount: any;
    educationalModuleJobs: IEducationalModuleJobMarineSuffix[];
    educationalModuleJobsTemp: IEducationalModuleJobMarineSuffix[];
    error: any;
    success: any;
    eventSubscriber: Subscription;
    routeData: any;
    links: any;
    totalItems: any;
    queryCount: any;
    itemsPerPage: any;
    page: any;
    predicate: any;
    previousPage: any;
    reverse: any;

    searchJobTitle: string;
    searchEducationalModuleTitle: string;
    searchFirst3JobCode: string;

    dirty: boolean;

    public groups: GroupDescriptor[] = [{ field: 'first3JobCode' }];

    public gridView: DataResult;

    constructor(
        private educationalModuleJobService: EducationalModuleJobMarineSuffixService,
        private parseLinks: JhiParseLinks,
        private jhiAlertService: JhiAlertService,
        private principal: Principal,
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private location: PlatformLocation,
        private eventManager: JhiEventManager
    ) {
        this.itemsPerPage = ITEMS_PER_PAGE;
        this.routeData = this.activatedRoute.data.subscribe(data => {
            this.page = data.pagingParams.page;
            this.previousPage = data.pagingParams.page;
            this.reverse = data.pagingParams.ascending;
            this.predicate = data.pagingParams.predicate;
        });
        /*this.location.onPopState(() => {

            if (!this.dirty) {
                this.ngOnInit();
            }
        });*/
    }
    preSearch() {
        

        var url = window.location.href;
        var indexOf = url.indexOf('?');
        if (indexOf > -1) {
            var extra = url.slice(indexOf, url.length);
            url = url.replace(extra, '');
        }
        url += '?';
        if (this.searchJobTitle != null && this.searchJobTitle.length > 0) {
            url = url + "searchJobTitle=" + this.searchJobTitle.trim() + "&";
        }
        if (this.searchEducationalModuleTitle != null && this.searchEducationalModuleTitle.length > 0) {
            url = url + "searchEducationalModuleTitle=" + this.searchEducationalModuleTitle.trim() + "&";
        }
        if (this.searchFirst3JobCode != null && this.searchFirst3JobCode.length > 0) {
            url = url + "searchFirst3JobCode=" + this.searchFirst3JobCode.trim();
        }
        this.dirty = true;
        window.location.href = url;
        this.search();
        this.dirty = false;
    }

    search() {
        
        this.educationalModuleJobs = this.educationalModuleJobsTemp;
        if(this.searchFirst3JobCode)
           this.educationalModuleJobs = this.educationalModuleJobs.filter(a => a.first3JobCode == this.searchFirst3JobCode);
        if(this.searchEducationalModuleTitle)
            this.educationalModuleJobs =  this.educationalModuleJobs.filter(a => a.educationalModuleTitle.includes(this.searchEducationalModuleTitle));
        if(this.searchJobTitle)
            this.educationalModuleJobs = this.educationalModuleJobs.filter(a => a.jobTitle.includes(this.searchJobTitle));

        this.loadEducationalModuleJobs();
    }
    loadAll() {
        this.educationalModuleJobService
            .query()
            .subscribe(
                (res: HttpResponse<IEducationalModuleJobMarineSuffix[]>) => this.paginateEducationalModuleJobs(res.body, res.headers),
                (res: HttpErrorResponse) => this.onError(res.message)
            );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInEducationalModuleJobs();

        /*var url = window.location.href;
        var indexOf = url.indexOf('?');
        if (indexOf > -1) {
            this.searchJobTitle = "";
            this.searchEducationalModuleTitle = "";
            this.searchFirst3JobCode = "";
            var extra = url.slice(indexOf + 1, url.length);
            if (extra.endsWith('&')) {
                extra = extra.slice(0, (extra.length - 1));
            }
            var fields = extra.split('&');
            fields.forEach(w => {

                var result = w.split('=');
                var fieldName = result[0];
                var fieldValue = decodeURIComponent(result[1]);
                switch (fieldName) {
                    case 'searchJobTitle':
                        this.searchJobTitle = fieldValue;
                        break;
                    case  'searchEducationalModuleTitle':
                        this.searchEducationalModuleTitle = fieldValue;
                        break;
                    case 'searchFirst3JobCode':
                        this.searchFirst3JobCode = fieldValue;
                        break;
                }
            });
        }
        this.preSearch();*/
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IEducationalModuleJobMarineSuffix) {
        return item.id;
    }

    registerChangeInEducationalModuleJobs() {
        this.eventSubscriber = this.eventManager.subscribe('educationalModuleJobListModification', response => this.loadAll());
    }

    sort() {
        const result = [this.predicate + ',' + (this.reverse ? 'asc' : 'desc')];
        if (this.predicate !== 'id') {
            result.push('id');
        }
        return result;
    }

    private paginateEducationalModuleJobs(data: IEducationalModuleJobMarineSuffix[], headers: HttpHeaders) {
        /*this.links = this.parseLinks.parse(headers.get('link'));
        this.totalItems = parseInt(headers.get('X-Total-Count'), 10);
        this.queryCount = this.totalItems;*/
        
        this.educationalModuleJobs = data;
        this.educationalModuleJobsTemp = data;
        this.loadEducationalModuleJobs();
        //this.jobIds = this.educationalModuleJobs.map(a => a.jobId);
    }
    public groupChange(groups: GroupDescriptor[]): void {
        this.groups = groups;
        this.loadEducationalModuleJobs();
    }
    private loadEducationalModuleJobs(): void {

        this.gridView = process(this.educationalModuleJobs, { group: this.groups });
    }
    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
