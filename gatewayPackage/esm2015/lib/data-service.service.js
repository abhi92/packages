/**
 * Created by kuldeep on 10/4/17.
 */
import { throwError as observableThrowError, Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { Injector } from '@angular/core';
import { Router } from "@angular/router";
import { HttpClient } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import * as i0 from "@angular/core";
import * as i1 from "@angular/router";
import * as i2 from "@angular/common/http";
// const API_KEY = makeStateKey('api');
export class DataService {
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
        return observableThrowError(error);
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
DataService.ɵprov = i0.ɵɵdefineInjectable({ factory: function DataService_Factory() { return new DataService(i0.ɵɵinject(i0.INJECTOR), i0.ɵɵinject(i1.Router), i0.ɵɵinject(i2.HttpClient)); }, token: DataService, providedIn: "root" });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YS1zZXJ2aWNlLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiL1VzZXJzL2FiaGlzaGVrc2luZ2gvZGF0YVNlcnZpY2VTcGFjZS9wcm9qZWN0cy9kYXRhLXNlcnZpY2Uvc3JjLyIsInNvdXJjZXMiOlsibGliL2RhdGEtc2VydmljZS5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOztHQUVHO0FBR0gsT0FBTyxFQUFFLFVBQVUsSUFBSSxvQkFBb0IsRUFBYyxPQUFPLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDL0UsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFBO0FBQ3hDLE9BQU8sRUFBRSxNQUFNLEVBQW1CLE1BQU0saUJBQWlCLENBQUM7QUFDMUQsT0FBTyxFQUFFLFVBQVUsRUFBcUIsTUFBTSxzQkFBc0IsQ0FBQztBQUNyRSxPQUFPLEVBQUUsVUFBVSxFQUFFLEdBQUcsRUFBd0MsTUFBTSxnQkFBZ0IsQ0FBQzs7OztBQUt2Rix1Q0FBdUM7QUFNdkMsTUFBTSxPQUFPLFdBQVc7SUFJcEIsWUFBbUIsUUFBa0IsRUFBVSxPQUFlLEVBQVUsS0FBaUI7UUFBdEUsYUFBUSxHQUFSLFFBQVEsQ0FBVTtRQUFVLFlBQU8sR0FBUCxPQUFPLENBQVE7UUFBVSxVQUFLLEdBQUwsS0FBSyxDQUFZO1FBRmxGLG9CQUFlLEdBQWlCLElBQUksT0FBTyxFQUFPLENBQUM7SUFJMUQsQ0FBQztJQUVELFdBQVcsQ0FBQyxJQUFZLEVBQUUsR0FBVyxFQUFFLE9BQXFEO1FBQ3hGLElBQUksTUFBTSxDQUFDO1FBQ1gsSUFBSSxJQUFJLENBQUM7UUFFVCxJQUFJLE9BQU8sSUFBSSxTQUFTLElBQUksT0FBTyxDQUFDLFFBQVEsQ0FBQyxJQUFJLFNBQVM7WUFDdEQsTUFBTSxHQUFHLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUMvQixJQUFJLE9BQU8sSUFBSSxTQUFTLElB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RUFBRSxDQUFDO1FBQ25ELFFBQVEsQ0FBQyxNQUFNLEdBQUcsSUFBSSxHQUFHLEdBQUcsR0FBRyxLQUFLLEdBQUcsSUFBSSxHQUFHLE9BQU8sR0FBRyxHQUFHLENBQUM7SUFDcEUsQ0FBQztJQUVNLGVBQWUsQ0FBQyxFQUFFO1FBQ3JCLElBQUksQ0FBQyxHQUFHLElBQUksSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQ3JCLElBQUksRUFBRSxHQUFRLENBQUMsQ0FBQyxPQUFPLEVBQUUsQ0FBQztRQUMxQixJQUFJLEVBQUUsR0FBUSxDQUFDLENBQUMsQ0FBQyxRQUFRLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQztRQUNqQyxJQUFJLEVBQUUsR0FBRyxDQUFDLENBQUMsV0FBVyxFQUFFLENBQUM7UUFFekIsSUFBSSxFQUFFLEdBQUcsRUFBRSxFQUFFO1lBQ1QsRUFBRSxHQUFHLEdBQUcsR0FBRyxFQUFFLENBQUM7U0FDakI7UUFDRCxJQUFJLEVBQUUsR0FBRyxFQUFFLEVBQUU7WUFDVCxFQUFFLEdBQUcsR0FBRyxHQUFHLEVBQUUsQ0FBQztTQUNqQjtRQUNELE9BQU8sRUFBRSxHQUFHLEdBQUcsR0FBRyxFQUFFLEdBQUcsR0FBRyxHQUFHLEVBQUUsQ0FBQztJQUNwQyxDQUFDO0lBRU0sb0JBQW9CLENBQUMsRUFBRSxFQUFFLFFBQWtCO0lBQ2xELENBQUM7Ozs7WUFoSUosVUFBVSxTQUNQO2dCQUNJLFVBQVUsRUFBQyxNQUFNO2FBQ3BCOzs7WUFaSSxRQUFRO1lBQ1IsTUFBTTtZQUNOLFVBQVUiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIENyZWF0ZWQgYnkga3VsZGVlcCBvbiAxMC80LzE3LlxuICovXG5cblxuaW1wb3J0IHsgdGhyb3dFcnJvciBhcyBvYnNlcnZhYmxlVGhyb3dFcnJvciwgT2JzZXJ2YWJsZSwgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgSW5qZWN0b3IgfSBmcm9tICdAYW5ndWxhci9jb3JlJ1xuaW1wb3J0IHsgUm91dGVyLCBOYXZpZ2F0aW9uU3RhcnQgfSBmcm9tIFwiQGFuZ3VsYXIvcm91dGVyXCI7XG5pbXBvcnQgeyBIdHRwQ2xpZW50LCBIdHRwRXJyb3JSZXNwb25zZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcbmltcG9ydCB7IGNhdGNoRXJyb3IsIG1hcCwgcmVmQ291bnQsIHB1Ymxpc2hMYXN0LCB0YWtlTGFzdCwgdGFrZX0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5kZWNsYXJlIHZhciAkOiBhbnk7XG5cblxuLy8gY29uc3QgQVBJX0tFWSA9IG1ha2VTdGF0ZUtleSgnYXBpJyk7XG5ASW5qZWN0YWJsZShcbiAgICB7XG4gICAgICAgIHByb3ZpZGVkSW46J3Jvb3QnXG4gICAgfVxuKVxuZXhwb3J0IGNsYXNzIERhdGFTZXJ2aWNlIHtcbiAgICBhcGk6IGFueTtcbiAgICBwdWJsaWMgZGF0YVNlcnZpY2VDYXJ0OiBTdWJqZWN0PGFueT4gPSBuZXcgU3ViamVjdDxhbnk+KCk7XG5cbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgaW5qZWN0b3I6IEluamVjdG9yLCBwcml2YXRlIF9yb3V0ZXI6IFJvdXRlciwgcHJpdmF0ZSBfaHR0cDogSHR0cENsaWVudCkge1xuICAgICAgICBcbiAgICB9XG5cbiAgICBjYWxsUmVzdGZ1bCh0eXBlOiBzdHJpbmcsIHVybDogc3RyaW5nLCBvcHRpb25zPzogeyBwYXJhbXM/OiB7fSwgYm9keT86IHt9LCBoZWFkZXJEYXRhPzoge30gfSkge1xuICAgICAgICBsZXQgcGFyYW1zO1xuICAgICAgICBsZXQgYm9keTtcblxuICAgICAgICBpZiAob3B0aW9ucyAhPSB1bmRlZmluZWQgJiYgb3B0aW9uc1sncGFyYW1zJ10gIT0gdW5kZWZpbmVkKVxuICAgICAgICAgICAgcGFyYW1zID0gb3B0aW9uc1sncGFyYW1zJ107XG4gICAgICAgIGlmIChvcHRpb25zICE9IHVuZGVmaW5lZCAmJiBvcHRpb25zWydib2R5J10gIT0gdW5kZWZpbmVkKVxuICAgICAgICAgICAgYm9keSA9IG9wdGlvbnNbJ2JvZHknXTtcblxuICAgICAgICBsZXQgaGVhZGVycyA9IHtcbiAgICAgICAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbicsXG4gICAgICAgICAgICAnQWNjZXNzLUNvbnRyb2wtQWxsb3ctTWV0aG9kcyc6ICdHRVQsIFBPU1QsIFBVVCwgREVMRVRFJyxcbiAgICAgICAgICAgICdhY2Nlc3MtY29udHJvbC1hbGxvdy1vcmlnaW4nOiAnKidcbiAgICAgICAgfTtcblxuICAgICAgICBpZiAob3B0aW9ucyAmJiBvcHRpb25zLmhlYWRlckRhdGEgJiYgT2JqZWN0LmtleXMob3B0aW9ucy5oZWFkZXJEYXRhKS5sZW5ndGgpIHtcbiAgICAgICAgICAgIGZvcihsZXQgaGVhZGVyS2V5IGluIG9wdGlvbnMuaGVhZGVyRGF0YSl7XG4gICAgICAgICAgICAgIGhlYWRlcnNbaGVhZGVyS2V5XSA9IG9wdGlvbnMuaGVhZGVyRGF0YVtoZWFkZXJLZXldO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKG9wdGlvbnMuaGVhZGVyRGF0YVsnQ29udGVudC1UeXBlJ10pIHtcbiAgICAgICAgICAgICAgICBoZWFkZXJzWydDb250ZW50LVR5cGUnXSA9IG9wdGlvbnMuaGVhZGVyRGF0YVsnQ29udGVudC1UeXBlJ107XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAob3B0aW9ucy5oZWFkZXJEYXRhWydBY2Nlc3MtQ29udHJvbC1BbGxvdy1NZXRob2RzJ10pIHtcbiAgICAgICAgICAgICAgICBoZWFkZXJzWydBY2Nlc3MtQ29udHJvbC1BbGxvdy1NZXRob2RzJ10gPSBvcHRpb25zLmhlYWRlckRhdGFbJ0FjY2Vzcy1Db250cm9sLUFsbG93LU1ldGhvZHMnXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIFxuICAgICAgICB9XG4gICAgICAgIGxldCBzdGFydF90aW1lID0gbmV3IERhdGUoKS5nZXRUaW1lKCk7XG4gXG4gICAgICAgIHN3aXRjaCAodHlwZSkge1xuICAgICAgICAgICAgY2FzZSAnR0VUJzpcbiAgICAgICAgICAgICAgICBsZXQgZ2V0T3B0aW9ucyA9IHt9O1xuICAgICAgICAgICAgICAgIGlmIChoZWFkZXJzW1wiQ29udGVudC1UeXBlXCJdICYmIGhlYWRlcnNbXCJDb250ZW50LVR5cGVcIl0uaW5kZXhPZihcInRleHRcIikgPiAtMSkge1xuICAgICAgICAgICAgICAgICAgICBnZXRPcHRpb25zID0geyBwYXJhbXM6IHBhcmFtcywgaGVhZGVyczogaGVhZGVycywgcmVzcG9uc2VUeXBlOiBcInRleHRcIiwgd2l0aENyZWRlbnRpYWxzOiB0cnVlIH07XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgZ2V0T3B0aW9ucyA9IHsgcGFyYW1zLCBoZWFkZXJzLCB3aXRoQ3JlZGVudGlhbHM6IHRydWUgfTtcbiAgICAgICAgICAgICAgICB9ICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9odHRwLmdldCh1cmwsIGdldE9wdGlvbnMpLnBpcGUobWFwKHJlcyA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGxldCByZXF1ZXN0X3RpbWUgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKSAtIHN0YXJ0X3RpbWU7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByZXM7XG4gICAgICAgICAgICAgICAgfSksIGNhdGNoRXJyb3IoZXJyID0+IHRoaXMuaGFuZGxlRXJyb3IoZXJyKSkpO1xuICAgICAgICAgICAgY2FzZSAnUE9TVCc6XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2h0dHAucG9zdCh1cmwsIGJvZHksIHsgaGVhZGVycywgd2l0aENyZWRlbnRpYWxzOiB0cnVlIH0pLnBpcGUobWFwKHJlcyA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGxldCByZXF1ZXN0X3RpbWUgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKSAtIHN0YXJ0X3RpbWU7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByZXM7XG4gICAgICAgICAgICAgICAgfSksIGNhdGNoRXJyb3IoZXJyID0+IHRoaXMuaGFuZGxlRXJyb3IoZXJyKSkpO1xuICAgICAgICAgICAgY2FzZSAnUFVUJzpcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5faHR0cC5wdXQodXJsLCBib2R5LCB7IGhlYWRlcnMsIHdpdGhDcmVkZW50aWFsczogdHJ1ZSB9KS5waXBlKG1hcChyZXMgPT4gcmVzKSwgY2F0Y2hFcnJvcihlcnIgPT4gdGhpcy5oYW5kbGVFcnJvcihlcnIpKSk7XG4gICAgICAgICAgICBjYXNlICdERUxFVEUnOlxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9odHRwLmRlbGV0ZSh1cmwsIHsgaGVhZGVycywgd2l0aENyZWRlbnRpYWxzOiB0cnVlIH0pLnBpcGUobWFwKHJlcyA9PiByZXMpLCBjYXRjaEVycm9yKGVyciA9PiB0aGlzLmhhbmRsZUVycm9yKGVycikpKTtcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcHJpdmF0ZSBoYW5kbGVFcnJvcihlcnJvcjogSHR0cEVycm9yUmVzcG9uc2UgfCBhbnkpIHtcbiAgICAgICAgcmV0dXJuIG9ic2VydmFibGVUaHJvd0Vycm9yKGVycm9yKTs7XG4gICAgfVxuIFxuICAgIHNob3dNZXNzYWdlKGNzc0NsYXNzLCBtc2cpIHtcbiAgICAgICAgLy9jb25zb2xlLmxvZyhcInNob3cgbWVzc2FnZSBjc3NDbGFzcyBcIiArIGNzc0NsYXNzICsgXCIgbXNnIGlzIFwiICsgbXNnKTtcbiAgICAgICAgICAgIHZhciB4ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJhbGVydC1ib3hcIik7XG4gICAgICAgICAgICB2YXIgY2xhc3NUeXBlID0gXCJcIjtcbiAgICAgICAgICAgIHguaW5uZXJIVE1MID0gbXNnO1xuICAgICAgICAgICAgaWYgKGNzc0NsYXNzID09IFwiZXJyb3JcIikgY2xhc3NUeXBlID0gXCJzaG93LWVycm9yXCI7XG4gICAgICAgICAgICBpZiAoY3NzQ2xhc3MgPT0gXCJzdWNjZXNzXCIpIGNsYXNzVHlwZSA9IFwic2hvdy1zdWNlc3NcIjtcbiAgICAgICAgICAgIHguY2xhc3NOYW1lID0gY2xhc3NUeXBlO1xuICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgeC5jbGFzc05hbWUgPSB4LmNsYXNzTmFtZS5yZXBsYWNlKGNsYXNzVHlwZSwgXCJcIik7XG4gICAgICAgICAgICB9LCA1MDAwKTtcblxuICAgIH1cblxuICAgIHB1YmxpYyBnZXRDb29raWUobmFtZTogc3RyaW5nKSB7XG4gICAgICAgIC8vVE9ETyB0ZXN0IHNwbGl0IGFuZCB2YWx1ZVxuICAgICAgICAgICAgbGV0IGNhOiBBcnJheTxzdHJpbmc+ID0gZG9jdW1lbnQuY29va2llLnNwbGl0KCc7ICcpO1xuICAgICAgICAgICAgbGV0IGNhTGVuOiBudW1iZXIgPSBjYS5sZW5ndGg7XG4gICAgICAgICAgICBsZXQgY29va2llTmFtZSA9IG5hbWUgKyBcIj1cIjtcbiAgICAgICAgICAgIGxldCBjOiBzdHJpbmc7XG5cbiAgICAgICAgICAgIGZvciAobGV0IGk6IG51bWJlciA9IDA7IGkgPCBjYUxlbjsgaSArPSAxKSB7XG4gICAgICAgICAgICAgICAgYyA9IGNhW2ldLnJlcGxhY2UoL15cXHNcXCsvZywgXCJcIik7XG4gICAgICAgICAgICAgICAgaWYgKGMuaW5kZXhPZihjb29raWVOYW1lKSA9PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBjLnN1YnN0cmluZyhjb29raWVOYW1lLmxlbmd0aCwgYy5sZW5ndGgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgcmV0dXJuIFwiXCI7XG4gICAgfVxuXG4gICAgcHVibGljIGRlbGV0ZUNvb2tpZShuYW1lKSB7XG4gICAgICAgIHRoaXMuc2V0Q29va2llKG5hbWUsIFwiXCIsIC0xKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgc2V0Q29va2llKG5hbWU6IHN0cmluZywgdmFsdWU6IHN0cmluZywgZXhwaXJlRGF5czogbnVtYmVyKSB7XG4gICAgICAgICAgICBsZXQgZDogRGF0ZSA9IG5ldyBEYXRlKCk7XG4gICAgICAgICAgICBkLnNldFRpbWUoZC5nZXRUaW1lKCkgKyBleHBpcmVEYXlzICogMjQgKiA2MCAqIDYwICogMTAwMCk7XG4gICAgICAgICAgICBsZXQgZXhwaXJlczogc3RyaW5nID0gXCJleHBpcmVzPVwiICsgZC50b1VUQ1N0cmluZygpO1xuICAgICAgICAgICAgZG9jdW1lbnQuY29va2llID0gbmFtZSArIFwiPVwiICsgdmFsdWUgKyBcIjsgXCIgKyBleHBpcmVzICsgXCI7XCI7XG4gICAgfVxuXG4gICAgcHVibGljIHRpbWVzdGFtcFRvRGF0YSh0cykge1xuICAgICAgICBsZXQgZCA9IG5ldyBEYXRlKHRzKTtcbiAgICAgICAgbGV0IGRkOiBhbnkgPSBkLmdldERhdGUoKTtcbiAgICAgICAgbGV0IG1tOiBhbnkgPSAoZC5nZXRNb250aCgpICsgMSk7XG4gICAgICAgIGxldCB5eSA9IGQuZ2V0RnVsbFllYXIoKTtcblxuICAgICAgICBpZiAoZGQgPCAxMCkge1xuICAgICAgICAgICAgZGQgPSAnMCcgKyBkZDtcbiAgICAgICAgfVxuICAgICAgICBpZiAobW0gPCAxMCkge1xuICAgICAgICAgICAgbW0gPSAnMCcgKyBtbTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZGQgKyAnLScgKyBtbSArICctJyArIHl5O1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXRUaW1lRnJvbVRpbWVzdGFtcCh0cywgaXNOb1RpbWU/OiBib29sZWFuKSB7XG4gICAgfVxuXG59Il19