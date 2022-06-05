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
import { CitiesApiService } from 'src/app/shared/API-Service/cities-api.service';
import { Client_Call_Report } from 'src/app/shared/Models/Client_Call_Report';
import { CallReasonApiService } from 'src/app/shared/API-Service/call-reason-api.service';
import { GetCallReason } from 'src/app/shared/Models/get-call-reason';
import { Client_Call_Report_input } from 'src/app/shared/Models/Client_Call_Report_input';

@Component({
  selector: 'app-client-call',
  templateUrl: './client-call.component.html',
  styleUrls: ['./client-call.component.css']
})
export class ClientCallComponent implements OnInit {

  //#region  Declare Variables
  Filtered_List: Client_Report[];
  ClientList: IdName[];
  Client_Report: Client_Report[];
  Client_Type_List: GetClientType[];
  Response_List: getCities[];
  CallReason_List: GetCallReason[];
  City_Filtered_List: getCities[];
  Governorate_List: GetGovernorate[];
  Client_Call_list:Client_Call_Report[];
  Client_Call_list_Filter:Client_Call_Report[];
  Client_Call_Report_input:Client_Call_Report_input;

  name:string = '';
  mobile:string = '';
  type:number = -1;
  reason:number = -1;
  govern:number = -1;
  city:number = -1;

  dateFrom:string ="";
  dateTo:string = "";

  //#endregion

  //#region constructor
  constructor( private ApiService: ReportsApiService,
                private router: Router ,  
                private clientTypeApiService: ClientTypeApiService,
                private citiesApiService: CitiesApiService,
                private governorateApiService: GovernorateApiService,
                private CallReasonService: CallReasonApiService,
                ) { }
  //#endregion

  //#region  ng OnInit
  ngOnInit(): void {

      this.Client_Call_Report_input={
        callDateFrom:this.dateFrom,
        callDateTo:this.dateTo,
        callReasons:this.reason,
        city:this.city,
        clientName:this.name,
        clientType:this.type,
        governorate:this.govern,
        mobile:this.mobile
      }

    this.getClientType() 
    this.GetClient_Report(null,null,-1) ; 
    // this.Get_Client_Call_Report();  
    this.getGovernoate();
    this.GetCities();
    this.GetCallReason();
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

  //#region  Get Call Reason
  GetCallReason() {
    this.CallReasonService.GetCallReason().subscribe(
      response => {
        this.CallReason_List = response.data;        
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

  //#region  Get Client_Report
  Get_Client_Call_Report(date:Client_Call_Report_input) {
    if(!(this.dateFrom =="" || this.dateTo == "")){
      this.ApiService.Client_Call_Report(date).subscribe(
        response => {
          this.Client_Call_list =response.data; 
          this.Client_Call_list_Filter =response.data; 
        //  console.log("res : ",this.Client_Call_list);
         
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
    else
    {
      Swal.fire({
        icon: 'error',
        title: 'خطأ',
        text: "أختر تاريخ بداية ونهاية المكالمات",
      })
    }
  }
  //#endregion

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

  //#region  get Governoate
  getGovernoate() {
    this.governorateApiService.GetGovernorate().subscribe(
      response => {
        this.Governorate_List = response.data;
        // response.data.forEach(element => {
        //   this.Governorate_List[element.id] = element.title;
        // });
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

  //#region  get Governoate
  GetCities() {
    this.citiesApiService.GetCitiesWithGovernorate().subscribe(
      (response:any) => {        
        this.Response_List = response.data;
        // this.City_Filtered_List = response.data;
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


  SelectedChange(event: any) {
    this.type = event.target.value;
    this.Client_Call_Report_input.clientType =  event.target.value;
    this.Get_Client_Call_Report(this.Client_Call_Report_input)
  }

    ClientNameChange(event){

      this.name = event.target.value;
      this.Client_Call_Report_input.clientName =  event.target.value;
      this.Get_Client_Call_Report(this.Client_Call_Report_input)
    }

    ClientMobileChange(event){
      this.mobile = event.target.value;
      this.Client_Call_Report_input.mobile =  event.target.value;
      this.Get_Client_Call_Report(this.Client_Call_Report_input)
     }

     CallReasonChange(event){
      this.reason = event.target.value;
      this.Client_Call_Report_input.callReasons =  event.target.value;
      this.Get_Client_Call_Report(this.Client_Call_Report_input)
     }

     governorateChange(event){
       this.City_Filtered_List = this.Response_List.filter(x=>x.regionId == event.target.value);
      this.govern = event.target.value;
      this.Client_Call_Report_input.governorate =  event.target.value;
      this.Get_Client_Call_Report(this.Client_Call_Report_input)
     }

     cityChange(event){
      this.city = event.target.value;
      this.Client_Call_Report_input.city =  event.target.value;
      this.Get_Client_Call_Report(this.Client_Call_Report_input)
     }
     
     datefromchange(event){
       this.dateFrom = event.target.value;
       this.Client_Call_Report_input.callDateFrom =  event.target.value;

      //  console.log(" this.dateFrom : ", this.Client_Call_Report_input.callDateFrom);

      if(this.dateTo !="")
      this.Get_Client_Call_Report(this.Client_Call_Report_input)
     }

     datetochange(event){
      this.dateTo = event.target.value;
      this.Client_Call_Report_input.callDateTo =  event.target.value;
      // console.log(" this.dateTo : ", this.Client_Call_Report_input.callDateTo);
      
      if(this.dateFrom !="")
      this.Get_Client_Call_Report(this.Client_Call_Report_input)
     }

     MoveDetail(){
       localStorage.setItem("clientcalldetail",JSON.stringify(this.Client_Call_list_Filter))
       this.router.navigateByUrl("/content/admin/client-call-detail");
     }
}
