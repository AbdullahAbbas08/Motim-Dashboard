import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CallApiService } from 'src/app/shared/API-Service/call-api.service';
import { CitiesApiService } from 'src/app/shared/API-Service/cities-api.service';
import { CustomerApiService } from 'src/app/shared/API-Service/customer-api.service';
import { EmployeeApiService } from 'src/app/shared/API-Service/employee-api.service';
import { GovernorateApiService } from 'src/app/shared/API-Service/governorate-api.service';
import { SourceMarketApiService } from 'src/app/shared/API-Service/source-market-api.service';
import { GenericResponse } from 'src/app/shared/Models/GenericResponse';
import { GetCallReason } from 'src/app/shared/Models/get-call-reason';
import { GetServices } from 'src/app/shared/Models/getServices';
import { getCities } from 'src/app/shared/Models/getCities';
import { GetEmployee } from 'src/app/shared/Models/GetEmployee';
import { GetGovernorate } from 'src/app/shared/Models/GetGovernorate';
import { InsertClientType } from 'src/app/shared/Models/insert-client-type';
import * as moment from 'moment';
import { Roles } from 'src/app/shared/Models/Roles';
import Swal from 'sweetalert2';
import { InsertCall } from 'src/app/shared/Models/InsertCall';
import { CallReasonApiService } from 'src/app/shared/API-Service/call-reason-api.service';

@Component({
  selector: 'app-deal-with-customer',
  templateUrl: './deal-with-customer.component.html',
  styleUrls: ['./deal-with-customer.component.css']
})
export class DealWithCustomerComponent implements OnInit {

  //#region Decalre varaibles
  EmployeeForm: FormGroup;
  Form: FormGroup;
  _InsertClientType:InsertClientType;
  maxDate: Date;
  update:boolean;
  pass:string;
  Governorate_Dictionary:{[Id:number]:string} = {}
  Governorate_List:GetGovernorate[];
  Govern_id:number;
  Governorate:string;
  City:string;
  response: any;
  Response_List: getCities[];
  Filtered_List: getCities[];
  CityId:number;
  Gender:number;
  CallReason_List: GetCallReason[];
  SourceMarket_List: GetServices[];
  start_Call :any;
  End_Call :any;
  _InsertCall:InsertCall;
  satis:boolean;

  //#endregion

  //#region  constructor
  constructor(private _formBuilder: FormBuilder,
              private toaster: ToastrService,
              private ApiService:EmployeeApiService,
              private governorateApiService:GovernorateApiService,
              private citiesApiService: CitiesApiService,
              private customerApiService: CustomerApiService,
              private callApiService: CallApiService,
              private callReasonApiService: CallReasonApiService,
              private sourceMarketApiService: SourceMarketApiService,
              private router:Router,
              private route: ActivatedRoute) 
  { 
    this.maxDate = new Date();

    this.sourceMarketGet();
    

   }
  //#endregion

  //#region  ng OnInit
  ngOnInit(): void {
    this.satis = false;
    this._InsertCall = new InsertCall();
    this.Response_List = [];
    this.getGovernoate();
    this.GetCallReason(this.route.snapshot.paramMap.get('id'));
    this.InitCallForm();

    // if(this.customerApiService.CustomerData != null){

    //   this.InitForm(this.ApiService.Employee)
    //   this.update = true;
    // }else
    // {
      this.update = false;
      this._InitForm();
      this.Governorate = "أختر المحافظة";
      this.City = "أختر المدينة";
    // }
    this._InsertCall.StartCall = new Date().toLocaleDateString()  +" "+ new Date().toLocaleTimeString();

  }
  //#endregion

  // #region  Init Form
  InitForm(data:any){
    // console.log("n : ",this.customerApiService.CustomerData["name"]);
    
    this.EmployeeForm = this._formBuilder.group({
      name: [this.customerApiService.CustomerData["name"], Validators.required],
      Gender: [this.customerApiService.CustomerData["gender"]== 1 ? "ذكر":"أنثى" , Validators.required],
      DateOfBirth: [this.customerApiService.CustomerData["dateOfBirth"], Validators.required],
      CityId: [, Validators.required],
      mobile: [, Validators.required],
      mobile2: [, Validators.required],
      phone: [, Validators.required],
      address: [, Validators.required],
    });
  }

  _InitForm(){
    this.EmployeeForm = this._formBuilder.group({
      name: [, Validators.nullValidator],
      Gender: [, Validators.nullValidator],
      DateOfBirth: [, Validators.nullValidator],
      CityId: [, Validators.nullValidator],
      mobile: [ this.customerApiService.mobile, Validators.required],
      address: [, Validators.nullValidator],
      mobile2: [, Validators.nullValidator],
      phone: [, Validators.nullValidator],
    });
  }

  InitCallForm(){
    this.Form = this._formBuilder.group({
      reason: [, Validators.required],
      callType: [, Validators.required],
      description: [ , Validators.nullValidator],
      notes: [, Validators.nullValidator],
      // callType: [, Validators.required],
      sourceMarketId: [, Validators.nullValidator],
      satisfy: [, Validators.nullValidator],
      // start: [, Validators.required],
      // end: [, Validators.required],
      callReasonId: [, Validators.nullValidator],
    });
  }
  //#endregion

