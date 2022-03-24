import { Pipe, PipeTransform } from '@angular/core';
import { TimeService } from 'src/app/services/time.service';

@Pipe({
  name: 'date'
})
export class DatePipe implements PipeTransform {

  constructor(
    private time: TimeService
  ){}

  transform(value: string | Date, format: string = 'l'): string {
    return this.time.parse(value, format);
  }

}
