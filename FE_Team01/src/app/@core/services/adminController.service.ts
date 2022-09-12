import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Params, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';


const httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
    }),
};

@Injectable({
    providedIn: 'root',
})
export class AdminControllerService {

    private readonly baseUrl = `${environment.apiUrl}public/`;
    constructor(private http: HttpClient, private router: Router) { }

    public getListJE(form: any): Observable<any> {

        return this.http.post(`${this.baseUrl}user-lists`, form);
    }

    public getListJEwithSort(form: any, param): Observable<any> {

        return this.http.post(`${this.baseUrl}user-lists?sortBy=` + param, form);
    }

    public getListJEWithSeach(form: any, param): Observable<any> {

        return this.http.post(`${this.baseUrl}user-lists?search=` + param, form);
    }

    public getListJEWithBothS(form: any, search, sort): Observable<any> {

        return this.http.post(`${this.baseUrl}user-lists?search=` + search + `&sortBy=` + sort, form);
    }

    public deActiveJE(param: string): Observable<any> {
        return this.http.put(`${this.baseUrl}user-deleting?username=` + param, "");
    }

    public createNewJE(form: any): Observable<any> {

        return this.http.post(`${this.baseUrl}user-insertion`, form);
    }
    public updateJEInfor(form: any, param): Observable<any> {

        return this.http.put(`${this.baseUrl}user-updating?username=` + param, form);
    }
}
