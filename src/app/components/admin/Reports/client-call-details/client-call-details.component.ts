import { Component, OnDestroy, OnInit  } from '@angular/core';
import { NavigationEnd, NavigationError, NavigationStart, Router } from '@angular/router';
import { ReportsApiService } from 'src/app/shared/API-Service/reports-api.service';
import { GovernorateApiService } from 'src/app/shared/API-Service/governorate-api.service';
import { Client_Agent_Report } from 'src/app/shared/Models/Client_Agent_Report';
import { GenericResponse } from 'src/app/shared/Models/GenericResponse';
import { getCities } from 'src/app/shared/Models/getCities';
import { getCitiesWithGovernorate } from 'src/app/shared/Models/getCitiesWithGovernorate';
import { GetGovernorate } from 'src/app/shared/Models/GetGovernorate';
import Swal from 'sweetalert2';
import { IdName } from 'src/app/shared/Models/IdName';
import { Client_Call_Report } from 'src/app/shared/Models/Client_Call_Report';

@Component({
  selector: 'app-client-call-details',
  templateUrl: './client-call-details.component.html',
  styleUrls: ['./client-call-details.component.css']
})
export class ClientCallDetailsComponent implements OnInit , OnDestroy {


  //#region  Declare Variables
  Client_Call_list:Client_Call_Report;
  //#endregion

  //#region constructor
  constructor( private router: Router) {
    // this.router.events.subscribe((event: any) => {
    //   if (event instanceof NavigationStart) {
    //       // Show loading indicator
    //   }

    //   if (event instanceof NavigationEnd) {
    //       // Hide loading indicator
    //       // 
    //       console.log("leave");
          
          
    //   }

    //   if (event instanceof NavigationError) {
    //       // Hide loading indicator

    //       // Present error to user
    //       console.log(event.error);
    //   }
  // });
   }
  ngOnDestroy(): void {
    localStorage.removeItem("clientcalldetail")
  }
  //#endregion

  //#region  ng OnInit
  ngOnInit(): void {
    this.Client_Call_list = JSON.parse(localStorage.getItem("clientcalldetail"))

  }
  //#endregion
}
