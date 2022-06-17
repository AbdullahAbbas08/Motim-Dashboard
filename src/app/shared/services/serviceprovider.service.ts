import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Roles } from "../Models/Roles";


@Injectable({
  providedIn: 'root'
})
export class ServiceproviderService implements CanActivate {

  Token:string=localStorage.getItem('RiskAuthorization') as string
  role:string=localStorage.getItem('role') as string

  constructor(private router:Router) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    return this.checkifserviceProvider();
  }

  checkifserviceProvider(): boolean {
	  if (this.Token !='' && this.role == Roles.SERVICEPROVIDER) {
		return true;
	  }else{
      this.router.navigate(["/login"]);
      return false;
    }
  
	  // Navigate to the login page with extras
	  // this.router.navigate(["/login"]);
	  // return false;
	}

}
