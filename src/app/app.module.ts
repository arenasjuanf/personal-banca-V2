import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';
import { HttpClientModule } from '@angular/common/http';
import { IonicStorageModule } from '@ionic/storage-angular';
import { Drivers } from '@ionic/storage';
import { environment } from 'src/environments/environment';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  // eslint-disable-next-line max-len
  imports: [
    BrowserModule,
    IonicModule.forRoot({
      swipeBackEnabled: false
    }),
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    RxReactiveFormsModule,
    HttpClientModule,
    IonicStorageModule.forRoot({
      name: environment.localDbName,
      driverOrder: [Drivers.IndexedDB, Drivers.LocalStorage]
    })
  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
