import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpResponseModel } from '../models/httpResponse.model';
import { RegisterModel } from '../models/register.model';
import { HttpService } from './http.service';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(
    private http: HttpService,
    private storage: StorageService,
    private router: Router
  ) {
  }

  login(email: string, clave: string): Observable<HttpResponseModel>{
    return this.http.get(`login/${email}/${clave}`);
  }

  register(data: RegisterModel): Observable<HttpResponseModel>{
    return this.http.post(`registrar`, data);
  }

  async logout(){
    try{
      await this.storage.clearAll();
      this.router.navigateByUrl('auth');
    }
    catch(e){
      console.log(e);
    }
  }

}
