import { Component, OnInit } from '@angular/core';
import { ModalController, PopoverController } from '@ionic/angular';
import { RxFormGroup } from '@rxweb/reactive-form-validators';
import { CalendarComponent } from 'src/app/components/calendar/calendar.component';
import { DeudaModel } from 'src/app/models/deuda.model';
import { AhorrosService } from 'src/app/services/ahorros.service';
import { DeudasService } from 'src/app/services/deudas.service';
import { FormsService } from 'src/app/services/forms.service';
import { Globals } from 'src/app/shared/globals';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['../../ahorros/form/form.component.scss'],
})
export class FormComponent implements OnInit {

  public form: RxFormGroup;
  public headerOptions: { startIcon: string; startFunction: () => void; endIcon: string; endFunction: () => Promise<boolean>; };
  public tiposAhorro = Globals.tiposAhorro;
  constructor(
    public modalCtrl: ModalController,
    private popoverCtrl: PopoverController,
    private formService: FormsService,
    private deudasService: DeudasService
  ) {
    this.form = this.formService.initForm(new DeudaModel());
    this.initHeaderOptions();
  }

  ngOnInit() {}

  initHeaderOptions(): void{
    this.headerOptions = {
      startIcon: '-',
      startFunction: () => {},
      endIcon: 'close',
      endFunction : () => this.modalCtrl.dismiss()
    };
  }

  async openDatePicker(): Promise<void>{
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

  async save(): Promise<void>{
    (await this.deudasService.save(this.form.value)).subscribe(({success}) => {
      if(success){
        this.modalCtrl.dismiss({update: true});
      }
    });
  }

}
