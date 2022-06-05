import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { GenericResponse } from "../Models/GenericResponse";
import { LoginResponse } from "../Models/LoginResponse";
import { environment } from "../../../environments/environment.prod";

@Injectable({
  providedIn: "root",
})
export class AuthenticationService {
  constructor(private http: HttpClient) {}

  RequestLogin(obj: any): Observable<GenericResponse<LoginResponse>> {
    return this.http.post<GenericResponse<LoginResponse>>(
      `${environment.Server_URL}/User/Login`,
      obj
    );
  }
}
