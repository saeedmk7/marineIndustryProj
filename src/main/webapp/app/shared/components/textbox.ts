import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {JhiAlertService, JhiTranslateComponent} from 'ng-jhipster';
import {TranslateService} from '@ngx-translate/core';

@Component({
    selector: 'textbox',
    template: `
        <input type="text" [class]="className" [placeholder]="placeholder" [dir]="dir" [value]="value" [name]="name" [id]="name" />
    `
})
export class Textbox implements OnInit, OnDestroy {
    @Input('className') className: string = 'form-control col-md-2';
    @Input('placeholder') placeholder: string = '';
    @Input('dir') dir: string = 'rtl';
    @Input('value') value: string = '';
    @Input('name') name: string = '';

    constructor() {
    }

    ngOnInit() {

    }


    ngOnDestroy() {
    }
}
