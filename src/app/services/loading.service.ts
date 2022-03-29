import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { timer } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  private currentLoading;

  constructor(
    public loadingController: LoadingController
  ) {
  }

  async show(message: string = 'Por favor espere '){
    this.currentLoading = await this.loadingController.create({
      message,
      cssClass: 'my-custom-class',
    });
    await this.currentLoading.present();
  }

  hide(){
    timer(1000).subscribe(() => {
      this.currentLoading?.dismiss();
    });
  }

}
