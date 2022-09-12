import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Params, Router } from '@angular/router';
import { AnySoaRecord } from 'dns';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';


// const httpOptions = {
//     headers: new HttpHeaders({
//         'Content-Type': 'application/json',
//         'Access-Control-Allow-Origin': '*',
//     }),
// };

@Injectable({
    providedIn: 'root',
})

export class JobControllerService {

    private readonly baseUrl = `${environment.apiUrl}public/`;
    constructor(private http: HttpClient, private router: Router) { }

    public getcountJobs(): Observable<any> {

        return this.http.get(`${this.baseUrl}job/publishing`);
    }

    public getcountJobRegs(): Observable<any> {

        return this.http.get(`${this.baseUrl}number/jobreg`);
    }

    public getcountJobRegsWithstatusId(statusid, smallDate, bigDate): Observable<any> {

        return this.http.get(`${this.baseUrl}number/jobregWitStatus?statusId=` + statusid + `&bigDate=` + bigDate + `&smallDate=` + smallDate);
    }

    public getcountJobDueSoon(): Observable<any> {

        return this.http.get(`${this.baseUrl}job/jobDueSoon`);
    }

    public getcountViewjob(): Observable<any> {

        return this.http.get(`${this.baseUrl}job/views`);
    }
    public getcountJobNeeds(param): Observable<any> {

        return this.http.get(`${this.baseUrl}job/needs/month?month=` + param);
    }

    public getcountSuccessJobReg(param): Observable<any> {

        return this.http.get(`${this.baseUrl}number/jobreg/success?month=` + param);
    }

    public getAllJobs(form: any): Observable<any> {

        return this.http.post(`${this.baseUrl}job/search`, form);
    }

    public updateview(param): Observable<any> {

        return this.http.get(`${this.baseUrl}job/updating/views?id=` + param);
    }



    public UpdateStatus(form: any): Observable<any> {
        return this.http.put(`${this.baseUrl}job/updateStatus`, form);
    }

}