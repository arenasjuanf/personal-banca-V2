import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpResponseModel } from '../models/httpResponse.model';
import { RegisterModel } from '../models/register.model';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpService) {
  }

  login(email: string, clave: string): Observable<HttpResponseModel>{
    return this.http.get(`login/${email}/${clave}`);
  }

  register(data: RegisterModel): Observable<HttpResponseModel>{
    return this.http.post(`registrar`, data);
  }

}
