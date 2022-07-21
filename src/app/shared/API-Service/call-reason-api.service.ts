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
      

      package:any;
      //#endregion
      
      //#region  constructor
      constructor(private http:HttpClient) { }
      //#endregion
    
        //#region Options
        httpOptionsWithTocken = { headers: new HttpHeaders({ 'Authorization': environment.Toaken, 'Accept': ' */*' }) };
        //#endregion
    
        GetCallReason(): Observable<GenericResponse<GetCallReason>> {
          return this.http.get<GenericResponse<GetCallReason>>(`${environment.Server_URL}/Package/dashboard`);
        }
        
        GetPackageWithId(id:any): Observable<any[]> {
          return this.http.get<any[]>(`${environment.Server_URL}/Package/${id}`);
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
    
        UpdateCallReason(id:number,Data:any): Observable<any> {
          return this.http.post<any>(`${environment.Server_URL}/Package/${id}`,Data);
        }
    
        DeleteCallReason(Id:number): Observable<GenericResponseSingle<any>> {
          return this.http.get<GenericResponseSingle<any>>(`${environment.Server_URL}/Package/${Id}`);
        }
        DeleteAllCategories(Id:number): Observable<GenericResponseSingle<any>> {
          return this.http.get<GenericResponseSingle<any>>(`${environment.Server_URL}/PackageCategory/Delete/${Id}`);
        }
}
