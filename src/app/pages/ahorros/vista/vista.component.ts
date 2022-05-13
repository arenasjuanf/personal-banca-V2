import { Component, Input, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { AhorrosService } from 'src/app/services/ahorros.service';
import { LoadingService } from 'src/app/services/loading.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-vista',
  templateUrl: './vista.component.html',
  styleUrls: ['./vista.component.scss'],
})
export class VistaComponent implements OnInit {
  @Input() ahorro;
  datosAhorro: any;
  update = false;
  headerOptions: { startIcon: string; startFunction: () => void; endIcon: string; endFunction: () => any};

  constructor(
    public modalCtrl: ModalController,
    private ahorroService: AhorrosService,
    public alertController: AlertController,
    private loading: LoadingService,
    private toast: ToastService
  ) {
    this.initHeaderOptions();
  }

  ngOnInit() {
    this.loading.show('Cargando ahorro');
    this.getAhorro(this.ahorro.id);
  }

  initHeaderOptions(): void{
    this.headerOptions = {
      startIcon: '-',
      startFunction: () => {},
      endIcon: 'close',
      endFunction : () => this.modalCtrl.dismiss({update: this.update})
    };
  }

  async getAhorro(id: number): Promise<void>{
    const ahorro = await this.ahorroService.getOne(id);
    ahorro.subscribe((result) => {
      this.datosAhorro = result;
      this.loading.hide();
    });
  }

  selectIntervalo(monto): void{
    const data = {
      id: monto.id, 
      chec: !monto.chec,
      idAhorro: this.datosAhorro.id,
      ahorrado: !monto.chec ? (this.datosAhorro.ahorrado + monto.valor) : (this.datosAhorro.ahorrado - monto.valor)
    };
    this.loading.show(`${monto.chec ? 'Quitando' : 'Agregando'} Intervalo`);
    this.ahorroService.selectIntervalo(data).subscribe(({success}) => {
      if(success){
        this.getAhorro(this.datosAhorro.id);
        this.update = true;
      }
    });
  }

  montoTrackBy(_, monto): void {
    return monto.id;
  }

  async showAddMonto(): Promise<void>{
    const alert = await this.alertController.create({
      header: 'Cuanto vas a ahorrar?',
      inputs: [
        {
          name: 'valor',
          type: 'number',
          placeholder: '$'
        }
      ],
      buttons: [{
        text: 'Aceptar',
        handler: ({valor}) => {
          if(valor){
            const { objetivo, ahorrado } = this.datosAhorro;
            if(valor  <= (objetivo-ahorrado)){
              this.addMonto(valor);
            }else{
              this.toast.show({
                message:'El monto ingresado sobrepasa el total del ahorro',
                icon: 'close',
                duration: 1500,
                position: 'bottom'
              });
            }
          }
        }
      },
      {
        role: 'cancel', text: 'Cancelar'
      }]
    });

    await alert.present();
  }

  addMonto(valor: number): void{
    const data = {
      monto: +valor,
      idAhorro: this.datosAhorro.id
    };
    this.loading.show(`Agregando monto`);
    this.ahorroService.addMonto(data).subscribe(({success}) => {
      if(success){
        this.update = true;
        this.getAhorro(this.datosAhorro.id);
      }
    });
  }

}
