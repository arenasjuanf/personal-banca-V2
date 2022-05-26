import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AuthPageRoutingModule } from './auth-routing.module';

import { AuthPage } from './auth.page';
import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';
import { LoadingService } from '../services/loading.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AuthPageRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    RxReactiveFormsModule
  ],
  declarations: [AuthPage],
  providers:[
    LoadingService
  ]
})
export class AuthPageModule {}
