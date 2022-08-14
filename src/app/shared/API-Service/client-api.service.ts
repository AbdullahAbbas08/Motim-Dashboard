import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GenericResponse } from '../Models/GenericResponse';
import { GetClient } from '../Models/GetClient';
import { environment } from '../../../environments/environment.prod';
import { InsertClient } from '../Models/InsertClient';
import { GenericResponseSingle } from '../Models/GenericResponseSingle';
import { UpdateClient } from '../Models/UpdateClient';

@Injectable({
  providedIn: 'root'
})
export class ClientApiService {

  //#region Declare variables
  Client: any;

  //#endregion
  //#region  constructor

  constructor(private http: HttpClient) { }
  //#endregion

  //#region Options
  // httpOptions = {
    // headers: new HttpHeaders({
      // 'Authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI1NWUxYTk1OS0wMjY4LTQyODEtOGNhNC1jNjFlZWU2ZTZjOWIiLCJzdWIiOiI5NjYwNTAxNTMyNDk1Iiwicm9sZXMiOiJDVVNUT01FUiIsImV4cCI6MTY1MjAxMTIzNiwiaXNzIjoiU2VjdXJlQXBpIiwiYXVkIjoiU2VjdXJlQXBpVXNlciJ9.app1HoV5sOeiHkpnuH2-5olCMQfgEm9q3wgjF3ONSpQ.55LorE6Fclj3buy1Qw8wZ6CEe_ifW5jxwHe25wHRWsQ',
      // 'Accept': ' */*'
    // }),
    // response: new HttpResponse({

    // })
  // };
  //#endregion

  httpOptionsWithTocken = { headers: new HttpHeaders({ 'Authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhaG1lZGFiZHVsbGFoMjUwIiwianRpIjoiZDIwZjU0MGUtMjhiNy00YmNjLWE4ZDgtNzkxNzA2YzJmZDRhIiwiZW1haWwiOiJhaG1lZGFiZHVsbGFoQHlhaG9vLmNvbSIsInVpZCI6IjBiMzg5N2FiLTQ2ZmMtNGM0Yy04MTYyLTRiNDExZTY4OWE1NCIsInJvbGVzIjoiVVNFUiIsImV4cCI6MTYzODM2OTM3NSwiaXNzIjoiU2VjdXJlQXBpIiwiYXVkIjoiU2VjdXJlQXBpVXNlciJ9.55LorE6Fclj3buy1Qw8wZ6CEe_ifW5jxwHe25wHRWsQ', 'Accept': ' */*' }) };


  GetClient(): Observable<GenericResponse<GetClient>> {
    return this.http.get<GenericResponse<GetClient>>(`${environment.Server_URL}/ImageReference`);
  }

  GetClientIdName(): Observable<GenericResponse<GetClient>> {
    return this.http.get<GenericResponse<GetClient>>(`${environment.Server_URL}/Client/GetAllIdName`);
  }

  InsertClient(form: any): Observable<GenericResponseSingle<any>> {
    
    return this.http.post<GenericResponseSingle<any>>(`${environment.Server_URL}/ImageReference`, form);
  }

  InsertServiceProvider(form: any): Observable<any> {
    
    return this.http.post<any>(`${environment.Server_URL}/User/register/administrators`, form);
  }

  UpdateClient(id: string, form: any): Observable<GenericResponseSingle<any>> {
    
    return this.http.post<GenericResponseSingle<any>>(`${environment.Server_URL}/ImageReference/${id}`, form);
  }

  DeleteClient(ClientId: string): Observable<any> {
    return this.http.get<any>(`${environment.Server_URL}/ImageReference/delete/${ClientId}`);
  }
}
