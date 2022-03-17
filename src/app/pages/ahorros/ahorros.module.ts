import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AhorrosPageRoutingModule } from './ahorros-routing.module';

import { AhorrosPage } from './ahorros.page';
import { ComponentsModule } from 'src/app/components/components.module';
import { FormComponent } from './form/form.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AhorrosPageRoutingModule,
    ComponentsModule
  ],
  declarations: [AhorrosPage, FormComponent]
})
export class AhorrosPageModule {}
