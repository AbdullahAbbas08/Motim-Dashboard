import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ReportsApiService } from 'src/app/shared/API-Service/reports-api.service';
import { GovernorateApiService } from 'src/app/shared/API-Service/governorate-api.service';
import { Client_Agent_Report } from 'src/app/shared/Models/Client_Agent_Report';
import { GenericResponse } from 'src/app/shared/Models/GenericResponse';
import { getCities } from 'src/app/shared/Models/getCities';
import { getCitiesWithGovernorate } from 'src/app/shared/Models/getCitiesWithGovernorate';
import { GetGovernorate } from 'src/app/shared/Models/GetGovernorate';
import Swal from 'sweetalert2';
import { IdName } from 'src/app/shared/Models/IdName';

@Component({
  selector: 'app-client-agent',
  templateUrl: './client-agent.component.html',
  styleUrls: ['./client-agent.component.css']
})
export class ClientAgentComponent implements OnInit {

  //#region  Declare Variables
  Filtered_List: getCities[];
  ClientList: IdName[];
  Client_Agent_Report: Client_Agent_Report[];

  //#endregion

  //#region constructor
  constructor( private ApiService: ReportsApiService,private router: Router) { }
  //#endregion

  //#region  ng OnInit
  ngOnInit(): void {
    this.Client_Id_Name();
  }
  //#endregion

  //#region Consume API's

  //#region  Get Client_Agent_Report
  GetClient_Agent_Report(id:number) {
    this.ApiService.Client_Agent_Report(id).subscribe(
      response => {
        this.Client_Agent_Report = response.data;
        console.log("qq : ", this.Client_Agent_Report)
      },
      err => {
        Swal.fire({
          icon: 'error',
          title: 'خطأ',
          text: err.error,
        })
      }
    )
  }
  //#endregion

  //#region  Get Client_Agent_Report
  Client_Id_Name() {
    this.ApiService.Client_Id_Name().subscribe(
      response => {
        this.ClientList = response.data;
        console.log("----- : ", this.ClientList)
      },
      err => {
        Swal.fire({
          icon: 'error',
          title: 'خطأ',
          text: err.error,
        })
      }
    )
  }
  //#endregion

  //#endregion

  //#region Selected Governorate
  SelectedChange(event: any) {
    this.GetClient_Agent_Report(event.target.value);
  }
  //#endregion


}
