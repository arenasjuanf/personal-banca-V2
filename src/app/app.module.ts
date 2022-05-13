import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { InAppBrowser } from '@awesome-cordova-plugins/in-app-browser/ngx';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';
import { HttpClientModule } from '@angular/common/http';
import { IonicStorageModule } from '@ionic/storage-angular';
import { Drivers } from '@ionic/storage';
import { environment } from 'src/environments/environment';
import { DatePipe } from './shared/pipes/date.pipe';
import { LoadingService } from './services/loading.service';
import { provideFirebaseApp, getApp, initializeApp } from '@angular/fire/app';



@NgModule({
  declarations: [AppComponent, DatePipe],
  entryComponents: [],
  // eslint-disable-next-line max-len
  imports: [
    provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
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
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    InAppBrowser,
    LoadingService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
