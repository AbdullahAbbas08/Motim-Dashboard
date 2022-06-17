import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GenericResponse } from '../Models/GenericResponse';
import { Client_Agent_Report } from '../Models/Client_Agent_Report';
import { environment } from '../../../environments/environment.prod';
import { GenericResponseSingle } from '../Models/GenericResponseSingle';
import { IdName } from '../Models/IdName';
import { Client_Report } from '../Models/Client_Report';
import { Client_Call_Report } from '../Models/Client_Call_Report';
import { Client_Call_Report_input } from '../Models/Client_Call_Report_input';

@Injectable({
  providedIn: 'root'
})
export class ReportsApiService {


  //#region Declare variables
  title:string;
  //#endregion
  
  //#region  constructor
  constructor(private http:HttpClient) { }
  //#endregion

    //#region Options
    httpOptionsWithTocken = { headers: new HttpHeaders({ 'Authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhaG1lZGFiZHVsbGFoMjUwIiwianRpIjoiZDIwZjU0MGUtMjhiNy00YmNjLWE4ZDgtNzkxNzA2YzJmZDRhIiwiZW1haWwiOiJhaG1lZGFiZHVsbGFoQHlhaG9vLmNvbSIsInVpZCI6IjBiMzg5N2FiLTQ2ZmMtNGM0Yy04MTYyLTRiNDExZTY4OWE1NCIsInJvbGVzIjoiVVNFUiIsImV4cCI6MTYzODM2OTM3NSwiaXNzIjoiU2VjdXJlQXBpIiwiYXVkIjoiU2VjdXJlQXBpVXNlciJ9.55LorE6Fclj3buy1Qw8wZ6CEe_ifW5jxwHe25wHRWsQ', 'Accept': ' */*' }) };
    //#endregion

    Client_Agent_Report(id:any): Observable<GenericResponse<Client_Agent_Report>> {
      return this.http.get<GenericResponse<Client_Agent_Report>>(`${environment.Server_URL}/CustomerService/GetAllAgentRelatedWithOneClient?id=${id}`);
    }
//ClientName=${ClientName}&Mobile=${Mobile}&
    Client_Report(ClientName:string ,Mobile:string,ClientType:number ): Observable<GenericResponse<Client_Report>> {
      return this.http.get<GenericResponse<Client_Report>>(`${environment.Server_URL}/Client/FilterWithRelatedTitles?ClientType=${ClientType}`);
    }

    Client_Id_Name(): Observable<GenericResponse<IdName>> {
      return this.http.get<GenericResponse<IdName>>(`${environment.Server_URL}/Client/GetAllIdName`);
    }

    Client_Call_Report(date:Client_Call_Report_input): Observable<GenericResponse<Client_Call_Report>> {
      return this.http.post<GenericResponse<Client_Call_Report>>(`${environment.Server_URL}/Admin/ClientCallReport`,date,this.httpOptionsWithTocken);
    }
  
}
