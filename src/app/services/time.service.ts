import { Injectable } from '@angular/core';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class TimeService {

  constructor() {
    moment.locale('es');
  }

  parse(date: Date | string, format = 'l'){
    return moment(date).format(format);
  }

}
