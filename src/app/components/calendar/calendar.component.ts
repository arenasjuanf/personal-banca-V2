import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { format, parseISO } from 'date-fns';
import { es } from 'date-fns/locale';
import { TimeService } from 'src/app/services/time.service';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
})
export class CalendarComponent implements OnInit {
  public today: string = new Date().toISOString();
  public max: string = new Date( new Date().setFullYear(new Date().getFullYear() + 100)).toISOString();
  constructor(
    private popoverCtrl: PopoverController,
    private time: TimeService
  ) { }

  ngOnInit() {}

  selectDate(evento){
    this.popoverCtrl.dismiss({
      date: this.time.parse(evento.detail.value)
    });
  }


}
