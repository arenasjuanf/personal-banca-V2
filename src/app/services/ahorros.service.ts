import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AhorroModel } from '../models/ahorro.model';
import { HttpResponseModel } from '../models/httpResponse.model';
import { Utils } from '../shared/utils';
import { HttpService } from './http.service';
import { StorageService } from './storage.service';
import { TimeService } from './time.service';

@Injectable({
  providedIn: 'root'
})
export class AhorrosService {

  constructor(
    private http: HttpService,
    private storage: StorageService,
  ) { }

  async getAll(type: 1 | 2 = 1): Promise<Observable<HttpResponseModel>>{
    const { id: userId } = await this.storage.get('user');
    return this.http.get(`traerAhorros/${userId}/${type}`).pipe(map( (ahorros: any) => ahorros.map((ahorro:any) => {
      const {objetivo, ahorrado} = ahorro;
      return {...ahorro, percent: Utils.getPercentage(ahorrado, objetivo) };
    })));
  }

  async save(data: AhorroModel){
    const { id: userId } = await this.storage.get('user');
    return this.http.post('agregarAhorro', {
      ...data,
      // eslint-disable-next-line @typescript-eslint/naming-convention
      fk_id_usuario: userId,
      nombreAhorro: data.nombre,
      tipoAhorro: data.tipo_ahorro
    });
  }

  async getOne(id: number): Promise<Observable<any>>{
    const montos = await this.http.get(`datosMontos/${id}`).toPromise();
    return this.http.get(`datosAhorro/${id}`).pipe(map((result) => ({...result, montos })));
  }

  selectIntervalo(data): Observable<any>{
    return this.http.put(`actualizarMonto`, data);
  }

  addMonto(data: {idAhorro: number; monto: number}): Observable<HttpResponseModel>{
    return this.http.post(`agregarMonto`, data);
  }

  delete(idAhorro: number, tipo: number): Observable<HttpResponseModel>{
    return this.http.delete(`borrarAhorro`,{idAhorro,tipo});
  }

}
