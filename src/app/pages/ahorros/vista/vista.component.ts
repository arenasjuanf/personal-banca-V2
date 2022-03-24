import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
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
    //
    ahorro.subscribe((result) => {
      console.log(result);
      this.datosAhorro = result;
    });
  }

}
