import { Component, OnInit } from '@angular/core';
import { AhorrosService } from 'src/app/services/ahorros.service';
import { ContactsService } from 'src/app/services/contacts.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  contadores: number[] = [];

  constructor(
    private contactos: ContactsService,
    private ahorros: AhorrosService,
    private storage: StorageService,
  ) {}

  ngOnInit() {
    this.getContadores();
  }

  async getContadores(){
    const { id: userId } = await this.storage.get('user');
    const [ahorros, deudas, contactos] = await Promise.all([
      ((await this.ahorros.getAll(1)).toPromise()),
      ((await this.ahorros.getAll(2)).toPromise()),
      this.contactos.getContacts(userId).toPromise(),
    ]);

    this.contadores = [
      (ahorros as any).length,
      (deudas as any).length,
      contactos.length
    ];


  }

}
