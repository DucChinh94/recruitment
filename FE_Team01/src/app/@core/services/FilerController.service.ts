import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class FileController {
    private baseUrl = 'http://localhost:9090';

    constructor(private http: HttpClient) { }

    upload(file: File, param): Observable<HttpEvent<any>> {
        const formData: FormData = new FormData();

        formData.append('file', file);

        const req = new HttpRequest('POST', `${this.baseUrl}/api/FileUploading/create?username=` + param, formData, {
            reportProgress: true,
            responseType: 'json'
        });

        return this.http.request(req);
    }

    getFiles(param): Observable<any> {
        return this.http.get(`${this.baseUrl}/api/FileUploading/file/` + param);
    }

    getfileName(param): Observable<any> {
        return this.http.get(`${this.baseUrl}/api/FileUploading/Filename?username=` + param);
    }
}
