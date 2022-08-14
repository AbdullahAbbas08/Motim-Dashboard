import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GenericResponse } from '../Models/GenericResponse';
import { GetClientType } from '../Models/GetClientType';
import { environment } from '../../../environments/environment.prod';
import { InsertClientType } from '../Models/insert-client-type';
import { GenericResponseSingle } from '../Models/GenericResponseSingle';
import { getCities } from '../Models/getCities';
import { InsertCities } from '../Models/InsertCities';
import { getCitiesWithGovernorate } from '../Models/getCitiesWithGovernorate';

@Injectable({
  providedIn: 'root'
})
export class CitiesApiService {

    //#region Declare variables
    title:any;
    regionId:number;
    //#endregion
    
    //#region  constructor
    constructor(private http:HttpClient) { }
    //#endregion
  
      //#region Options
      httpOptionsWithTocken = { headers: new HttpHeaders({ 'Authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhaG1lZGFiZHVsbGFoMjUwIiwianRpIjoiZDIwZjU0MGUtMjhiNy00YmNjLWE4ZDgtNzkxNzA2YzJmZDRhIiwiZW1haWwiOiJhaG1lZGFiZHVsbGFoQHlhaG9vLmNvbSIsInVpZCI6IjBiMzg5N2FiLTQ2ZmMtNGM0Yy04MTYyLTRiNDExZTY4OWE1NCIsInJvbGVzIjoiVVNFUiIsImV4cCI6MTYzODM2OTM3NSwiaXNzIjoiU2VjdXJlQXBpIiwiYXVkIjoiU2VjdXJlQXBpVXNlciJ9.55LorE6Fclj3buy1Qw8wZ6CEe_ifW5jxwHe25wHRWsQ', 'Accept': ' */*' }) };
      //#endregion
  
      GetCities(): Observable<GenericResponse<getCities>> {
        return this.http.get<GenericResponse<getCities>>(`${environment.Server_URL}/City/cities`);
      }
     
      GetRegion(): Observable<any> {
        return this.http.get<any>(`${environment.Server_URL}/Region`);
      }

      GetCitiesWithGovernorate(): Observable<GenericResponse<getCitiesWithGovernorate>> {
        return this.http.get<GenericResponse<getCitiesWithGovernorate>>(`${environment.Server_URL}/City/cities`);
      }
    
      InsertCities(Data:InsertCities): Observable<GenericResponseSingle<getCities>> {
        return this.http.post<GenericResponseSingle<getCities>>(`${environment.Server_URL}/City`,Data);
      }
  
      UpdateCities(id:number,Data:any): Observable<GenericResponseSingle<getCities>> {
        return this.http.post<GenericResponseSingle<getCities>>(`${environment.Server_URL}/City/${id}`,Data);
      }
  
      DeleteCities(Id:number): Observable<any> {
        return this.http.get<any>(`${environment.Server_URL}/City/delete/${Id}`);
      }
}
