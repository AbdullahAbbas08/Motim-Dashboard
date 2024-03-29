// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: true,
  firebase: {
    apiKey: "Your Api Key",
    authDomain: "Your Auth Domain",
    databaseURL: "Your Database Url",
    projectId: "Your Project Id",
    storageBucket: "Your StorageBucket url",
    messagingSenderId: "Your Sender Id"
  },
  Server_URL:'https://motimdevapi.wecancity.com/api',
  // Server_URL:'http://localhost:55463/api',
  Server_Image_URL:'https://motimdevapi.wecancity.com/images/',
  Image:'../assets/images/dashboard',
  ErrorMessage_Header:"حدث خطأ فنى !!",
  ErrorMessage:"برجاء المحاولة مرة أخرى أول الإتصال بالدعم الفنى",
  Toaken:localStorage.getItem("token")


};
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
