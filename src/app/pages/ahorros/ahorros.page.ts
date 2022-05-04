import { Component, OnInit } from '@angular/core';
import { AlertController, IonRouterOutlet, IonSegment, ModalController } from '@ionic/angular';
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
  fullList: any;

  constructor(
    private ahorros: AhorrosService,
    private modalCtrol: ModalController,
    private routerOutlet: IonRouterOutlet,
    private alert: AlertController,
    private loading: LoadingService,
  ) {
    this.initHeaderOptions();
    this.loading.show('Cargando ahorros');
    this.getAhorros();
  }

  ngOnInit() {
  }

  async getAhorros(){
    (await this.ahorros.getAll(1)).subscribe((list: any) => {
      this.fullList = list;
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

  async openModalForm(ahorroEdit?: AhorroModel){
    const modal: HTMLIonModalElement = await this.modalCtrol.create(
      {
        animated: true,
        mode: 'md',
        component: FormComponent,
        swipeToClose: false,
        presentingElement: this.routerOutlet.nativeEl,
        componentProps: ahorroEdit ? {ahorroEdit} : null
      }
    );
    await modal.present();
    const {update} = (await modal.onDidDismiss()).data || {};
    if(update){
      await this.loading.show('Cargando ahorros');
      this.getAhorros();
    }
  }

  async openModalView(ahorro: AhorroModel): Promise<void>{
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
        this.getAhorros();
      }
  }

  async openModalEdit(ahorro: AhorroModel): Promise<void>{
    this.openModalForm(ahorro);
  }

  async alertDelete(ahorro: AhorroModel): Promise<void>{
    const alert = await this.alert.create({
      header: 'Eliminar',
      message: 'Está seguro de eliminar el ahorro?',
      buttons: [{
        text: 'Si',
        handler: (__) => {
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

  filtrar(event: any){
    const value = event?.detail?.value;
    const options = {
      0: () => this.list = this.fullList,
      1: () => this.list = this.fullList.filter( i => !i.compartido),
      2: () => this.list = this.fullList.filter( i => i.compartido)
    };

    options[value]();
  }

}
