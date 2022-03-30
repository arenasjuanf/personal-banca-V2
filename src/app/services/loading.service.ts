import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { BehaviorSubject, timer } from 'rxjs';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  private currentLoading;
  private flagLoading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

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
    this.flagLoading.next(true);

  }

  async hide(){
    this.flagLoading.pipe(take(1)).subscribe((value) => {
      this.currentLoading?.dismiss();
      this.flagLoading.next(false);
    });
  }

}
