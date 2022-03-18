import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AhorrosPageRoutingModule } from './ahorros-routing.module';

import { AhorrosPage } from './ahorros.page';
import { ComponentsModule } from 'src/app/components/components.module';
import { FormComponent } from './form/form.component';
import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AhorrosPageRoutingModule,
    ComponentsModule,
    RxReactiveFormsModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [AhorrosPage, FormComponent]
})
export class AhorrosPageModule {}
