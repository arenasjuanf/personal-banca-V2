import { Component, OnInit } from '@angular/core';
import { IonRouterOutlet, ModalController } from '@ionic/angular';
import { AhorrosService } from 'src/app/services/ahorros.service';
import { Globals } from 'src/app/shared/globals';
import { FormComponent } from './form/form.component';

@Component({
  selector: 'app-deudas',
  templateUrl: './deudas.page.html',
  styleUrls: ['./deudas.page.scss', './../ahorros/ahorros.page.scss'],
})
export class DeudasPage implements OnInit {

  list: any[];
  public getTipoAhorro = Globals.getTipoAhorro;
  public headerOptions: { endIcon: string; endFunction: () => void};

  constructor(
    private deudas: AhorrosService,
    private modalCtrol: ModalController,
    private routerOutlet: IonRouterOutlet,

  ) {
    this.initHeaderOptions();
    this.getDeudas();
  }

  ngOnInit() {
  }

  async getDeudas(){
    (await this.deudas.getAll(2)).subscribe((list: any) => {
      this.list = list;
    });
  }

  initHeaderOptions(){
    this.headerOptions = {
      endIcon: 'add',
      endFunction : () => this.openModalForm()
    };
  }

  async openModalForm(){
    const modal = await this.modalCtrol.create(
      {
        animated: true,
        mode: 'md',
        component: FormComponent,
        swipeToClose: false,
        presentingElement: this.routerOutlet.nativeEl
      }
    );
    return await modal.present();
  }

}
