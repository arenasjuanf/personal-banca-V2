import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RecoverPassPageRoutingModule } from './recover-pass-routing.module';

import { RecoverPassPage } from './recover-pass.page';
import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RecoverPassPageRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    RxReactiveFormsModule
  ],
  declarations: [RecoverPassPage]
})
export class RecoverPassPageModule {}
