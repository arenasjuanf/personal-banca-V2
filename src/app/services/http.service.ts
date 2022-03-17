import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpResponseModel } from '../models/httpResponse.model';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(
    private http: HttpClient
  ) { }

  post(url: string , data: any): Observable<HttpResponseModel>{
    return this.http.post<HttpResponseModel>(`${environment.urlServer}/${url}`, data);
  }

  get(url: string): Observable<HttpResponseModel>{
    return this.http.get<HttpResponseModel>(`${environment.urlServer}/${url}`);
  }
}
