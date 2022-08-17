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
