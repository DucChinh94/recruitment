import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';

const httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
    }),
};

@Injectable({
    providedIn: 'root'
})


export class JobRegisterServiceService {

    private readonly baseUrl = `${environment.apiUrl}public/`;
    constructor(private http: HttpClient, private router: Router) { }

    public getListJR(form: any): Observable<any> {

        return this.http.post(`${this.baseUrl}job_register`, form);
    }

    public getListJRwithSort(form: any, param): Observable<any> {

        return this.http.post(`${this.baseUrl}job_register?sortBy=` + param, form);
    }

    public getListJRWithSeach(form: any, param): Observable<any> {

        return this.http.post(`${this.baseUrl}job_register?search=` + param, form);
    }

    public getListJRWithBothS(form: any, search, sort): Observable<any> {

        return this.http.post(`${this.baseUrl}job_register?search=` + search + `&sortBy=` + sort, form);
    }

    public getListJRWithStatus(form: any, status): Observable<any> {

        return this.http.post(`${this.baseUrl}job_register?status=` + status, form);
    }

    public getListJRWithStatusAndSearch(form: any, status, search): Observable<any> {

        return this.http.post(`${this.baseUrl}job_register?status=` + status + `&search=` + search, form);
    }
    public getListJRWithDateMin(form: any, dateMin): Observable<any> {

        return this.http.post(`${this.baseUrl}job_register?minDate=` + dateMin, form);
    }

    public getListJRWithDateMinAndSearch(form: any, dateMin, search): Observable<any> {

        return this.http.post(`${this.baseUrl}job_register?minDate=` + dateMin + `&search=` + search, form);
    }

    public getListJRWithDateMax(form: any, dateMax): Observable<any> {

        return this.http.post(`${this.baseUrl}job_register?maxDate=` + dateMax, form);
    }
    public getListJRWithDateMaxAndSearch(form: any, dateMax, search): Observable<any> {

        return this.http.post(`${this.baseUrl}job_register?maxDate=` + dateMax + `&search=` + search, form);
    }

    public getListJRWithDateMaxandMin(form: any, dateMax, dateMin): Observable<any> {

        return this.http.post(`${this.baseUrl}job_register?maxDate=` + dateMax + `&minDate=` + dateMin, form);
    }
    public getListJRWithDateMaxandMinAndSearch(form: any, dateMax, dateMin, search): Observable<any> {

        return this.http.post(`${this.baseUrl}job_register?maxDate=` + dateMax + `&minDate=` + dateMin + `&search=` + search, form);
    }

    public getListJRWithDateMaxandMinAndStatus(form: any, dateMax, dateMin, status): Observable<any> {

        return this.http.post(`${this.baseUrl}job_register?maxDate=` + dateMax + `&minDate=` + dateMin + `&status=` + status, form);
    }

    public getListJRWithDateMaxandMinAndStatusAndSearch(form: any, dateMax, dateMin, status, search): Observable<any> {

        return this.http.post(`${this.baseUrl}job_register?maxDate=` + dateMax + `&minDate=` + dateMin + `&status=` + status + `&search=` + search, form);
    }



    public createNewJR(form: any): Observable<any> {

        return this.http.post(`${this.baseUrl}job_register-insertion`, form);
    }
    public updateJRInfor(form: any, param): Observable<any> {

        return this.http.put(`${this.baseUrl}job_register-updating?username=` + param, form);
    }

    statusJobRegister: any;
    reason: any;

    setReasons(element: any) {
        this.statusJobRegister = element;
    }

    getReasons() {
        return this.statusJobRegister;
    }

    setReasonss(elementt: any) {
        this.reason = elementt;
    }

    getReasonss() {
        return this.reason;
    }
    public changeStatus(statusdto: any): Observable<any> {
        return this.http.post(`${this.baseUrl}` + 'job_register/updateStatusJobRegister', statusdto);
    }

    public changeReson(reasonDto): Observable<any> {
        return this.http.put(`${this.baseUrl}job_regiser_details`, reasonDto);
    }
    public bookInterview(form: any): Observable<any> {
        return this.http.put(`${this.baseUrl}book/jobreg/interview`, form);
    }




}
