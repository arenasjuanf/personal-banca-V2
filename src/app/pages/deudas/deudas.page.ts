import { Component, OnInit } from '@angular/core';
import { AlertController, IonRouterOutlet, ModalController } from '@ionic/angular';
import { DeudaModel } from 'src/app/models/deuda.model';
import { AhorrosService } from 'src/app/services/ahorros.service';
import { LoadingService } from 'src/app/services/loading.service';
import { Globals } from 'src/app/shared/globals';
import { FormComponent } from './form/form.component';
import { VistaComponent } from './vista/vista.component';

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
    private loading: LoadingService,
    private alert: AlertController,
  ) {
    this.initHeaderOptions();
    this.loading.show('Cargando deudas');
    this.getDeudas();
  }

  ngOnInit() {
  }

  async getDeudas(){
    (await this.deudas.getAll(2)).subscribe((list: any) => {
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

  async openModalForm(deudaEdit?: DeudaModel){

    const modal = await this.modalCtrol.create(
      {
        animated: true,
        mode: 'md',
        component: FormComponent,
        swipeToClose: false,
        presentingElement: this.routerOutlet.nativeEl,
        componentProps: deudaEdit ? {deudaEdit} : null

      }
    );

    await modal.present();
    const {update} = (await modal.onDidDismiss()).data || {};
    if(update){
      this.loading.show('Cargando deudas');
      this.getDeudas();
    }
  }

  async openModalView(ahorro: DeudaModel){
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
      if(data?.update){
        this.loading.show('Cargando ahorros');
        this.getDeudas();
      }
  }

  async alertDelete(deuda: DeudaModel): Promise<void>{
    const alert = await this.alert.create({
      header: 'Eliminar',
      message: 'Está seguro de eliminar la deuda?',
      buttons: [{
        text: 'Si',
        handler: (result) => {
          this.delete(deuda);
        }
      },
      {
        role: 'cancel', text: 'No'
      }]
    });

    return await alert.present();
  }

  delete(ahorro: DeudaModel): void{
    this.loading.show('Eliminando Deuda');
    this.deudas.delete(ahorro.id, ahorro.tipo).subscribe(({success}) => {
      if(success){
        this.getDeudas();
      }
    });
  }

  async openModalEdit(deuda: DeudaModel): Promise<void>{
    this.openModalForm(deuda);
  }

}
