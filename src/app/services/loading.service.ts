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

  async show(message: string = 'Por favor espere '): Promise<void> {
    this.currentLoading = await this.loadingController.create({
      message,
      cssClass: 'my-custom-class',
    });
    this.currentLoading.present().then(() => {
      this.flagLoading.next(true);
    });
  }

  async hide(): Promise<void>{
    this.flagLoading.pipe(take(1)).toPromise().then(() => {
      console.log(this.currentLoading);
      this.flagLoading.next(false);
      this.currentLoading.dismiss();
    });
  }

}
