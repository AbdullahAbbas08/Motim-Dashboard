import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GenericResponse } from '../Models/GenericResponse';
import { GetGovernorate } from '../Models/GetGovernorate';
import { environment } from '../../../environments/environment.prod';
import { InsertGovernorate } from '../Models/InsertGovernorate';
import { GenericResponseSingle } from '../Models/GenericResponseSingle';

@Injectable({
  providedIn: 'root'
})
export class GovernorateApiService {

  //#region Declare variables
  title:any;
  //#endregion
  
  //#region  constructor
  constructor(private http:HttpClient) { }
  //#endregion

    //#region Options
    httpOptionsWithTocken = { headers: new HttpHeaders({ 'Authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhaG1lZGFiZHVsbGFoMjUwIiwianRpIjoiZDIwZjU0MGUtMjhiNy00YmNjLWE4ZDgtNzkxNzA2YzJmZDRhIiwiZW1haWwiOiJhaG1lZGFiZHVsbGFoQHlhaG9vLmNvbSIsInVpZCI6IjBiMzg5N2FiLTQ2ZmMtNGM0Yy04MTYyLTRiNDExZTY4OWE1NCIsInJvbGVzIjoiVVNFUiIsImV4cCI6MTYzODM2OTM3NSwiaXNzIjoiU2VjdXJlQXBpIiwiYXVkIjoiU2VjdXJlQXBpVXNlciJ9.55LorE6Fclj3buy1Qw8wZ6CEe_ifW5jxwHe25wHRWsQ', 'Accept': ' */*' }) };
    //#endregion

    GetGovernorate(): Observable<GenericResponse<GetGovernorate>> {
      return this.http.get<GenericResponse<GetGovernorate>>(`${environment.Server_URL}/Region/regions`);
    }
  
    InsertGovernorate(Data:InsertGovernorate): Observable<GenericResponseSingle<GetGovernorate>> {
      return this.http.post<GenericResponseSingle<GetGovernorate>>(`${environment.Server_URL}/Region`,Data);
    }

    UpdateGovernorate(id:number,Data:InsertGovernorate): Observable<GenericResponseSingle<GetGovernorate>> {
      return this.http.post<GenericResponseSingle<GetGovernorate>>(`${environment.Server_URL}/Region/${id}`,Data);
    }

    DeleteGovernorate(ClientId:number): Observable<GenericResponseSingle<InsertGovernorate>> {
      return this.http.delete<GenericResponseSingle<InsertGovernorate>>(`${environment.Server_URL}/Region/${ClientId}`);
    }
}
