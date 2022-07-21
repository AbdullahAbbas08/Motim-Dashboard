import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { HubConnection, HubConnectionBuilder, LogLevel } from '@microsoft/signalr';
import { environment } from '../../../environments/environment';
import * as signalR from '@microsoft/signalr';


@Injectable({
  providedIn: 'root'
})
export class SignalRService {


  private readonly http: HttpClient;
  // private readonly _baseUrl: string = "http://localhost:7071/api/";
  private readonly _baseUrl: string = environment.Server_URL;
  messages: Subject<string> = new Subject();

  constructor(_http: HttpClient) {
    this.http = _http;
  }

  httpOptionsWithTocken = { headers: new HttpHeaders({ 'Authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiIxNzBkZTM1MS1mNDAxLTQxMmEtODJkOC03OTljM2JkYjUxNmMiLCJzdWIiOiIwMTAwMDk1NzI4Nzc4Iiwicm9sZXMiOiJDVVNUT01FUiIsImV4cCI6MTY1NDk3NTk5MiwiaXNzIjoiU2VjdXJlQXBpIiwiYXVkIjoiU2VjdXJlQXBpVXNlciJ9.5a3LGN5Rf24iXr79XzFYSYc9FH6pRKrDnw9FgpVcnOc', 'Accept': ' */*' }) };

CraeteChatThread( data:any): Observable<any> {
  return this.http.post<any>(`${environment.Server_URL}/ChatThread`,data,this.httpOptionsWithTocken);
}

hubConnection:signalR.HubConnection;

startConnection = () => {
    this.hubConnection = new signalR.HubConnectionBuilder()
    .withUrl('https://motimappapi.wecancity.com/chatsocket', {
        skipNegotiation: true,
        transport: signalR.HttpTransportType.WebSockets
    })
    .build();

    this.hubConnection
    .start()
    .then(() => {
        console.log('Hub Connection Started!');
    })
    .catch(err => console.log('Error while starting connection: ' + err))
}


askServer() {
    this.hubConnection.invoke("ChatMsg", "hi")
        .catch(err => console.log("err"));
}

askServerListener() {
    this.hubConnection.on("ChatMsg", (someText) => {
        console.log(someText);
        console.log("success");
        
    })
}


}
