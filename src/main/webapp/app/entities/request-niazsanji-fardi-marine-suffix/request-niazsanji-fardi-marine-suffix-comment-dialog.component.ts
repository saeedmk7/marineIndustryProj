import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, ActivatedRouteSnapshot, Router} from '@angular/router';

import {NgbActiveModal, NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {JhiAlertService, JhiEventManager} from 'ng-jhipster';

import {IRequestNiazsanjiFardiMarineSuffix} from 'app/shared/model/request-niazsanji-fardi-marine-suffix.model';
import {RequestNiazsanjiFardiMarineSuffixService} from './request-niazsanji-fardi-marine-suffix.service';
import {HttpErrorResponse, HttpResponse} from "@angular/common/http";
import {IPersonMarineSuffix} from "app/shared/model/person-marine-suffix.model";
import {IUser, Principal, UserService} from "app/core";
import {PersonMarineSuffixService} from "app/entities/person-marine-suffix";
import {TreeUtilities} from "app/plugin/utilities/tree-utilities";
import {IOrganizationChartMarineSuffix} from "app/shared/model/organization-chart-marine-suffix.model";
import {OrganizationChartMarineSuffixService} from "app/entities/organization-chart-marine-suffix";
import {ConvertObjectDatesService} from "app/plugin/utilities/convert-object-dates";
import {RequestStatus} from "app/shared/model/enums/RequestStatus";
import {IFinalOrganizationNiazsanjiMarineSuffix} from "app/shared/model/final-organization-niazsanji-marine-suffix.model";

@Component({
    selector: 'mi-request-niazsanji-fardi-marine-suffix-comment-dialog',
    templateUrl: './request-niazsanji-fardi-marine-suffix-comment-dialog.component.html'
})
export class RequestNiazsanjiFardiMarineSuffixCommentDialogComponent implements OnInit {
    requestNiazsanjiFardi: IRequestNiazsanjiFardiMarineSuffix;
    commentType: string;
    organizationcharts: IOrganizationChartMarineSuffix[];
    targetPeople: IPersonMarineSuffix[];

    comment: string;

    currentAccount: any;
    isAdmin: boolean = false;
    isKarbar: boolean = false;
    isModirGhesmat: boolean = false;
    isOther: boolean = false;
    message: string;
    commentRequired: boolean = false;
    constructor(
        protected requestNiazsanjiFardiService: RequestNiazsanjiFardiMarineSuffixService,
        public activeModal: NgbActiveModal,
        protected eventManager: JhiEventManager,
        private activatedRoute: ActivatedRoute,
        private principal: Principal,
        private personService: PersonMarineSuffixService,
        private treeUtilities: TreeUtilities,
        private organizationChartService: OrganizationChartMarineSuffixService,
        private jhiAlertService: JhiAlertService,
        private userService: UserService,
        private convertObjectDatesService: ConvertObjectDatesService
    ) {

    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.requestNiazsanjiFardiService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'requestNiazsanjiFardiListModification',
                content: 'Commented an requestNiazsanjiFardi'
            });
            this.activeModal.dismiss(true);
        });
    }
    isSaving: boolean = false;
    save(){

        this.isSaving = true;
        this.message = "";
        let currentUserFullName = document.getElementById("currenUserFullNameTopBar").innerText;
        this.requestNiazsanjiFardi.conversation += "\n ------------------------------------- \n";
        switch (this.commentType) {
            case 'COMMENT':
                if(!this.comment)
                {
                    this.message = "لطفا نظر خود را در کادر بالا وارد نمائید.";
                    this.isSaving = false;
                    return;
                }
                this.requestNiazsanjiFardi.conversation += " ثبت نظر توسط " + currentUserFullName + " در تاریخ: " + this.convertObjectDatesService.miladi2Shamsi(new Date()) + " ثبت شد. ";
                this.requestNiazsanjiFardi.conversation += "\n";
                this.requestNiazsanjiFardi.conversation += currentUserFullName + ": " + this.comment;
                break;
            case 'REJECT':
                if(!this.comment)
                {
                    this.message = "لطفا علت عدم تایید را در کادر بالا وارد نمائید.";
                    this.isSaving = false;
                    return;
                }
                this.requestNiazsanjiFardi.conversation += " رد درخواست توسط " + currentUserFullName + " در تاریخ: " + this.convertObjectDatesService.miladi2Shamsi(new Date()) + " انجام شد. ";
                this.requestNiazsanjiFardi.conversation += "\n";
                this.requestNiazsanjiFardi.conversation += currentUserFullName + ": " + this.comment;

                this.requestNiazsanjiFardi.requestStatus = RequestStatus.IGNORE;
                this.requestNiazsanjiFardi.changeStatusUserLogin = this.currentAccount.login;
                break;
            case 'ACCEPT':
                this.requestNiazsanjiFardi.conversation += " تایید درخواست توسط " + currentUserFullName + " در تاریخ: " + this.convertObjectDatesService.miladi2Shamsi(new Date()) + " انجام شد. ";
                if(this.comment) {
                    this.requestNiazsanjiFardi.conversation += "\n";
                    this.requestNiazsanjiFardi.conversation += currentUserFullName + ": " + this.comment;
                }
                if(this.isModirGhesmat)
                    this.requestNiazsanjiFardi.status = 6;
                if(this.isOther){
                    this.requestNiazsanjiFardiService.finalize(this.requestNiazsanjiFardi).subscribe(
                        (res: HttpResponse<IFinalOrganizationNiazsanjiMarineSuffix>) => this.onSaveSuccess(),
                        (res: HttpErrorResponse) => this.onSaveError(res)
                    );
                    return ;
                }
                break;
        }
        this.requestNiazsanjiFardiService.update(this.requestNiazsanjiFardi).subscribe(
            (res: HttpResponse<IFinalOrganizationNiazsanjiMarineSuffix>) => this.onSaveSuccess(),
            (res: HttpErrorResponse) => this.onSaveError(res)
        );
    }
    protected onSaveSuccess() {
        this.isSaving = false;
        this.activeModal.dismiss(true);
    }

    protected onSaveError(res) {
        this.message = res.message;
        this.isSaving = false;
    }
    ngOnInit(): void {
        switch (this.commentType) {
            case 'ACCEPT':
                this.commentRequired = false;
                break;
            case 'REJECT':
                this.commentRequired = true;
                break;
            default:
                this.commentRequired = true;
                this.commentType = 'COMMENT';
                break;
        }
        this.organizationChartService.query().subscribe(
            (res: HttpResponse<IOrganizationChartMarineSuffix[]>) => {
                this.organizationcharts = res.body;
                this.setPermission();
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );


    }
    setPermission(){
        this.principal.identity().then(account => {

            this.currentAccount = account;
            if(account.authorities.find(a => a == "ROLE_ADMIN") !== undefined)
                this.isAdmin = true;

            if(account.authorities.find(a => a == "ROLE_KARBAR") !== undefined)
                this.isKarbar = true;

            if(account.authorities.find(a => a == "ROLE_MODIR_GHESMAT") !== undefined)
                this.isModirGhesmat = true;

            if(account.authorities.find(a => a == "ROLE_MODIR_GHESMAT") == undefined && account.authorities.find(a => a == "ROLE_KARBAR") == undefined)
                this.isOther = true;
            //this.currentUserFullName = document.getElementById("currenUserFullNameTopBar").innerText;

            if((this.isModirGhesmat || this.isOther) && this.commentType == 'ACCEPT')
            {
                this.personService.find(this.currentAccount.personId).subscribe((resp: HttpResponse<IPersonMarineSuffix>) => {

                    this.findTargetPeople(resp.body);

                }, (res: HttpErrorResponse) => this.onError(res.message));
            }

        });
    }
    findTargetPeople(person: IPersonMarineSuffix){

        let neededOrgIds : number[];

        if(this.isKarbar)
            neededOrgIds = this.treeUtilities.getParentIds(this.organizationcharts ,person.organizationChartId);
        if(this.isModirGhesmat)
            neededOrgIds = this.treeUtilities.getAllOfThisTreeIds(this.organizationcharts, person.organizationChartId);


        let criteria = [{
            key:'organizationChartId.in',
            value: neededOrgIds
        }];
        this.personService.query({
            page: 0,
            size: 20000,
            criteria,
            sort: ["id","asc"]
        }).subscribe((resp: HttpResponse<IPersonMarineSuffix[]>) => {

                let orgPeople = resp.body;
                let orgPeopleIds = resp.body.map(a => a.id);

                this.userService.query({
                    page: 0,
                    size: 20000,
                    sort: ["id","asc"]
                }).subscribe((resp: HttpResponse<IUser[]>) =>{


                    let targetUsers = resp.body.filter(a => orgPeopleIds.includes(a.personId));
                    if(targetUsers) {
                        if (this.isKarbar) {
                            targetUsers = targetUsers.filter(a => a.authorities.includes('ROLE_MODIR_GHESMAT'));
                            if (targetUsers) {
                                let personIds = targetUsers.map(a => a.personId);
                                this.targetPeople = orgPeople.filter(a => personIds.includes(a.id));
                            }
                        }
                        if (this.isModirGhesmat) {
                            targetUsers = targetUsers.filter(a => a.authorities.includes('ROLE_MODIR_AMOZESH'));
                            if (targetUsers) {
                                let personIds = targetUsers.map(a => a.personId);
                                this.targetPeople = orgPeople.filter(a => personIds.includes(a.id));
                            }
                        }
                    }
                });
            },
            (error) => this.onError("فردی یافت نشد."));

    }
    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}

