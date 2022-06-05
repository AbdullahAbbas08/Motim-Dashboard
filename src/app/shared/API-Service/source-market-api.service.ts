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
export class SourceMarketApiService {

        //#region Declare variables
        title:string;
        order:number;
        //#endregion

        service:any;
        
        //#region  constructor
        constructor(private http:HttpClient) { }
        //#endregion
      
          //#region Options
          httpOptionsWithTocken = { headers: new HttpHeaders({ 'Authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhaG1lZGFiZHVsbGFoMjUwIiwianRpIjoiZDIwZjU0MGUtMjhiNy00YmNjLWE4ZDgtNzkxNzA2YzJmZDRhIiwiZW1haWwiOiJhaG1lZGFiZHVsbGFoQHlhaG9vLmNvbSIsInVpZCI6IjBiMzg5N2FiLTQ2ZmMtNGM0Yy04MTYyLTRiNDExZTY4OWE1NCIsInJvbGVzIjoiVVNFUiIsImV4cCI6MTYzODM2OTM3NSwiaXNzIjoiU2VjdXJlQXBpIiwiYXVkIjoiU2VjdXJlQXBpVXNlciJ9.55LorE6Fclj3buy1Qw8wZ6CEe_ifW5jxwHe25wHRWsQ', 'Accept': ' */*' }) };
          //#endregion
      
          Get(): Observable<GenericResponse<GetServices>> {
            return this.http.get<GenericResponse<GetServices>>(`${environment.Server_URL}/Service/services`);
          }

          GetServiceById(id:number): Observable<GenericResponse<GetServices>> {
            return this.http.get<GenericResponse<GetServices>>(`${environment.Server_URL}/Service/services?id=${id}`);
          }
        
          Insert(Data:any): Observable<GenericResponseSingle<GetServices>> {
            return this.http.post<GenericResponseSingle<any>>(`${environment.Server_URL}/Service`,Data);
          }
      
          Update(id:number,Data:any): Observable<GenericResponseSingle<any>> {
            return this.http.put<GenericResponseSingle<any>>(`${environment.Server_URL}/Service/${id}`,Data);
          }
      
          Delete(Id:number): Observable<GenericResponseSingle<InsertSourceMarket>> {
            return this.http.delete<GenericResponseSingle<InsertSourceMarket>>(`${environment.Server_URL}/Service/${Id}`);
          }
}
