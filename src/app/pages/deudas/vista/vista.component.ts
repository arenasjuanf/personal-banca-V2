import { Component, Input, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { DeudasService } from 'src/app/services/deudas.service';
import { LoadingService } from 'src/app/services/loading.service';

@Component({
  selector: 'app-vista',
  templateUrl: './vista.component.html',
  styleUrls: ['../../ahorros/vista/vista.component.scss'],
})
export class VistaComponent implements OnInit {
  @Input() ahorro;
  datosAhorro: any;
  update = false;
  headerOptions: { startIcon: string; startFunction: () => void; endIcon: string; endFunction: () => any};

  constructor(
    public modalCtrl: ModalController,
    private deudasService: DeudasService,
    public alertController: AlertController,
    private loading: LoadingService
  ) {
    this.initHeaderOptions();
  }

  ngOnInit() {
    this.loading.show('Cargando deuda');
    this.getDeuda(this.ahorro.id);
  }

  initHeaderOptions(): void{
    this.headerOptions = {
      startIcon: '-',
      startFunction: () => {},
      endIcon: 'close',
      endFunction : () => this.modalCtrl.dismiss({update: this.update})
    };
  }

  async getDeuda(id: number): Promise<void>{
    const ahorro = await this.deudasService.getOne(id);
    ahorro.subscribe((result) => {
      this.datosAhorro = result;
      this.loading.hide();
    });
  }

  async showAddMonto(): Promise<void>{
    const alert = await this.alertController.create({
      header: 'Cuanto vas a abonar?',
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
    this.loading.show(`Agregando abono`);
    this.deudasService.addMonto(data).subscribe(({success}) => {
      if(success){
        this.update = true;
        this.getDeuda(this.datosAhorro.id);
      }
    });
  }

}
