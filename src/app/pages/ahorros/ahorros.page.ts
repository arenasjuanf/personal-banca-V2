import { Component, OnInit } from '@angular/core';
import { AlertController, IonRouterOutlet, ModalController } from '@ionic/angular';
import { AhorroModel } from 'src/app/models/ahorro.model';
import { AhorrosService } from 'src/app/services/ahorros.service';
import { LoadingService } from 'src/app/services/loading.service';
import { Globals } from 'src/app/shared/globals';
import { FormComponent } from './form/form.component';
import { VistaComponent } from './vista/vista.component';

@Component({
  selector: 'app-ahorros',
  templateUrl: './ahorros.page.html',
  styleUrls: ['./ahorros.page.scss'],
})
export class AhorrosPage implements OnInit {
  public list: any[];
  public headerOptions: { endIcon: string; endFunction: () => void};
  public getTipoAhorro = Globals.getTipoAhorro;

  constructor(
    private ahorros: AhorrosService,
    private modalCtrol: ModalController,
    private routerOutlet: IonRouterOutlet,
    private alert: AlertController,
    private loading: LoadingService
  ) {
    this.initHeaderOptions();
    this.loading.show('Cargando ahorros');
    this.getAhorros();
  }

  ngOnInit() {
  }

  async getAhorros(){
    (await this.ahorros.getAll(1)).subscribe((list: any) => {
      this.list = list;
      this.loading.hide();
    });
  }

  initHeaderOptions(){
    this.headerOptions = {
      endIcon: 'add',
      endFunction : () => this.openModalForm()
    };
  }

  async openModalForm(){
    const modal: HTMLIonModalElement = await this.modalCtrol.create(
      {
        animated: true,
        mode: 'md',
        component: FormComponent,
        swipeToClose: false,
        presentingElement: this.routerOutlet.nativeEl
      }
    );
    await modal.present();
    const {update} = (await modal.onDidDismiss()).data || {};
    if(update){
      this.loading.show('Cargando ahorros');
      this.getAhorros();
    }
  }

  async openModalView(ahorro: AhorroModel){
    const modal: HTMLIonModalElement = await this.modalCtrol.create(
      {
        animated: true,
        mode: 'md',
        component: VistaComponent,
        swipeToClose: false,
        presentingElement: this.routerOutlet.nativeEl,
        componentProps: {ahorro}
      });

      await modal.present();
      const {data} = (await modal.onDidDismiss());
      if(data.update){
        this.loading.show('Cargando ahorros');
        this.getAhorros();
      }
  }

  async alertDelete(ahorro: AhorroModel): Promise<void>{
    const alert = await this.alert.create({
      header: 'Eliminar',
      message: 'Está seguro de eliminar el ahorro?',
      buttons: [{
        text: 'Si',
        handler: (result) => {
          this.delete(ahorro);
        }
      },
      {
        role: 'cancel', text: 'No'
      }]
    });

    return await alert.present();
  }

  delete(ahorro: AhorroModel): void{
    this.loading.show('Eliminando Ahorro');
    this.ahorros.delete(ahorro.id, ahorro.tipo).subscribe(({success}) => {
      if(success){
        this.getAhorros();
      }
    });
  }

}
