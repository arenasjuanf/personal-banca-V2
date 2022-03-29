import { Component, Input, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { AhorrosService } from 'src/app/services/ahorros.service';
import { LoadingService } from 'src/app/services/loading.service';

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
    private loading: LoadingService
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
            this.addMonto(valor);
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
