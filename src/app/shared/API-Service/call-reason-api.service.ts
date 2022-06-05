import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GenericResponse } from '../Models/GenericResponse';
import { environment } from '../../../environments/environment.prod';
import { GenericResponseSingle } from '../Models/GenericResponseSingle';
import { getCities } from '../Models/getCities';
import { GetCallReason } from '../Models/get-call-reason';
import { InsertCallReason } from '../Models/insert-call-reason';
@Injectable({
  providedIn: 'root'
})
export class CallReasonApiService {

      //#region Declare variables
      title:string;
      order:number;

      package:GetCallReason;
      //#endregion
      
      //#region  constructor
      constructor(private http:HttpClient) { }
      //#endregion
    
        //#region Options
        httpOptionsWithTocken = { headers: new HttpHeaders({ 'Authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhaG1lZGFiZHVsbGFoMjUwIiwianRpIjoiZDIwZjU0MGUtMjhiNy00YmNjLWE4ZDgtNzkxNzA2YzJmZDRhIiwiZW1haWwiOiJhaG1lZGFiZHVsbGFoQHlhaG9vLmNvbSIsInVpZCI6IjBiMzg5N2FiLTQ2ZmMtNGM0Yy04MTYyLTRiNDExZTY4OWE1NCIsInJvbGVzIjoiVVNFUiIsImV4cCI6MTYzODM2OTM3NSwiaXNzIjoiU2VjdXJlQXBpIiwiYXVkIjoiU2VjdXJlQXBpVXNlciJ9.55LorE6Fclj3buy1Qw8wZ6CEe_ifW5jxwHe25wHRWsQ', 'Accept': ' */*' }) };
        //#endregion
    
        GetCallReason(): Observable<GenericResponse<GetCallReason>> {
          return this.http.get<GenericResponse<GetCallReason>>(`${environment.Server_URL}/Package/dashboard`);
        }
        GetPackageByName(name:string): Observable<GenericResponse<GetCallReason>> {
          return this.http.get<GenericResponse<GetCallReason>>(`${environment.Server_URL}/Package/search/${name}`);
        }
        GetReasonsRelatedWithClientType(ClientId:string): Observable<GenericResponse<GetCallReason>> {
          return this.http.get<GenericResponse<GetCallReason>>(`${environment.Server_URL}/CallReasonClientType/GetReasonsRelatedWithClientType?ClientID=${ClientId}`);
        }
      
        InsertCallReason(Data:any): Observable<GenericResponseSingle<GetCallReason>> {
          return this.http.post<GenericResponseSingle<GetCallReason>>(`${environment.Server_URL}/Package`,Data);
        }
    
        CallReasonClientType(Data:any): Observable<any> {
          return this.http.post<any>(`${environment.Server_URL}/PackageCategory`,Data);
        }
    
        UpdateCallReason(id:number,Data:any): Observable<GenericResponseSingle<any>> {
          return this.http.put<GenericResponseSingle<getCities>>(`${environment.Server_URL}/Package/${id}`,Data);
        }
    
        DeleteCallReason(Id:number): Observable<GenericResponseSingle<any>> {
          return this.http.delete<GenericResponseSingle<any>>(`${environment.Server_URL}/Package/${Id}`);
        }
        DeleteAllCategories(Id:number): Observable<GenericResponseSingle<any>> {
          return this.http.delete<GenericResponseSingle<any>>(`${environment.Server_URL}/PackageCategory/Delete/${Id}`);
        }
}