  submitData(){
    // console.log("form : ", this.EmployeeForm);
    
    let obj = {
     name: this.EmployeeForm.get('name').value,
     mobileNumber: this.EmployeeForm.get('mobile').value,
     mobileNumber2: this.EmployeeForm.get('mobile2').value,
     phone: this.EmployeeForm.get('phone').value,
     CityId: +this.CityId,
     Gender: +this.Gender,
     dateOfBirth: this.EmployeeForm.get('DateOfBirth').value,
     address: this.EmployeeForm.get('address').value,
     clientId:this.route.snapshot.paramMap.get('id')
    }

    // console.log("r ---- : ",obj);
    

    this.customerApiService.InsertCustomer(obj).subscribe(
      (response)=>{
        if(response['message'] =="تم إضافة العميل بنجاح"){
          
          this._InsertCall.customerId = response["data"];
          this.submitCall();
        } else
          {
            Swal.fire({
              icon: 'error',
              title: 'خطأ',
              text:response['message'],
            })
          }
      },
      (err)=>{
        // console.log(err.error);
        
  Swal.fire({
        icon: 'error',
        title: 'خطأ',
        text:err.error,
      })
      }
    )
  }

  submitCall(){
    this._InsertCall.EndCall =  new Date().toLocaleDateString()  +" "+ new Date().toLocaleTimeString();

    
    this._InsertCall.reason = this.Form.get("reason").value;
    this._InsertCall.description =  this.Form.get("description").value;
    this._InsertCall.notes = this.Form.get("notes").value;

    this._InsertCall.AgentId = localStorage.getItem("RiskuserId");
    this.callApiService.InsertCall(this._InsertCall).subscribe(
      (response)=>{
        Swal.fire({
          icon: 'success',
          title: "تم إضافة ملخص المكالمة بنجاح",
          showConfirmButton: false,
          timer: 1500
        })
        this.router.navigateByUrl("/content/agent/main");
        
      window.setInterval(()=>{
        window.location.reload()
      },1000 )

      },
      (err)=>{
        Swal.fire({
          icon: 'error',
          title: 'خطأ',
          text: err.error,
        })
      }
    )

  }

  //#region Update Client
  UpdateClientType(){

    let id = this.route.snapshot.paramMap.get('id');

    if(this.EmployeeForm.get('password').value =='')
     this.pass = this.ApiService.Employee.password;
     else
     this.pass = this.EmployeeForm.get('password').value;

    this.ApiService.UpdateEmployee({ 
      id:id,
      name:this.EmployeeForm.get('name').value ,
      userName:this.EmployeeForm.get('username').value ,
      nationalId:this.EmployeeForm.get('nationalId').value ,
      address:this.EmployeeForm.get('address').value ,
      mobile:this.EmployeeForm.get('mobile').value ,
      password:this.pass ,
      Role:Roles.Admin
    } as GetEmployee).subscribe(
      response=>{
        Swal.fire({
          icon: 'success',
          title: "تم تعديل بيانات الموظف بنجاح",
          showConfirmButton: false,
          timer: 1500
        })
        this.router.navigateByUrl("content/admin/GetCategories");
      },
      err=>{
        Swal.fire({
          icon: 'error',
          title: 'خطأ',
          text: err.message,
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
          // console.log("Governorate_List : ", this.Governorate_List );
          response.data.forEach(element => {
            this.Governorate_Dictionary[element.regionID] = element.regionName;            
          });
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

      //#region  get Cities
  GetCities() {
    this.citiesApiService.GetCities().subscribe(
      response => {
        this.response = response;
        this.Response_List = response.data;
        // this.Filtered_List = response.data;
        // console.log(response.data);
        
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

    //#region Selected Item
    SelectedItem(event:any){
      this.Gender = event.target.value
    }
    //#endregion

    //#region Selected City
    SelectedCity(event:any){
      this.CityId = event.target.value
    }
    //#endregion

  //#region Selected Governorate
  SelectedGovernorate(event: any) {
    this.GetCities();
    this.Govern_id = event.target.value;
    if (event.target.value == -1){
      // this.Filtered_List = this.Response_List;
      // console.log("not filter : ",this.Filtered_List)

    }
    else{
      this.Filtered_List = this.Response_List.filter(x => x.regionId == event.target.value);
      // console.log("filter : ",this.Filtered_List)
    }
  }
  //#endregion

    //#region  Get Call Reason
    GetCallReason(ClientId:string) {
      this.callReasonApiService.GetReasonsRelatedWithClientType(ClientId).subscribe(
        response => {
          this.response = response;
          this.CallReason_List = response.data;
          // console.log("call reason : ", this.CallReason_List);    
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

    //#region sourceMarketGet
      sourceMarketGet() {
    this.sourceMarketApiService.Get().subscribe(
      response => {
        this.response = response;
        this.SourceMarket_List = response.data;
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

   back(){
    this.router.navigateByUrl("content/agent/main");
  }


  SelectedsourceMarket(event:any){
    this._InsertCall.sourceMarketId =+event.target.value; 
  }

  SelectedcallReason(event:any){
    this._InsertCall.callReasonId =+event.target.value; 
  }

  toggle_click(){
    if(this._InsertCall.satisfy == true)
    this._InsertCall.satisfy = false;
    else
    this._InsertCall.satisfy = true

    
  }

  SelectedcallType(event:any){
    this._InsertCall.callType = +event.target.value;
  }

}
