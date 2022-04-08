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
    console.log(this.currentLoading);
    this.currentLoading.present().then(() => {
      this.flagLoading.next(true);
    });
  }

  async hide(): Promise<void>{
    this.flagLoading.pipe(take(1)).toPromise().then(() => {
      timer(1000).subscribe(() => {
        this.currentLoading.dismiss();
        this.flagLoading.next(false);
      });
    });
  }

}
