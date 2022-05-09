import { Component, Input, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { ModalController, PopoverController } from '@ionic/angular';
import { RxFormGroup } from '@rxweb/reactive-form-validators';
import { CalendarComponent } from 'src/app/components/calendar/calendar.component';
import { ContactsChooserComponent } from 'src/app/components/contacts-chooser/contacts-chooser.component';
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
    private ahorrosService: AhorrosService,
    public popoverController: PopoverController
  ) {
    this.form = this.formService.initForm(new AhorroModel());
    this.form.get('requiereFecha').valueChanges.subscribe((value) => {
      if(value){
        this.form.get('fechaMeta').clearValidators();
      }else{
        this.form.get('fechaMeta').setValidators(Validators.required);
      }
      this.form.get('fechaMeta').updateValueAndValidity();
    });
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

    if(this.form.value.requiereFecha){
      delete this.form.value.fechaMeta;
    }

    (await this.ahorrosService.save(this.form.value, this.ahorroEdit ? true : false)).subscribe(({success}) => {
      if(success){
        this.modalCtrl.dismiss({update: true});
      }
    });
  }

  async showContacts(ev: any) {
    const popover = await this.popoverController.create({
      component: ContactsChooserComponent,
      cssClass: 'my-custom-class',
      event: ev,
      translucent: true,
      alignment: 'center',
      componentProps: {
        idAhorro: this.ahorroEdit.id
      }
    });
    await popover.present();

    const { role, data } = await popover.onDidDismiss();
  }


}
