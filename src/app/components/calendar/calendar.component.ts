import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { format, parseISO } from 'date-fns';
import { es } from 'date-fns/locale';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
})
export class CalendarComponent implements OnInit {
  public today: string = new Date().toISOString();
  constructor(
    private popoverCtrl: PopoverController
  ) { }

  ngOnInit() {}

  selectDate(evento){
    this.popoverCtrl.dismiss({
      date: format(parseISO(evento.detail.value), 'MMM d, yyyy', {locale: es})
    });
  }


}
