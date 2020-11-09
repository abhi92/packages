/**
 * Created by kuldeep on 10/4/17.
 */
import { Observable, Subject } from 'rxjs';
import { Injector } from '@angular/core';
import { Router } from "@angular/router";
import { HttpClient } from '@angular/common/http';
export declare class DataService {
    injector: Injector;
    private _router;
    private _http;
    api: any;
    dataServiceCart: Subject<any>;
    constructor(injector: Injector, _router: Router, _http: HttpClient);
    callRestful(type: string, url: string, options?: {
        params?: {};
        body?: {};
        headerData?: {};
    }): Observable<Object>;
    private handleError;
    showMessage(cssClass: any, msg: any): void;
    getCookie(name: string): string;
    deleteCookie(name: any): void;
    setCookie(name: string, value: string, expireDays: number): void;
    timestampToData(ts: any): string;
    getTimeFromTimestamp(ts: any, isNoTime?: boolean): void;
}
