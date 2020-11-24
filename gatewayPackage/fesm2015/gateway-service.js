import { Subject, throwError } from 'rxjs';
import { ɵɵdefineInjectable, ɵɵinject, INJECTOR, Injectable, Injector, Component, NgModule } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';

/**
 * Created by kuldeep on 10/4/17.
 */
// const API_KEY = makeStateKey('api');
class DataService {
    constructor(injector, _router, _http) {
        this.injector = injector;
        this._router = _router;
        this._http = _http;
        this.dataServiceCart = new Subject();
    }
    callRestful(type, url, options) {
        let params;
        let body;
        if (options != undefined && options['params'] != undefined)
            params = options['params'];
        if (options != undefined && options['body'] != undefined)
            body = options['body'];
        let headers = {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE',
            'access-control-allow-origin': '*'
        };
        if (options && options.headerData && Object.keys(options.headerData).length) {
            for (let headerKey in options.headerData) {
                headers[headerKey] = options.headerData[headerKey];
            }
            if (options.headerData['Content-Type']) {
                headers['Content-Type'] = options.headerData['Content-Type'];
            }
            if (options.headerData['Access-Control-Allow-Methods']) {
                headers['Access-Control-Allow-Methods'] = options.headerData['Access-Control-Allow-Methods'];
            }
        }
        let start_time = new Date().getTime();
        switch (type) {
            case 'GET':
                let getOptions = {};
                if (headers["Content-Type"] && headers["Content-Type"].indexOf("text") > -1) {
                    getOptions = { params: params, headers: headers, responseType: "text", withCredentials: true };
                }
                else {
                    getOptions = { params, headers, withCredentials: true };
                }
                return this._http.get(url, getOptions).pipe(map(res => {
                    let request_time = new Date().getTime() - start_time;
                    return res;
                }), catchError(err => this.handleError(err)));
            case 'POST':
                return this._http.post(url, body, { headers, withCredentials: true }).pipe(map(res => {
                    let request_time = new Date().getTime() - start_time;
                    return res;
                }), catchError(err => this.handleError(err)));
            case 'PUT':
                return this._http.put(url, body, { headers, withCredentials: true }).pipe(map(res => res), catchError(err => this.handleError(err)));
            case 'DELETE':
                return this._http.delete(url, { headers, withCredentials: true }).pipe(map(res => res), catchError(err => this.handleError(err)));
            default:
                return null;
        }
    }
    handleError(error) {
        return throwError(error);
        ;
    }
    showMessage(cssClass, msg) {
        //console.log("show message cssClass " + cssClass + " msg is " + msg);
        var x = document.getElementById("alert-box");
        var classType = "";
        x.innerHTML = msg;
        if (cssClass == "error")
            classType = "show-error";
        if (cssClass == "success")
            classType = "show-sucess";
        x.className = classType;
        setTimeout(function () {
            x.className = x.className.replace(classType, "");
        }, 5000);
    }
    getCookie(name) {
        //TODO test split and value
        let ca = document.cookie.split('; ');
        let caLen = ca.length;
        let cookieName = name + "=";
        let c;
        for (let i = 0; i < caLen; i += 1) {
            c = ca[i].replace(/^\s\+/g, "");
            if (c.indexOf(cookieName) == 0) {
                return c.substring(cookieName.length, c.length);
            }
        }
        return "";
    }
    deleteCookie(name) {
        this.setCookie(name, "", -1);
    }
    setCookie(name, value, expireDays) {
        let d = new Date();
        d.setTime(d.getTime() + expireDays * 24 * 60 * 60 * 1000);
        let expires = "expires=" + d.toUTCString();
        document.cookie = name + "=" + value + "; " + expires + ";";
    }
    timestampToData(ts) {
        let d = new Date(ts);
        let dd = d.getDate();
        let mm = (d.getMonth() + 1);
        let yy = d.getFullYear();
        if (dd < 10) {
            dd = '0' + dd;
        }
        if (mm < 10) {
            mm = '0' + mm;
        }
        return dd + '-' + mm + '-' + yy;
    }
    getTimeFromTimestamp(ts, isNoTime) {
    }
}
DataService.ɵprov = ɵɵdefineInjectable({ factory: function DataService_Factory() { return new DataService(ɵɵinject(INJECTOR), ɵɵinject(Router), ɵɵinject(HttpClient)); }, token: DataService, providedIn: "root" });
DataService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] }
];
DataService.ctorParameters = () => [
    { type: Injector },
    { type: Router },
    { type: HttpClient }
];

class DataServiceComponent {
    constructor() { }
    ngOnInit() {
    }
}
DataServiceComponent.decorators = [
    { type: Component, args: [{
                selector: 'lib-dataService',
                template: `
    <p>
      data-service works!
    </p>
  `
            },] }
];
DataServiceComponent.ctorParameters = () => [];

class DataServiceModule {
}
DataServiceModule.decorators = [
    { type: NgModule, args: [{
                declarations: [DataServiceComponent],
                imports: [],
                exports: [DataServiceComponent]
            },] }
];

/*
 * Public API Surface of data-service
 */

/**
 * Generated bundle index. Do not edit.
 */

export { DataService, DataServiceComponent, DataServiceModule };
//# sourceMappingURL=gateway-service.js.map
