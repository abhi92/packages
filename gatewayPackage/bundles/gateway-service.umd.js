(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('rxjs'), require('@angular/core'), require('@angular/router'), require('@angular/common/http'), require('rxjs/operators')) :
    typeof define === 'function' && define.amd ? define('gateway-service', ['exports', 'rxjs', '@angular/core', '@angular/router', '@angular/common/http', 'rxjs/operators'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global['gateway-service'] = {}, global.rxjs, global.ng.core, global.ng.router, global.ng.common.http, global.rxjs.operators));
}(this, (function (exports, rxjs, i0, i1, i2, operators) { 'use strict';

    /**
     * Created by kuldeep on 10/4/17.
     */
    // const API_KEY = makeStateKey('api');
    var DataService = /** @class */ (function () {
        function DataService(injector, _router, _http) {
            this.injector = injector;
            this._router = _router;
            this._http = _http;
            this.dataServiceCart = new rxjs.Subject();
        }
        DataService.prototype.callRestful = function (type, url, options) {
            var _this = this;
            var params;
            var body;
            if (options != undefined && options['params'] != undefined)
                params = options['params'];
            if (options != undefined && options['body'] != undefined)
                body = options['body'];
            var headers = {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE',
                'access-control-allow-origin': '*'
            };
            if (options && options.headerData && Object.keys(options.headerData).length) {
                for (var headerKey in options.headerData) {
                    headers[headerKey] = options.headerData[headerKey];
                }
                if (options.headerData['Content-Type']) {
                    headers['Content-Type'] = options.headerData['Content-Type'];
                }
                if (options.headerData['Access-Control-Allow-Methods']) {
                    headers['Access-Control-Allow-Methods'] = options.headerData['Access-Control-Allow-Methods'];
                }
            }
            var start_time = new Date().getTime();
            switch (type) {
                case 'GET':
                    var getOptions = {};
                    if (headers["Content-Type"] && headers["Content-Type"].indexOf("text") > -1) {
                        getOptions = { params: params, headers: headers, responseType: "text", withCredentials: true };
                    }
                    else {
                        getOptions = { params: params, headers: headers, withCredentials: true };
                    }
                    return this._http.get(url, getOptions).pipe(operators.map(function (res) {
                        var request_time = new Date().getTime() - start_time;
                        return res;
                    }), operators.catchError(function (err) { return _this.handleError(err); }));
                case 'POST':
                    return this._http.post(url, body, { headers: headers, withCredentials: true }).pipe(operators.map(function (res) {
                        var request_time = new Date().getTime() - start_time;
                        return res;
                    }), operators.catchError(function (err) { return _this.handleError(err); }));
                case 'PUT':
                    return this._http.put(url, body, { headers: headers, withCredentials: true }).pipe(operators.map(function (res) { return res; }), operators.catchError(function (err) { return _this.handleError(err); }));
                case 'DELETE':
                    return this._http.delete(url, { headers: headers, withCredentials: true }).pipe(operators.map(function (res) { return res; }), operators.catchError(function (err) { return _this.handleError(err); }));
                default:
                    return null;
            }
        };
        DataService.prototype.handleError = function (error) {
            return rxjs.throwError(error);
            ;
        };
        DataService.prototype.showMessage = function (cssClass, msg) {
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
        };
        DataService.prototype.getCookie = function (name) {
            //TODO test split and value
            var ca = document.cookie.split('; ');
            var caLen = ca.length;
            var cookieName = name + "=";
            var c;
            for (var i = 0; i < caLen; i += 1) {
                c = ca[i].replace(/^\s\+/g, "");
                if (c.indexOf(cookieName) == 0) {
                    return c.substring(cookieName.length, c.length);
                }
            }
            return "";
        };
        DataService.prototype.deleteCookie = function (name) {
            this.setCookie(name, "", -1);
        };
        DataService.prototype.setCookie = function (name, value, expireDays) {
            var d = new Date();
            d.setTime(d.getTime() + expireDays * 24 * 60 * 60 * 1000);
            var expires = "expires=" + d.toUTCString();
            document.cookie = name + "=" + value + "; " + expires + ";";
        };
        DataService.prototype.timestampToData = function (ts) {
            var d = new Date(ts);
            var dd = d.getDate();
            var mm = (d.getMonth() + 1);
            var yy = d.getFullYear();
            if (dd < 10) {
                dd = '0' + dd;
            }
            if (mm < 10) {
                mm = '0' + mm;
            }
            return dd + '-' + mm + '-' + yy;
        };
        DataService.prototype.getTimeFromTimestamp = function (ts, isNoTime) {
        };
        return DataService;
    }());
    DataService.ɵprov = i0.ɵɵdefineInjectable({ factory: function DataService_Factory() { return new DataService(i0.ɵɵinject(i0.INJECTOR), i0.ɵɵinject(i1.Router), i0.ɵɵinject(i2.HttpClient)); }, token: DataService, providedIn: "root" });
    DataService.decorators = [
        { type: i0.Injectable, args: [{
                    providedIn: 'root'
                },] }
    ];
    DataService.ctorParameters = function () { return [
        { type: i0.Injector },
        { type: i1.Router },
        { type: i2.HttpClient }
    ]; };

    var DataServiceComponent = /** @class */ (function () {
        function DataServiceComponent() {
        }
        DataServiceComponent.prototype.ngOnInit = function () {
        };
        return DataServiceComponent;
    }());
    DataServiceComponent.decorators = [
        { type: i0.Component, args: [{
                    selector: 'lib-dataService',
                    template: "\n    <p>\n      data-service works!\n    </p>\n  "
                },] }
    ];
    DataServiceComponent.ctorParameters = function () { return []; };

    var DataServiceModule = /** @class */ (function () {
        function DataServiceModule() {
        }
        return DataServiceModule;
    }());
    DataServiceModule.decorators = [
        { type: i0.NgModule, args: [{
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

    exports.DataService = DataService;
    exports.DataServiceComponent = DataServiceComponent;
    exports.DataServiceModule = DataServiceModule;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=gateway-service.umd.js.map
