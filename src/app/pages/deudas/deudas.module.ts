import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DeudasPageRoutingModule } from './deudas-routing.module';

import { DeudasPage } from './deudas.page';
import { ComponentsModule } from 'src/app/components/components.module';
import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';
import { VistaComponent } from './vista/vista.component';
import { FormComponent } from './form/form.component';

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
  declarations: [DeudasPage,FormComponent, VistaComponent]
})
export class DeudasPageModule {}
