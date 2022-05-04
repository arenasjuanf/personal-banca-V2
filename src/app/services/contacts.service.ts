import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { StorageService } from './storage.service';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContactsService {

  constructor(
    private http: HttpService,
    private storage: StorageService,
  ) { }

  getContacts(userId: string): Observable<any>{
    return this.http.get(`traerContactos/${userId}`);
  }


  async addContact(email: string): Promise<Observable<any>>{
    const { id: userId } = await this.storage.get('user');
    return this.http.post(`agregarContacto`,{
      userId,
      email
    });
  }

}
