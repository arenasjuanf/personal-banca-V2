import { Component, Input, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { AhorroModel } from 'src/app/models/ahorro.model';
import { AhorrosService } from 'src/app/services/ahorros.service';
import { TimeService } from 'src/app/services/time.service';

@Component({
  selector: 'app-vista',
  templateUrl: './vista.component.html',
  styleUrls: ['./vista.component.scss'],
})
export class VistaComponent implements OnInit {
  @Input() ahorro;
  datosAhorro: any;
  headerOptions: { startIcon: string; startFunction: () => void; endIcon: string; endFunction: () => any; };
  constructor(
    public modalCtrl: ModalController,
    private ahorroService: AhorrosService,
    public alertController: AlertController
  ) {
    this.initHeaderOptions();
  }

  ngOnInit() {
    this.getAhorro(this.ahorro.id);
  }

  initHeaderOptions(){
    this.headerOptions = {
      startIcon: '-',
      startFunction: () => {},
      endIcon: 'close',
      endFunction : () => this.modalCtrl.dismiss()
    };
  }

  async getAhorro(id: number): Promise<void>{
    const ahorro = await this.ahorroService.getOne(id);
    ahorro.subscribe((result) => {
      console.log(result);
      this.datosAhorro = result;
    });
  }

  selectIntervalo(monto): void{
    const data = {
      id: monto.id, 
      chec: !monto.chec,
      idAhorro: this.datosAhorro.id,
      ahorrado: !monto.chec ? (this.datosAhorro.ahorrado + monto.valor) : (this.datosAhorro.ahorrado - monto.valor)
    };

    this.ahorroService.selectIntervalo(data).subscribe(({success}) => {
      if(success){
        this.getAhorro(this.datosAhorro.id);
      }
    });
  }

  montoTrackBy(_, monto): void {
    return monto.id;
  }

  async showAddMonto(){
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

  addMonto(valor: number){
    const data = {
      monto: +valor,
      idAhorro: this.datosAhorro.id
    };

    this.ahorroService.addMonto(data).subscribe(console.log);
  }

}
