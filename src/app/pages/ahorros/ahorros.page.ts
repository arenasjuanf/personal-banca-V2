import { HttpErrorResponse } from '@angular/common/http';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertController, IonRouterOutlet, IonSegment, ModalController } from '@ionic/angular';
import { AhorroModel } from 'src/app/models/ahorro.model';
import { AhorrosService } from 'src/app/services/ahorros.service';
import { LoadingService } from 'src/app/services/loading.service';
import { ToastService } from 'src/app/services/toast.service';
import { Globals } from 'src/app/shared/globals';
import { FormComponent } from './form/form.component';
import { VistaComponent } from './vista/vista.component';

@Component({
  selector: 'app-ahorros',
  templateUrl: './ahorros.page.html',
  styleUrls: ['./ahorros.page.scss'],
})
export class AhorrosPage implements OnInit, AfterViewInit {
  @ViewChild('IonSegment') segment: IonSegment;
  public list: any[];
  public headerOptions: { endIcon: string; endFunction: () => void};
  public getTipoAhorro = Globals.getTipoAhorro;
  fullList: any;
  filterValue: number;

  constructor(
    private ahorros: AhorrosService,
    private modalCtrol: ModalController,
    private routerOutlet: IonRouterOutlet,
    private alert: AlertController,
    private loading: LoadingService,
    private toast: ToastService,
    private aRoute: ActivatedRoute
  ) {
    this.initHeaderOptions();

    this.aRoute.params.subscribe((params) => {
      if(params.create){
        this.openModalForm();
      }
    });
  }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    this.loading.show('Cargando ahorros');
    this.getAhorros();
  }

  async getAhorros(){
    (await this.ahorros.getAll(1)).subscribe((list: any) => {
      this.fullList = list;
      this.loading.hide();
      this.filtrar();
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
      this.loading.hide();
    },(except: HttpErrorResponse) => {
      const {error} = except;
      if (error.message.includes('Integrity constraint') ){
        this.toast.show({
          message: 'No se puede eliminar ahorro ya que está compartido',
          icon: 'close',
          duration: 1500
        });
        this.loading.hide();
      }
    });
  }

  filtrar(){

    const options = {
      0: () => this.list = this.fullList,
      1: () => this.list = this.fullList.filter( i => !i.compartido),
      2: () => this.list = this.fullList.filter( i => i.compartido)
    };

    options[this.segment.value || 0 ]();
  }

}