@Component({
    selector: 'mi-request-niazsanji-fardi-marine-suffix-comment-popup',
    template: ''
})
export class RequestNiazsanjiFardiMarineSuffixCommentPopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ requestNiazsanjiFardi }) => {
            this.activatedRoute.params.subscribe((params) => {

                let commentType = params['CommentType'] ? params['CommentType'] : "";
                switch (commentType) {
                    case 'ACCEPT':
                        break;
                    case 'REJECT':
                        break;
                    default:
                        commentType = 'COMMENT';
                        break;
                }
                setTimeout(() => {

                    this.ngbModalRef = this.modalService.open(RequestNiazsanjiFardiMarineSuffixCommentDialogComponent as Component, {
                        size: 'lg',
                        backdrop: 'static'
                    });
                    this.ngbModalRef.componentInstance.requestNiazsanjiFardi = requestNiazsanjiFardi;
                    this.ngbModalRef.componentInstance.commentType = commentType;
                        this.ngbModalRef.result.then(
                            result => {
                                this.router.navigate([{ outlets: { popup: null } }], { replaceUrl: true, queryParamsHandling: 'merge' });
                                this.ngbModalRef = null;
                            },
                            reason => {
                                this.router.navigate([{ outlets: { popup: null } }], { replaceUrl: true, queryParamsHandling: 'merge' });
                                this.ngbModalRef = null;
                            }
                        );
                }, 0);
            });

        });
    }

    ngOnDestroy() {
        this.ngbModalRef = null;
    }
}
