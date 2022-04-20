import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
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
    private router: Router,
  ) {
  }

  login(email: string, clave: string): Observable<HttpResponseModel>{
    return this.http.get(`login/${email}/${clave}`);
  }

  register(data: RegisterModel): Observable<HttpResponseModel>{
    return this.http.post(`registrar`, data);
  }

  async logout(): Promise<void>{
    try{
      await this.storage.clearAll();
      this.router.navigateByUrl('auth');
    }
    catch(e){
      console.log(e);
    }
  }

  sendRecoverMail(email: string): Observable<any>{
    return this.http.get(`enviarPin/${email}`);
  }

  sendRecoverPin(email: string, pin: string | number ){
    return this.http.get(`validarPin/${email}/${pin}`);
  }

  setNewPassword(email:string, pass:string){
    return this.http.put(`nuevaPassword`, {email, pass });
  }

}
