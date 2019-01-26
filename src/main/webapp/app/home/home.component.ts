import {Component, OnDestroy, OnInit} from '@angular/core';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import {JhiEventManager, JhiDateUtils, JhiLanguageService, JhiAlertService} from 'ng-jhipster';

import { LoginModalService, Principal, Account } from 'app/core';
import {Chart} from "angular-highcharts";
import {HomeCalendarModel} from 'app/home/home-calendar.model';
import {SlideInOutAnimation} from 'app/shared/animations';

import * as moment from 'jalali-moment';
import {AnnouncementMarineSuffixService} from "app/entities/announcement-marine-suffix";
import {HttpErrorResponse, HttpHeaders, HttpResponse} from "@angular/common/http";
import {IAnnouncementMarineSuffix} from "app/shared/model/announcement-marine-suffix.model";
import {ConvertObjectDatesService} from "app/plugin/utilities/convert-object-dates";
import {ActivatedRoute, NavigationStart, Router} from "@angular/router";
import {Subscription} from "rxjs";
import * as $ from 'jquery';
import {IPersonMarineSuffix} from "app/shared/model/person-marine-suffix.model";
import {PersonMarineSuffixService} from "app/entities/person-marine-suffix";


@Component({
    selector: 'mi-home',
    templateUrl: './home.component.html',
    styleUrls: [
        'home.scss'
    ],
    animations: [SlideInOutAnimation]
})
export class HomeComponent implements OnInit, OnDestroy {
    account: Account;
    modalRef: NgbModalRef;
   /* welcomeState = 'out';
    centerLinksState = 'out';
    state = 'leave';*/
    isfa: boolean;
    calendars : HomeCalendarModel[] = [];
    announcements: IAnnouncementMarineSuffix[];
    show: boolean = true;
    niazsanjishow: boolean = false;
    eventSubscriber: Subscription;
    pageName: string;
    isUserAndAdmin: boolean;
    badError: string;
    constructor(
        private principal: Principal,
        private personService: PersonMarineSuffixService,
        private loginModalService: LoginModalService,
        private eventManager: JhiEventManager,
        private languageManager: JhiLanguageService,
        private jhiAlertService: JhiAlertService,
        private announcementService: AnnouncementMarineSuffixService,
        private convertObjectDatesService : ConvertObjectDatesService,
        private activatedRoute: ActivatedRoute,
        private router: Router
    ) {
        this.isfa = languageManager.currentLang == 'fa';


        this.eventSubscriber = router.events.subscribe((val : NavigationStart) => {
                let res = this.getParameterByName("pageName", val.url); //window.location.href;
                if (res)
                    this.pageName = res;
                else
                    this.pageName = 'home';
        });
    }
    deleteElement(i)
    {

        $('#' + i).remove();
    }
    toggleColappse(i)
    {

        $('#' + i).collapse('toggle');
    }
    getParameterByName(name, url) {
        if (!url) url = window.location.href;
        name = name.replace(/[\[\]]/g, '\\$&');
        let regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
            results = regex.exec(url);
        if (!results) return null;
        if (!results[2]) return '';
        return decodeURIComponent(results[2].replace(/\+/g, ' '));
    }
    changePage(pageName){

        var url = window.location.href;
        var indexOf = url.indexOf('?');
        if (indexOf > -1) {
            var extra = url.slice(indexOf, url.length);
            url = url.replace(extra, '');
        }
        url += '?';
        url = url + "pageName=" + pageName;
        window.location.href = url;
    }
    ngOnInit() {

        this.principal.identity().then((account) => {

            this.account = account;
           
            if(!this.isAuthenticated()){
                this.login();
            }
            if(this.account.authorities.find(a => a == "ROLE_ADMIN") !== undefined)
                this.isUserAndAdmin = true;

            if(!this.account.personId){
                this.badError = "برای کاربری شما فردی تخصیص داده نشده لطفا با مدیریت سامانه تماس بگیرید و مراتب را اطلاع دهید.";
            }
            else{
                this.personService.find(this.account.personId).subscribe((resp: HttpResponse<IPersonMarineSuffix>) => {
                    if(!resp.body.organizationChartId){
                        this.badError = "موقعیت در چارت سازمانی برای شما تنظیم نشده است، لطفا مراتب را با مدیریت سامانه در میان بگذارید.";
                    }
                })
            }
        });
        this.registerAuthenticationSuccess();
        let criteria = [
            {key: 'isActive.equals', value: true}
        ];
        this.announcementService
            .query({
                page: 0,
                size: 5,
                criteria,
                sort: ['id','desc']
            })
            .subscribe(
                (res: HttpResponse<IAnnouncementMarineSuffix[]>) => this.loadNews(res.body),
                (res: HttpErrorResponse) => this.onError(res.message)
            );

        /*this.welcomeState = this.welcomeState === 'out' ? 'in' : 'out';
        this.centerLinksState = this.centerLinksState === 'out' ? 'in' : 'out';*/


        /*let now : any = new Date();
        let colors : string[] = ["#C8C8C8","#A0A0A0","#787878","#282828","#787878","#A0A0A0","#C8C8C8"]
        let offset : any[] = [this.addDays(now,-3),this.addDays(now,-2),this.addDays(now,-1),now,this.addDays(now,+1),this.addDays(now,+2),this.addDays(now,+3)];
        //this.calendars = [offset.length];
        offset.forEach((w,index) => {
            let calendar : HomeCalendarModel = new HomeCalendarModel();
            if(this.isfa) {
                calendar.date = moment(w).locale('fa').format('YYYY/MM/DD');
                calendar.title = moment(w).locale('fa').format('dddd');
            }
            else {
                calendar.date = moment(w).locale('en').format('YYYY/MM/DD');
                calendar.title = moment(w).locale('en').format('dddd');
            }
            calendar.color = colors[index];
            this.calendars.push(calendar);
        });*/
    }
    private loadNews(data: IAnnouncementMarineSuffix[]) {
        this.announcements = this.convertObjectDatesService.changeArrayDate(data);
    }
    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
    addDays(date, days) {
        var result = new Date(date);
        result.setDate(result.getDate() + days);
        return result;
    }

    back2Main(){
        this.niazsanjishow = false;

        setTimeout(() => {         //replaced function() by ()=>
            this.show = true;
        }, 500);
    }
    registerAuthenticationSuccess() {
        this.eventManager.subscribe('authenticationSuccess', (message) => {
            this.principal.identity().then((account) => {
                this.account = account;
            });
        });
    }

    isAuthenticated() {
        return this.principal.isAuthenticated();
    }

    login() {
        this.modalRef = this.loginModalService.open();
    }
    chart = new Chart({
        chart: {
            type: 'line'
        },
        title: {
            text: 'Linechart'
        },
        credits: {
            enabled: false
        },
        series: [{
            name: 'Line 1',
            data: [1, 2, 3]
        }]
    });

    // add point to chart serie
    add() {
        this.chart.addPoint(Math.floor(Math.random() * 10));
    }

    ngOnDestroy(): void {
        this.eventManager.destroy(this.eventSubscriber);
    }
}
