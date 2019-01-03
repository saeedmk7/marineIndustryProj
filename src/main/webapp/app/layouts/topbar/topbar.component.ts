import {AfterViewInit, Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {JhiAlertService, JhiLanguageService} from 'ng-jhipster';

import {VERSION} from 'app/app.constants';
import {JhiLanguageHelper, Principal, LoginModalService, LoginService, UserService, IUser, User} from 'app/core';
import {ProfileService} from '../profiles/profile.service';
import {RequestOrganizationNiazsanjiMarineSuffixService} from "app/entities/request-organization-niazsanji-marine-suffix";
import {HttpErrorResponse, HttpResponse} from "@angular/common/http";

import {PersonMarineSuffixService} from "app/entities/person-marine-suffix";
import {PersonMarineSuffix} from "app/shared/model/person-marine-suffix.model";
import {IBeautySpeechMarineSuffix} from "app/shared/model/beauty-speech-marine-suffix.model";
import {BeautySpeechMarineSuffixService} from "app/entities/beauty-speech-marine-suffix";
import {TypedOptions} from 'typed.js';
import Typed from 'typed.js/src/typed.js';
import {RequestStatus} from "app/shared/model/enums/RequestStatus";
import * as $ from 'jquery';
import {UsersRequestMarineSuffixService} from "app/entities/users-request-marine-suffix";
import {RequestEducationalModuleMarineSuffixService} from "app/entities/request-educational-module-marine-suffix";

@Component({
    selector: 'mi-topbar',
    templateUrl: './topbar.component.html',
    styleUrls: ['topbar.scss']
})
export class TopbarComponent implements OnInit, AfterViewInit {
    inProduction: boolean;
    isNavbarCollapsed: boolean;
    languages: any[];
    swaggerEnabled: boolean;
    modalRef: NgbModalRef;
    version: string;
    counter: number;
    usersRequestCounter: number;
    EducationalModuleRequestCounter: number;
    imgUrl: string = "";
    currentUserFullName: string;
    jobTitle: string;
    user: User;
    person: PersonMarineSuffix;
    speeches: string[];
    isAdmin: boolean;

    constructor(
        private userService: UserService,
        private personMarineSuffixService: PersonMarineSuffixService,
        private loginService: LoginService,
        private languageService: JhiLanguageService,
        private languageHelper: JhiLanguageHelper,
        private principal: Principal,
        private loginModalService: LoginModalService,
        private profileService: ProfileService,
        private router: Router,
        private requestOrganizationNiazsanjiMarineSuffixService: RequestOrganizationNiazsanjiMarineSuffixService,
        private jhiAlertService: JhiAlertService,
        private beautySpeechService: BeautySpeechMarineSuffixService,
        private usersRequestMarineSuffixService: UsersRequestMarineSuffixService,
        private requestEducationalModuleMarineSuffixService: RequestEducationalModuleMarineSuffixService

    ) {
        this.version = VERSION ? 'v' + VERSION : '';
        this.isNavbarCollapsed = true;


        setInterval(()=>{
            let criteria = [
                {key: 'isActive.equals', value: true}
            ];
            this.beautySpeechService
                .query({
                    page: 0,
                    size: 1000,
                    criteria
                })
                .subscribe(
                    (res: HttpResponse<IBeautySpeechMarineSuffix[]>) => this.showBeautySpeechResult(res.body),
                    (res: HttpErrorResponse) => this.onError(res.message)
                );
        },3600000);

    }

    ngOnInit() {
        this.languageHelper.getAll().then(languages => {
            this.languages = languages;
        });

        let criteria = [
            {key: 'isActive.equals', value: true}
        ];
        this.beautySpeechService
            .query({
                page: 0,
                size: 1000,
                criteria
            })
            .subscribe(
                (res: HttpResponse<IBeautySpeechMarineSuffix[]>) => this.showBeautySpeechResult(res.body),
                (res: HttpErrorResponse) => this.onError(res.message)
            );
        this.profileService.getProfileInfo().then(profileInfo => {
            this.inProduction = profileInfo.inProduction;
            this.swaggerEnabled = profileInfo.swaggerEnabled;
        });
        this.principal.identity().then(account => {

            if(account) {
                if(account.authorities.find(a => a == "ROLE_ADMIN") !== undefined)
                    this.isAdmin = true;
                if (account.imageUrl) {
                    this.imgUrl = account.imageUrl;
                }
                else {
                    this.imgUrl = "../../../content/images/home/man.png";
                }
                if (account.login) {
                    this.userService.find(account.login).subscribe(
                        (res: HttpResponse<User>) => this.onSuccess(res.body),
                        (res: HttpResponse<any>) => this.onError(res.body)
                    );
                }
                else {
                    window.location.reload();
                }
            }
            else{
                this.imgUrl = "../../../content/images/home/man.png";
            }
            if(this.isAdmin) {
                setInterval(() => {         //replaced function() by ()=>
                    this.getNewRequestOrganization();
                    this.getNewUsersRequest();
                    this.getNewEducationalModuleRequest();
                }, 10000);
            }
            /*this.currentAccount = account;
            this.loadAll();
            this.registerChangeInUsers();*/
        });

    }
    onSuccess(body) {
        this.user = body;
        if (this.user.personId) {
            this.personMarineSuffixService.find(this.user.personId).subscribe(
                (res: HttpResponse<PersonMarineSuffix>) => this.onPersonSuccess(res.body),
                (res: HttpResponse<any>) => this.onPersonError(res.body)
            )
        }
        else {
            this.currentUserFullName = this.user.login;
        }
    }

    onPersonSuccess(body) {
        this.person = body;
        if (this.person) {
            this.currentUserFullName = this.person.name + " " + this.person.family;
            this.jobTitle = this.person.jobTitle
        }
        else {
            this.currentUserFullName = this.user.login;
        }
    }

    onPersonError(body) {
        this.jhiAlertService.error(body);
    }

    ngAfterViewInit() {

    }

    showBeautySpeechResult(result: IBeautySpeechMarineSuffix[]) {
        this.speeches = result.map(a => a.description);

        const options: TypedOptions = {
            strings: this.speeches,
            typeSpeed: 100,
            backSpeed: 100,
            loop: true,
            loopCount: Infinity,
            showCursor: false,
            backDelay: 10000
        }
        let typed = new Typed("#typing", options);
        typed.start();
    }
    currentType: number = 0;
    changeTyping(){

        $("#typing").remove();
        $("#typingDiv").append("<div id=\"typing\"></div>");
        this.currentType += 1;
        let options: TypedOptions = {
            strings: this.speeches,
            loop: true,
            loopCount: Infinity,
            typeSpeed: 100,
            showCursor: false,
            backDelay: 10000
        };
        switch (this.currentType) {
            case 0:
                options.backSpeed= 100;
                break;
            case 1:
                options.fadeOut = true;
                options.fadeOutDelay = true;
                break;
            case 2:
                this.currentType = -1;
                break;
        }
        let typed = new Typed("#typing", options);
        typed.start();
    }


    getNewRequestOrganization() {
        if (this.isAuthenticated()) {
            let criteria = [
                {key: 'requestStatus.equals', value: RequestStatus.NEW}
            ];
            this.requestOrganizationNiazsanjiMarineSuffixService.count({
                page: 0,
                size: 10000000,
                criteria,
                sort: null
            }).subscribe(
                (res: HttpResponse<any>) => {
                    //localStorage.setItem('requestOrganizationNiazsanjiCount', res.body);
                    this.counter = res.body;
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
        }
    }

    onError(str) {
        debugger;
        this.jhiAlertService.error(str);
    }

    changeLanguage(languageKey: string) {
        this.languageService.changeLanguage(languageKey);
    }

    collapseNavbar() {
        this.isNavbarCollapsed = true;
    }

    isAuthenticated() {
        return this.principal.isAuthenticated();
    }

    login() {
        this.modalRef = this.loginModalService.open();
    }

    logout() {
        this.loginService.logout();
        this.router.navigate(['']).then(() => {

            setTimeout(() => {
                this.login();
            }, 1000)

        });
    }

    toggleNavbar() {
        this.isNavbarCollapsed = !this.isNavbarCollapsed;
    }

    getImageUrl() {
        return this.isAuthenticated() ? this.principal.getImageUrl() : null;
    }

    private getNewUsersRequest() {
        if (this.isAuthenticated()) {
            let criteria = [
                {key: 'requestStatus.equals', value: RequestStatus.NEW}
            ];
            this.usersRequestMarineSuffixService.count({
                page: 0,
                size: 10000000,
                criteria,
                sort: null
            }).subscribe(
                (res: HttpResponse<any>) => {
                    //localStorage.setItem('usersRequestCount', res.body);
                    this.usersRequestCounter = res.body;
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
        }
    }
    private getNewEducationalModuleRequest() {
        if (this.isAuthenticated()) {
            let criteria = [
                {key: 'requestStatus.equals', value: RequestStatus.NEW}
            ];
            this.requestEducationalModuleMarineSuffixService.count({
                page: 0,
                size: 10000000,
                criteria,
                sort: null
            }).subscribe(
                (res: HttpResponse<any>) => {
                    //localStorage.setItem('usersRequestCount', res.body);
                    this.EducationalModuleRequestCounter = res.body;
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
        }
    }
}
