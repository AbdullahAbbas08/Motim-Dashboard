import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GenericResponse } from '../Models/GenericResponse';
import { GetEmployee } from '../Models/GetEmployee';
import { environment } from '../../../environments/environment.prod';
import { GenericResponseSingle } from '../Models/GenericResponseSingle';
import { UpdateClient } from '../Models/UpdateClient';
import { Assign_ClientCustomer } from '../Models/Assign_ClientCustomer';
import { ResponseRegister } from '../Models/ResponseRegister';
import { IdName } from '../Models/IdName';
import { InsertCategory } from '../Models/InsertCategory';

@Injectable({
  providedIn: 'root'
})
export class EmployeeApiService {

     //#region Declare variables
     Employee:GetEmployee;

     //#endregion
     //#region  constructor
     
     constructor(private http:HttpClient) { }
     //#endregion
   
       //#region Options
       httpOptions = {
          headers: new HttpHeaders({ 
           //  'Authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhaG1lZGFiZHVsbGFoMjUwIiwianRpIjoiZDIwZjU0MGUtMjhiNy00YmNjLWE4ZDgtNzkxNzA2YzJmZDRhIiwiZW1haWwiOiJhaG1lZGFiZHVsbGFoQHlhaG9vLmNvbSIsInVpZCI6IjBiMzg5N2FiLTQ2ZmMtNGM0Yy04MTYyLTRiNDExZTY4OWE1NCIsInJvbGVzIjoiVVNFUiIsImV4cCI6MTYzODM2OTM3NSwiaXNzIjoiU2VjdXJlQXBpIiwiYXVkIjoiU2VjdXJlQXBpVXNlciJ9.55LorE6Fclj3buy1Qw8wZ6CEe_ifW5jxwHe25wHRWsQ', 
            'Accept': ' */*' 
           }) };
       //#endregion
   
       GetEmployee(role:string): Observable<GenericResponse<GetEmployee>> {
         return this.http.get<GenericResponse<GetEmployee>>(`${environment.Server_URL}/Employee?Role=${role}`);
       }

     
       GetClientRelated(id:string): Observable<GenericResponse<Assign_ClientCustomer>> {
         return this.http.get<GenericResponse<Assign_ClientCustomer>>(`${environment.Server_URL}/CustomerService?Toaken=${id}`);
       }

       GetClientsRelatedWithAgent(id:string): Observable<GenericResponse<IdName>> {
         return this.http.get<GenericResponse<IdName>>(`${environment.Server_URL}/CustomerService/GetClientsRelatedWithAgent?AgentID=${id}`);
       }
     
       InsertEmployee(data:InsertCategory): Observable<ResponseRegister> {
         return this.http.post<ResponseRegister>(`${environment.Server_URL}/Authentication/RegisterEmployee`,data,this.httpOptions);
       }

       AssignCustomerToClient(data:Assign_ClientCustomer[]): Observable<GenericResponseSingle<InsertCategory>> {
         return this.http.post<GenericResponseSingle<InsertCategory>>(`${environment.Server_URL}/CustomerService`,data,this.httpOptions);
       }
 
       UpdateEmployee(data:GetEmployee): Observable<GenericResponseSingle<GetEmployee>> {
         return this.http.put<GenericResponseSingle<GetEmployee>>(`${environment.Server_URL}/Employee`,data,this.httpOptions);
       }
   
       DeleteEmployee(id:string): Observable<GenericResponseSingle<InsertCategory>> {
         return this.http.delete<GenericResponseSingle<InsertCategory>>(`${environment.Server_URL}/Employee/${id}`);
       }
}
