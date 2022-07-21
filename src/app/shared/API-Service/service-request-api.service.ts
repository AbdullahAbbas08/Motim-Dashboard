import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GenericResponse } from '../Models/GenericResponse';
import { environment } from '../../../environments/environment.prod';
import { GenericResponseSingle } from '../Models/GenericResponseSingle';
import { InsertSourceMarket } from '../Models/InsertSourceMarket';
import { GetServices } from '../Models/getServices';

@Injectable({
  providedIn: 'root'
})
export class ServiceRequestApiService {

          //#region Declare variables
        
          //#endregion
  
          service:any;
          
          //#region  constructor
          constructor(private http:HttpClient) { }
          //#endregion
        
            //#region Options
            httpOptionsWithTocken = { headers: new HttpHeaders({ 'Authorization': environment.Toaken, 'Accept': ' */*' }) };
            //#endregion
        
            Get(): Observable<any[]> {
              return this.http.get<any[]>(`${environment.Server_URL}/ServiceRequest`,this.httpOptionsWithTocken);
            }
            
            Get_ChatThread(): Observable<any[]> {
              return this.http.get<any[]>(`${environment.Server_URL}/ChatThread/provider`,this.httpOptionsWithTocken);
            }
            
            insert_ChatThread(data:any): Observable<any[]> {
              return this.http.post<any[]>(`${environment.Server_URL}/ChatThread`,data,this.httpOptionsWithTocken);
            }
            
            insert_Message(data:any): Observable<any[]> {
              return this.http.post<any[]>(`${environment.Server_URL}/Chat`,data,this.httpOptionsWithTocken);
            }
            
            get_Message_user(id:any): Observable<any[]> {
              return this.http.get<any[]>(`${environment.Server_URL}/Chat/user/${id}`,this.httpOptionsWithTocken);
            }

            SendMeaasge(data:any): Observable<any> {
              return this.http.post<any>(`${environment.Server_URL}/Chat`,data,this.httpOptionsWithTocken);
            }

            GetProfile(id:any): Observable<any> {
              return this.http.get<any>(`${environment.Server_URL}/User/profile/${id}`,this.httpOptionsWithTocken);
            }
  
            GetServiceById(id:number): Observable<any> {
              return this.http.get<any>(`${environment.Server_URL}/ServiceRequest?id=${id}`);
            }

            GetAttachmentById(id:any): Observable<any> {
              return this.http.get<any>(`${environment.Server_URL}/Attachment/detailes/${id}`,this.httpOptionsWithTocken);
            }

            Gethistory(id:any): Observable<any> {
              return this.http.get<any>(`https://motimappapi.wecancity.com/history/service/userId?userId=${id}`,this.httpOptionsWithTocken);
            }

            ServiceRequestComment(id:any): Observable<any> {
              return this.http.get<any>(`${environment.Server_URL}/ServiceRequestComment/${id}`,this.httpOptionsWithTocken);
            }
          
            // Insert(Data:any): Observable<GenericResponseSingle<GetServices>> {
            //   return this.http.post<GenericResponseSingle<any>>(`${environment.Server_URL}/Service`,Data);
            // }
        
            Update(id:any , data:any): Observable<any> {
              return this.http.post<any>(`${environment.Server_URL}/ServiceRequest/${id}`,data,this.httpOptionsWithTocken);
            }

            insertComment( data:any): Observable<any> {
              return this.http.post<any>(`${environment.Server_URL}/ServiceRequestComment`,data,this.httpOptionsWithTocken);
            }
        
            // Delete(Id:number): Observable<GenericResponseSingle<InsertSourceMarket>> {
            //   return this.http.delete<GenericResponseSingle<InsertSourceMarket>>(`${environment.Server_URL}/Service/${Id}`);
            // }
}
