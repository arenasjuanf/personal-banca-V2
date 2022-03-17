import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpResponseModel } from '../models/httpResponse.model';
import { Utils } from '../shared/utils';
import { HttpService } from './http.service';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class AhorrosService {

  constructor(
    private http: HttpService,
    private storage: StorageService
  ) { }

  async getAll(type: 1 | 2 = 1): Promise<Observable<HttpResponseModel>>{
    const { id: userId } = await this.storage.get('user');
    return this.http.get(`traerAhorros/${userId}/${type}`).pipe(map( (ahorros: any) => ahorros.map((ahorro:any) => {
        const {objetivo, ahorrado} = ahorro;
        return {...ahorro, percent: Utils.getPercentage(ahorrado, objetivo) };
      })));
  }
}
