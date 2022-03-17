import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
})
export class PagesPage implements OnInit {
  public folder: string;
  public userData: {nombre: string; email: string};

  public appPages = [
    { title: 'Home', url: '/pages/home', icon: 'home' },
    { title: 'Agregar', url: '/pages/agregar', icon: 'add' },
    { title: 'Ahorros', url: '/pages/ahorros', icon: 'wallet' },
    { title: 'Deudas', url: '/pages/deudas', icon: 'cash' },
    { title: 'Noticias', url: '/pages/noticias', icon: 'newspaper' },

  ];

  constructor(
    private activatedRoute: ActivatedRoute, 
    private storage: StorageService
  ) {
    this.getUserData();
  }

  ngOnInit() {
    this.folder = this.activatedRoute.snapshot.paramMap.get('id');
  }

  async getUserData(): Promise<void> {
    const { nombres, apellidos, email } = await this.storage.get('user');
    console.log({ nombres, apellidos, email });
    this.userData = {
      nombre: `${nombres} ${apellidos}`,
      email
    };

  }

}
