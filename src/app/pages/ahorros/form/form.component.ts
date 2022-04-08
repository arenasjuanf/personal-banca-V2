import { Component, Input, OnInit } from '@angular/core';
import { ModalController, PopoverController } from '@ionic/angular';
import { RxFormGroup } from '@rxweb/reactive-form-validators';
import { CalendarComponent } from 'src/app/components/calendar/calendar.component';
import { AhorroModel } from 'src/app/models/ahorro.model';
import { AhorrosService } from 'src/app/services/ahorros.service';
import { FormsService } from 'src/app/services/forms.service';
import { Globals } from 'src/app/shared/globals';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit {

  @Input() ahorroEdit: AhorroModel;

  public form: RxFormGroup;
  public headerOptions: { startIcon: string; startFunction: () => void; endIcon: string; endFunction: () => Promise<boolean>; };
  public tiposAhorro = Globals.tiposAhorro;
  constructor(
    public modalCtrl: ModalController,
    private popoverCtrl: PopoverController,
    private formService: FormsService,
    private ahorrosService: AhorrosService
  ) {
    this.form = this.formService.initForm(AhorroModel);
    this.form.get('requiereFecha').valueChanges.subscribe((result) => console.log(result));
    this.initHeaderOptions();
  }

  ngOnInit() {
    if(this.ahorroEdit){
      this.form.patchValue(this.ahorroEdit);
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      !this.ahorroEdit.fechaMeta && this.form.get('requiereFecha').setValue(true);
    }
  }

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
    const {date} = (await popover.onDidDismiss()).data || {date: ''};
    this.form.get('fechaMeta').setValue(date);
  }

  async save(): Promise<void>{
    (await this.ahorrosService.save(this.form.value, this.ahorroEdit ? true : false)).subscribe(({success}) => {
      if(success){
        this.modalCtrl.dismiss({update: true});
      }
    });
  }

}
