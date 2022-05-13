/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/semi */
import { Component } from '@angular/core';

import { Plugins } from '@capacitor/core';
const  {StatusBar } = Plugins
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  constructor(
    private platform: Platform,
  ){
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      StatusBar.setBackgroundColor({color: '#195d9f'});
      // this.screenOrient.lock(this.screenOrient.ORIENTATIONS.PORTRAIT);
    })
  } 
}
