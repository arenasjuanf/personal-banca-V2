import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegisterPageRoutingModule } from './register-routing.module';

import { RegisterPage } from './register.page';
import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';
import { ToastService } from 'src/app/services/toast.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegisterPageRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    RxReactiveFormsModule
  ],
  declarations: [RegisterPage],
  providers:[
    ToastService
  ]
})
export class RegisterPageModule {}
