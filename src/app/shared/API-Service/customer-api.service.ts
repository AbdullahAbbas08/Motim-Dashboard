import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GenericResponseSingle } from '../Models/GenericResponseSingle';
import { environment } from '../../../environments/environment.prod';


@Injectable({
  providedIn: 'root'
})
export class CustomerApiService {

    //#region Declare variables
    title:string;
    CustomerData:any;
    mobile:string;
    //#endregion
    
    //#region  constructor
    constructor(private http:HttpClient) { }
    //#endregion
  
      //#region Options
      httpOptionsWithTocken = { headers: new HttpHeaders({ 'Authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhaG1lZGFiZHVsbGFoMjUwIiwianRpIjoiZDIwZjU0MGUtMjhiNy00YmNjLWE4ZDgtNzkxNzA2YzJmZDRhIiwiZW1haWwiOiJhaG1lZGFiZHVsbGFoQHlhaG9vLmNvbSIsInVpZCI6IjBiMzg5N2FiLTQ2ZmMtNGM0Yy04MTYyLTRiNDExZTY4OWE1NCIsInJvbGVzIjoiVVNFUiIsImV4cCI6MTYzODM2OTM3NSwiaXNzIjoiU2VjdXJlQXBpIiwiYXVkIjoiU2VjdXJlQXBpVXNlciJ9.55LorE6Fclj3buy1Qw8wZ6CEe_ifW5jxwHe25wHRWsQ', 'Accept': ' */*' }) };
      //#endregion
  
      GetCustomerById(phone:string): Observable<GenericResponseSingle<any>> {
        return this.http.get<GenericResponseSingle<any>>(`${environment.Server_URL}/Customer/GetCustomer?phone=${phone}`);
      }

      GetCustomerPhones(id:string): Observable<GenericResponseSingle<any>> {
        return this.http.get<GenericResponseSingle<any>>(`${environment.Server_URL}/Customer/GetCustomerPhones?id=${id}`);
      }
    
      InsertCustomer(Data:any): Observable<GenericResponseSingle<any>> {
        return this.http.post<GenericResponseSingle<any>>(`${environment.Server_URL}/Customer`,Data);
      }

      InsertCustomerPhones(Data:any): Observable<GenericResponseSingle<any>> {
        return this.http.post<GenericResponseSingle<any>>(`${environment.Server_URL}/Customer/CustomerPhones`,Data);
      }
}
