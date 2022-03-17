import { Component, OnInit } from '@angular/core';
import { AhorrosService } from 'src/app/services/ahorros.service';

@Component({
  selector: 'app-deudas',
  templateUrl: './deudas.page.html',
  styleUrls: ['./deudas.page.scss', './../ahorros/ahorros.page.scss'],
})
export class DeudasPage implements OnInit {

  list: any[];


  constructor(
    private deudas: AhorrosService
  ) {
    this.getDeudas();
  }

  ngOnInit() {
  }

  async getDeudas(){
    (await this.deudas.getAll(2)).subscribe((list: any) => {
      this.list = list;
    });
  }

}
