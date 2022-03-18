import { Component, OnInit } from '@angular/core';
import { ModalController, PopoverController } from '@ionic/angular';
import { RxFormGroup } from '@rxweb/reactive-form-validators';
import { Subject } from 'rxjs';
import { CalendarComponent } from 'src/app/components/calendar/calendar.component';
import { AhorroModel } from 'src/app/models/ahorro.model';
import { AhorrosService } from 'src/app/services/ahorros.service';
import { FormsService } from 'src/app/services/forms.service';
import { HttpService } from 'src/app/services/http.service';
import { Globals } from 'src/app/shared/globals';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit {

  public form: RxFormGroup;
  public headerOptions: { startIcon: string; startFunction: () => void; endIcon: string; endFunction: () => Promise<boolean>; };
  public tiposAhorro = Globals.tiposAhorro;
  constructor(
    public modalCtrl: ModalController,
    private popoverCtrl: PopoverController,
    private formService: FormsService,
    private ahorrosService: AhorrosService
  ) {
    this.form = this.formService.initForm(new AhorroModel());
    this.initHeaderOptions();
  }

  ngOnInit() {}

  initHeaderOptions(){
    this.headerOptions = {
      startIcon: '',
      startFunction: () => {},
      endIcon: 'close',
      endFunction : () => this.modalCtrl.dismiss()
    };
  }

  async openDatePicker(){

    const popover = await this.popoverCtrl.create({
      component: CalendarComponent,
      mode: 'ios',
      backdropDismiss: true,
      showBackdrop: true,
      size: 'auto',
      cssClass: 'pop-date',
    });
    await popover.present();
    const {date} = (await popover.onDidDismiss()).data || '';
    this.form.get('fechaMeta').setValue(date);
  }

  async save(){
    console.log(this.form);
    (await this.ahorrosService.save(this.form.value)).subscribe(console.log);
  }

}
