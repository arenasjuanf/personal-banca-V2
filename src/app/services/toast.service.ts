import { Injectable } from '@angular/core';
import { ToastController, ToastOptions } from '@ionic/angular';
import { Options } from 'selenium-webdriver';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(
    public toastController: ToastController
  ) { }


  async show(options: { header?: string; message: string; icon: string ; position?: string; duration?: number}) {
    const toast = await this.toastController.create({...options, animated: true, mode: 'ios'} as Partial<ToastOptions>);
    toast.present();
  }

}
