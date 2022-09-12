import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpInterceptor, HttpResponse } from '@angular/common/http';
import { HttpRequest } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { HttpHandler } from '@angular/common/http';
import { HttpEvent } from '@angular/common/http';
import { TokenService } from '../services/token.service';
import { catchError, map } from 'rxjs/operators';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class Interceptor implements HttpInterceptor {
  token: string;
  constructor(private tokenser: TokenService, private router: Router) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (localStorage.getItem('token') != null) {
      const tokenInfo = localStorage.getItem('token');
      const tokenizedReq = req.clone({ headers: req.headers.set('Authorization', tokenInfo) });
      return next.handle(tokenizedReq).pipe(
        map((event: HttpEvent<any>) => {
          if (event instanceof HttpResponse) {
            console.log('event--->>>', event);
          }
          return event;
        }),
        catchError((error: HttpErrorResponse) => {
          if (error['status'] === 403) {
            this.tokenser.removeToken();
            this.router.navigate(['/auth/']);
          }
          return throwError(error);
        }),
      );;
    }
    return next.handle(req);
  }
}