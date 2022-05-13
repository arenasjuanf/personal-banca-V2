// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  urlServer: 'https://apparqueo.com/personalBancaBack2/public/api', //'http://127.0.0.1:8000/api',
  localDbName: '__personalBancaDB',
  newsKey: '641ea49d59d742dc96150ae569886319',
  newsUrl: 'https://newsapi.org/v2',
  firebaseConfig: {
    apiKey: 'AIzaSyBHms8w_KeojGgR2GMQzuoD30H4dg1sAeI',
    authDomain: 'personal-banca-web.firebaseapp.com',
    projectId: 'personal-banca-web',
    storageBucket: 'personal-banca-web.appspot.com',
    messagingSenderId: '701948993836',
    appId: '1:701948993836:web:6057f16dca5634b4f10c89'
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
