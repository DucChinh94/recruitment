import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
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
export class AuthService {

  private readonly baseUrl = `${environment.apiUrl}auth/`;

  constructor(private http: HttpClient, private router: Router) { }

  public login(form: any): Observable<any> {
    return this.http.post(`${this.baseUrl}login`, form);
  }

  public signup(form: any): Observable<any> {
    return this.http.post(`${this.baseUrl}signup`, form);
  }

  public sendotp(form: any): Observable<any> {
    return this.http.post(`${this.baseUrl}opt-generaing` + "?email=" + form.email, null);
  }

  public resetpw(form: any): Observable<any> {
    return this.http.post(`${this.baseUrl}newPass-setting` + "?password=" + form.password + "&" + "opt=" + form.otp, null);
  }

  public activeAcc(): Observable<any> {
    const id = (localStorage.getItem("activeID"))
    return this.http.get(`http://localhost:9090/api/public/active_account?id=` + id);
  }

  public changepasswword(form: any): Observable<any> {
    return this.http.post(`${this.baseUrl}change-password?curpassword=` + form.currentpassword + `&password=` + form.password + `&username=` + localStorage.getItem("token").split(",")[0].split(':')[1].replace('"', '').replace('"', ''), null);
  }

}
