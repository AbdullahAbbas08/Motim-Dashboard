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
export class ReasonService {

     //#region  constructor
     constructor(private http:HttpClient) { }
     //#endregion
   
       //#region Options
       httpOptionsWithTocken = { headers: new HttpHeaders({ 'Authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhaG1lZGFiZHVsbGFoMjUwIiwianRpIjoiZDIwZjU0MGUtMjhiNy00YmNjLWE4ZDgtNzkxNzA2YzJmZDRhIiwiZW1haWwiOiJhaG1lZGFiZHVsbGFoQHlhaG9vLmNvbSIsInVpZCI6IjBiMzg5N2FiLTQ2ZmMtNGM0Yy04MTYyLTRiNDExZTY4OWE1NCIsInJvbGVzIjoiVVNFUiIsImV4cCI6MTYzODM2OTM3NSwiaXNzIjoiU2VjdXJlQXBpIiwiYXVkIjoiU2VjdXJlQXBpVXNlciJ9.55LorE6Fclj3buy1Qw8wZ6CEe_ifW5jxwHe25wHRWsQ', 'Accept': ' */*' }) };
       //#endregion
   
       Get(): Observable<any> {
         return this.http.get<any>(`${environment.Server_URL}/Reason`);
       }
       
      
       
       GetDepartment(id:any): Observable<any> {
         return this.http.get<any>(`${environment.Server_URL}/Reason?id=${id}`);
       }
    
       GetAllDepartment(): Observable<any> {
         return this.http.get<any>(`${environment.Server_URL}/Reason`);
       }
     
       Insert(Data:any): Observable<any> {
         return this.http.post<any>(`${environment.Server_URL}/Reason`,Data);
       }
   
       Update(id:any,Data:any): Observable<any> {
         return this.http.post<any>(`${environment.Server_URL}/Reason/${id}`,Data);
       }
   
       Delete(ClientId:any): Observable<any> {
         return this.http.get<any>(`${environment.Server_URL}/Reason/delete/${ClientId}`);
       }
}
