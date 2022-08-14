import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { GenericResponse } from "../Models/GenericResponse";
import { GetCategories } from "../Models/GetCategories";
import { environment } from "../../../environments/environment.prod";
import { GenericResponseSingle } from "../Models/GenericResponseSingle";
import { UpdateClient } from "../Models/UpdateClient";
import { Assign_ClientCustomer } from "../Models/Assign_ClientCustomer";
import { ResponseRegister } from "../Models/ResponseRegister";
import { IdName } from "../Models/IdName";
import { InsertCategory } from "../Models/InsertCategory";

@Injectable({
  providedIn: "root",
})
export class CategoriesService {
  constructor(private http: HttpClient) { }
  
  Category: GetCategories;

  GetCategories(): Observable<GenericResponse<GetCategories>> {
    return this.http.get<GenericResponse<GetCategories>>(
      `${environment.Server_URL}/Categories/dashboard`
    );
  }
  
  GetCategoriesByName(name:string): Observable<GenericResponse<GetCategories>> {
    return this.http.get<GenericResponse<GetCategories>>(
      `${environment.Server_URL}/Categories/dashboard/search/${name}`
    );
  }
0
  GetClientRelated(
    id: string
  ): Observable<GenericResponse<Assign_ClientCustomer>> {
    return this.http.get<GenericResponse<Assign_ClientCustomer>>(
      `${environment.Server_URL}/CustomerService?Toaken=${id}`
    );
  }

  GetClientsRelatedWithAgent(id: string): Observable<GenericResponse<IdName>> {
    return this.http.get<GenericResponse<IdName>>(
      `${environment.Server_URL}/CustomerService/GetClientsRelatedWithAgent?AgentID=${id}`
    );
  }

  InsertEmployee(data: any): Observable<ResponseRegister> {
    return this.http.post<ResponseRegister>(
      `${environment.Server_URL}/Categories`,
      data
    );
  }

  AssignCustomerToClient(
    data: Assign_ClientCustomer[]
  ): Observable<GenericResponseSingle<InsertCategory>> {
    return this.http.post<GenericResponseSingle<InsertCategory>>(
      `${environment.Server_URL}/CustomerService`,
      data
    );
  }

  UpdateEmployee(
    id: any,
    data: any
  ): Observable<GenericResponseSingle<GetCategories>> {
    debugger
    return this.http.post<GenericResponseSingle<GetCategories>>(
      `${environment.Server_URL}/Categories/${id}`,
      data
    );
  }

  DeleteEmployee(
    id: string
  ): Observable<any> {
    return this.http.get<any>(
      `${environment.Server_URL}/Categories/delete/${id}`
    );
  }
}
