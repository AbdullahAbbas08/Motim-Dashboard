import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GenericResponse } from '../Models/GenericResponse';
import { GetClientType } from '../Models/GetClientType';
import { environment } from '../../../environments/environment.prod';
import { InsertClientType } from '../Models/insert-client-type';
import { GenericResponseSingle } from '../Models/GenericResponseSingle';


@Injectable({
  providedIn: 'root'
})
export class ClientTypeApiService {

  //#region Declare variables
  title:string;
  //#endregion
  //#region  constructor
  constructor(private http:HttpClient) { }
  //#endregion

    //#region Options
    httpOptionsWithTocken = { headers: new HttpHeaders({ 'Authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhaG1lZGFiZHVsbGFoMjUwIiwianRpIjoiZDIwZjU0MGUtMjhiNy00YmNjLWE4ZDgtNzkxNzA2YzJmZDRhIiwiZW1haWwiOiJhaG1lZGFiZHVsbGFoQHlhaG9vLmNvbSIsInVpZCI6IjBiMzg5N2FiLTQ2ZmMtNGM0Yy04MTYyLTRiNDExZTY4OWE1NCIsInJvbGVzIjoiVVNFUiIsImV4cCI6MTYzODM2OTM3NSwiaXNzIjoiU2VjdXJlQXBpIiwiYXVkIjoiU2VjdXJlQXBpVXNlciJ9.55LorE6Fclj3buy1Qw8wZ6CEe_ifW5jxwHe25wHRWsQ', 'Accept': ' */*' }) };
    //#endregion

    GetClientType(): Observable<GenericResponse<GetClientType>> {
      return this.http.get<GenericResponse<GetClientType>>(`${environment.Server_URL}/ClientType`);
    }

    GetClientTypeById(id:number): Observable<GenericResponse<any>> {
      return this.http.get<GenericResponse<any>>(`${environment.Server_URL}/PackageCategory/${id}`);
    }
  
    InsertClientType(Data:InsertClientType): Observable<GenericResponseSingle<InsertClientType>> {
      return this.http.post<GenericResponseSingle<InsertClientType>>(`${environment.Server_URL}/ClientType`,Data);
    }

    UpdateClientType(id:number,Data:InsertClientType): Observable<GenericResponseSingle<GetClientType>> {
      return this.http.put<GenericResponseSingle<GetClientType>>(`${environment.Server_URL}/ClientType/${id}`,Data);
    }

    DeleteClientType(ClientId:number): Observable<GenericResponseSingle<InsertClientType>> {
      return this.http.delete<GenericResponseSingle<InsertClientType>>(`${environment.Server_URL}/ClientType/${ClientId}`);
    }
}
