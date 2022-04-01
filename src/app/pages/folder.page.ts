import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { StorageService } from '../services/storage.service';
import { Globals } from '../shared/globals';

@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
})
export class PagesPage implements OnInit {
  public folder: string;
  public userData: {nombre: string; email: string};

  public appPages: {
    title: string;
    url: string;
    icon: string;
  }[] = Globals.appPages;

  constructor(
    private activatedRoute: ActivatedRoute, 
    private storage: StorageService,
    public auth: AuthService
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
