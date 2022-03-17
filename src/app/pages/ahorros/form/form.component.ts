import { Component, Input, OnInit } from '@angular/core';
import { ModalController, Platform } from '@ionic/angular';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit {

  // eslint-disable-next-line @typescript-eslint/naming-convention
  @Input()isOpen: boolean;
  headerOptions: { startIcon: string; startFunction: () => void; endIcon: string; endFunction: () => Promise<boolean>; };

  constructor(
    private modalCtrl: ModalController,
  ) {
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

}
