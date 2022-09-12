import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ServicesService {
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application-job/json',
      'Access-Control-Allow-Origin': '*',
    }),
  };
  private readonly baseUrl = `${environment.apiUrl}public/`;
  constructor(private http: HttpClient, private router: Router) { }

  public getListJobWithSeach(form: any, param): Observable<any> {

    return this.http.post(`${this.baseUrl}job?search=` + param, form);
  }

  public deActiveJob(param: string): Observable<any> {
    return this.http.put(`${this.baseUrl}job-deleting?name=` + param, "");
  }

  public createNewJob(form: any): Observable<any> {

    return this.http.post(`${this.baseUrl}job/add`, form);
  }
  public updateJobInfor(form: any, param): Observable<any> {

    return this.http.put(`${this.baseUrl}job-updating?username=` + param, form);
  }

  public getListJob(form: any): Observable<any> {

    return this.http.post(`${this.baseUrl}job/search`, form);
  }
  public getListJobb(form: any): Observable<any> {

    return this.http.post(`${this.baseUrl}job/all`, form);
  }

  public getFieldSelect(form: any): Observable<any> {

    return this.http.post(`${this.baseUrl}job/selct`, form);
  }

  public getListJWithBothS(form: any, search, sort): Observable<any> {

    return this.http.post(`${this.baseUrl}job?search` + search + `&sortBy=` + sort, form);
  }
  public getListJwithSort(form: any, param): Observable<any> {

    return this.http.post(`${this.baseUrl}/job/search` + param, form);
  }

  public getAllAcademiclevel(): Observable<any> {

    return this.http.get(`${this.baseUrl}job/academiclevel`);
  }
  public getAllWorkingForm(): Observable<any> {

    return this.http.get(`${this.baseUrl}job/Workingform`);
  }

  public getAllJobPosition(): Observable<any> {

    return this.http.get(`${this.baseUrl}job/jobposition`);
  }

  public getAllRank(): Observable<any> {

    return this.http.get(`${this.baseUrl}job/rank`);
  }

  public getAllStatusJob(): Observable<any> {

    return this.http.get(`${this.baseUrl}job/statusjob`);
  }

  public getListJRwithSort(form: any, param): Observable<any> {

    return this.http.post(`${this.baseUrl}job_register?sortBy=` + param, form);
  }

  public getListJRWithStatusJob(form: any, param): Observable<any> {

    return this.http.post(`${this.baseUrl}job/all?statusJob=` + param, form);
  }

  public getListJRWithMinSal(form: any, search, sort): Observable<any> {

    return this.http.post(`${this.baseUrl}job_register?search=` + search + `&sortBy=` + sort, form);
  }

  public getListJRWithMaxSa(form: any, status): Observable<any> {

    return this.http.post(`${this.baseUrl}job/all?maxSalary=` + status, form);
  }

  public getListJRWithMinSaAndMaxSa(form: any, minsa, maxSalary, search): Observable<any> {

    return this.http.post(`${this.baseUrl}job/all?maxSalary=` + maxSalary + `&search=` + `&minsalary=` + minsa + search, form);
  }
  public getListJRWithMinSaAndMaxSaAndSearch(form: any, minSa, maxSa, search): Observable<any> {

    return this.http.post(`${this.baseUrl}job/all?maxSalary=` + maxSa + `&minsalary=` + minSa + `&search=` + search, form);
  }

  public getListJRWithDateMinSaAndMaxSaAndStatusAndSearch(form: any, minSa, maxSa, Status, search): Observable<any> {

    return this.http.post(`${this.baseUrl}job/all?maxSalary=` + maxSa + `&minsalary=` + minSa + `&statusJob=` + Status + `&search=` + search, form);
  }

  public getListJRWithMinSaAndSearch(form: any, minSa, search): Observable<any> {

    return this.http.post(`${this.baseUrl}job/all?minsalary=` + minSa + `&search=` + search, form);
  }
  public getListJRWithMaxSaAndSearch(form: any, maxSa, search): Observable<any> {

    return this.http.post(`${this.baseUrl}job/all?maxSalary=` + maxSa + `&search=` + search, form);
  }

  public getListJRWithMinSaAndStatus(form: any, minSa, status): Observable<any> {

    return this.http.post(`${this.baseUrl}job/all?minsalary=` + minSa + `&statusJob=` + status, form);
  }
  public getListJRWithMaxSaAndSatus(form: any, maxsa, status): Observable<any> {

    return this.http.post(`${this.baseUrl}job/all?minsalary=` + maxsa + `&statusJob=` + status, form);
  }
  public getListJRWithSearchAndSatus(form: any, search, status): Observable<any> {

    return this.http.post(`${this.baseUrl}job/all?search=` + search + `&statusJob=` + status, form);
  }

  // public getListJRWithDateMaxandMinAndStatus(form: any, dateMax, dateMin, status): Observable<any> {

  //     return this.http.post(`${this.baseUrl}job_register?maxDate=` + dateMax + `&minDate=` + dateMin + `&status=` + status, form);
  // }

  // public getListJRWithDateMaxandMinAndStatusAndSearch(form: any, dateMax, dateMin, status, search): Observable<any> {

  //     return this.http.post(`${this.baseUrl}job_register?maxDate=` + dateMax + `&minDate=` + dateMin + `&status=` + status + `&search=` + search, form);
  // }

}
