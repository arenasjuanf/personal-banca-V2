import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DeudasPageRoutingModule } from './deudas-routing.module';

import { DeudasPage } from './deudas.page';
import { ComponentsModule } from 'src/app/components/components.module';
import { FormComponent } from './form/form.component';
import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DeudasPageRoutingModule,
    ComponentsModule,
    RxReactiveFormsModule,
    ReactiveFormsModule
  ],
  declarations: [DeudasPage,FormComponent]
})
export class DeudasPageModule {}
