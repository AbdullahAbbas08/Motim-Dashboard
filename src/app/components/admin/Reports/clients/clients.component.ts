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
import { ClientTypeApiService } from 'src/app/shared/API-Service/client-type-api.service';
import { GetClientType } from 'src/app/shared/Models/GetClientType';
import { Client_Report } from 'src/app/shared/Models/Client_Report';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit {
  //#region  Declare Variables
  Filtered_List: Client_Report[];
  ClientList: IdName[];
  Client_Report: Client_Report[];
  Client_Type_List: GetClientType[];
  name:string = '';
  mobile:string = '';
  type:number = -1;

  //#endregion

  //#region constructor
  constructor( private ApiService: ReportsApiService,private router: Router ,  private clientTypeApiService: ClientTypeApiService,) { }
  //#endregion

  //#region  ng OnInit
  ngOnInit(): void {

    this.getClientType() 
    this.GetClient_Report(null,null,-1) ;   
  }
  //#endregion

  //#region Consume API's

  //#region  Get Client_Report
  GetClient_Report(name:string=undefined,mobile:string=undefined,type:number=-1 ) {
    this.ApiService.Client_Report(name,mobile,type).subscribe(
      response => {
        this.Client_Report = response.data;
        this.Filtered_List = response.data;
      },
      err => {
        console.log(err);
        
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

  //#region Selected Change => Client Type
  SelectedChange(event: any) {
    // this.GetClient_Agent_Report(event.target.value);
    this.type = event.target.value;

    console.log("name : ",this.name);
    console.log("mobile : ",this.mobile);
    console.log("type : ",this.type);
    

    if(event.target.value == -1)
      this.Filtered_List = this.Client_Report;
    else
      this.Filtered_List = this.Client_Report.filter(x=>x.clientTypeId == this.type && x.name.includes(this.name) && x.mobile.includes(this.mobile))
  }
  //#endregion

    //#region  Get Client Types
    getClientType() {
      this.clientTypeApiService.GetClientType().subscribe(
        response => {
          // this.response = response;
          this.Client_Type_List = response.data;
  
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

    ClientNameChange(event){

      this.name = event.target.value;

      console.log("name : ",this.name);
      console.log("mobile : ",this.mobile);
      console.log("type : ",this.type);

      if(this.type !=-1)
        this.Filtered_List = this.Client_Report.filter(x=>x.clientTypeId == this.type && x.name.includes(this.name) && x.mobile.includes(this.mobile))
      else
        this.Filtered_List = this.Client_Report.filter(x=>x.name.includes(this.name) && x.mobile.includes(this.mobile))
    }

    ClientMobileChange(event){
      this.mobile = event.target.value;

      console.log("name : ",this.name);
      console.log("mobile : ",this.mobile);
      console.log("type : ",this.type);

      if(this.type !=-1)
      this.Filtered_List = this.Client_Report.filter(x=>x.clientTypeId == this.type && x.name.includes(this.name) && x.mobile.includes(this.mobile))
    else
      this.Filtered_List = this.Client_Report.filter(x=>x.name.includes(this.name) && x.mobile.includes(this.mobile))   
     }
}
