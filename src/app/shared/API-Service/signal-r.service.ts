import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { HubConnection, HubConnectionBuilder, LogLevel } from '@microsoft/signalr';
import { environment } from '../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class SignalRService {


  private readonly http: HttpClient;
  // private readonly _baseUrl: string = "http://localhost:7071/api/";
  private readonly _baseUrl: string = environment.Server_URL;
  private hubConnection: HubConnection;
  messages: Subject<string> = new Subject();

  constructor(_http: HttpClient) {
    this.http = _http;
  }

  httpOptionsWithTocken = { headers: new HttpHeaders({ 'Authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiIxNzBkZTM1MS1mNDAxLTQxMmEtODJkOC03OTljM2JkYjUxNmMiLCJzdWIiOiIwMTAwMDk1NzI4Nzc4Iiwicm9sZXMiOiJDVVNUT01FUiIsImV4cCI6MTY1NDk3NTk5MiwiaXNzIjoiU2VjdXJlQXBpIiwiYXVkIjoiU2VjdXJlQXBpVXNlciJ9.5a3LGN5Rf24iXr79XzFYSYc9FH6pRKrDnw9FgpVcnOc', 'Accept': ' */*' }) };


  // private getConnectionInfo(): Observable<any> {
  //   let requestUrl = `${this._baseUrl}/ChatThread`;
  //   return this._http.get<any>(requestUrl);
  // }

  init() {
    // this.getConnectionInfo().subscribe((info) => {
    //   let options = {
    //     accessTokenFactory: () => info.accessToken,
    //   };

    //   this.hubConnection = new signalR.HubConnectionBuilder()
    //     .withUrl(info.url, options)
    //     .configureLogging(signalR.LogLevel.Information)
    //     .build();

    //   this.hubConnection.start().catch((err) => console.error(err.toString()));

    //   this.hubConnection.on("ChatThread", (data: any) => {
    //     this.messages.next(data);
    //   });
    // });
}
CraeteChatThread( data:any): Observable<any> {
  return this.http.post<any>(`${environment.Server_URL}/ChatThread`,data,this.httpOptionsWithTocken);
}
}
