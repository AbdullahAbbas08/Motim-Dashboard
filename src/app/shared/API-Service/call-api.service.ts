import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GenericResponse } from '../Models/GenericResponse';
import { environment } from '../../../environments/environment.prod';
import { GenericResponseSingle } from '../Models/GenericResponseSingle';
import { getCities } from '../Models/getCities';
import { GetCallReason } from '../Models/get-call-reason';
import { InsertCall } from '../Models/InsertCall';
import { GetCall } from '../Models/GetCall';
@Injectable({
  providedIn: 'root'
})
export class CallApiService {

      //#region Declare variables
      title:string;
      order:number;
      //#endregion
      
      //#region  constructor
      constructor(private http:HttpClient) { }
      //#endregion
    
        //#region Options
        httpOptionsWithTocken = { headers: new HttpHeaders({ 'Authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhaG1lZGFiZHVsbGFoMjUwIiwianRpIjoiZDIwZjU0MGUtMjhiNy00YmNjLWE4ZDgtNzkxNzA2YzJmZDRhIiwiZW1haWwiOiJhaG1lZGFiZHVsbGFoQHlhaG9vLmNvbSIsInVpZCI6IjBiMzg5N2FiLTQ2ZmMtNGM0Yy04MTYyLTRiNDExZTY4OWE1NCIsInJvbGVzIjoiVVNFUiIsImV4cCI6MTYzODM2OTM3NSwiaXNzIjoiU2VjdXJlQXBpIiwiYXVkIjoiU2VjdXJlQXBpVXNlciJ9.55LorE6Fclj3buy1Qw8wZ6CEe_ifW5jxwHe25wHRWsQ', 'Accept': ' */*' }) };
        //#endregion
    
        GetCall(): Observable<GenericResponse<GetCall>> {
          return this.http.get<GenericResponse<GetCall>>(`${environment.Server_URL}/Call`);
        }
      
        InsertCall(Data:InsertCall): Observable<GenericResponseSingle<GetCall>> {
          return this.http.post<GenericResponseSingle<GetCall>>(`${environment.Server_URL}/Call`,Data);
        }
    
        // CallReasonClientType(Data:any): Observable<any> {
        //   return this.http.post<any>(`${environment.Server_URL}/CallReasonClientType/CallReasonClientType`,Data);
        // }
    
        // UpdateCallReason(id:number,Data:InsertCall): Observable<GenericResponseSingle<getCities>> {
        //   return this.http.put<GenericResponseSingle<getCities>>(`${environment.Server_URL}/CallReason/${id}`,Data);
        // }
    
        DeleteCall(Id:number): Observable<GenericResponseSingle<InsertCall>> {
          return this.http.delete<GenericResponseSingle<InsertCall>>(`${environment.Server_URL}/CallReason/${Id}`);
        }
}
