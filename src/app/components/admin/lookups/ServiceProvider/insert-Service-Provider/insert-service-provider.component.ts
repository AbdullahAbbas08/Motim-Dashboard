import { stringify } from '@angular/compiler/src/util';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ClientApiService } from 'src/app/shared/API-Service/client-api.service';
import { ClientTypeApiService } from 'src/app/shared/API-Service/client-type-api.service';
import { GovernorateApiService } from 'src/app/shared/API-Service/governorate-api.service';
import { GroupService } from 'src/app/shared/API-Service/group.service';
import { Error_Message } from 'src/app/shared/Constants/Error_Message';
import { getCities } from 'src/app/shared/Models/getCities';
import { GetClient } from 'src/app/shared/Models/GetClient';
import { GetClientType } from 'src/app/shared/Models/GetClientType';
import { GetGovernorate } from 'src/app/shared/Models/GetGovernorate';
import { InsertCities } from 'src/app/shared/Models/InsertCities';
import { Roles } from 'src/app/shared/Models/Roles';
import Swal from 'sweetalert2';
import { CitiesApiService } from '../../../../../shared/API-Service/cities-api.service';


@Component({
  selector: 'app-insert-department',
  templateUrl: './insert-service-provider.component.html',
  styleUrls: ['./insert-service-provider.component.css']
})
export class InsertDepartmentComponent implements OnInit,OnDestroy {

  //#region Decalre varaibles
  InsertForm: FormGroup;
  maxDate: Date;
  update: boolean;
  Governorate_Dictionary: { [Id: number]: string } = {}
  Governorate_List: GetGovernorate[];
  group_List: any[];
  Region_List: any[];
  Cities_List: getCities[];
  ClientType_List: GetClientType[];
  Govern_id: number;
  Governorate: string;
  City: string;
  region: string;
  group: string;
  imgURL: any;
  imagePath: any;
  message: string;
  cities_List: getCities[];
  Filtered_cities_List: getCities[];
  Client_Type_List: GetClientType[];
  groupID:any = -1;
  pass: string;
  //#endregion

  //#region  constructor
  constructor(private _formBuilder: FormBuilder,
    private toaster: ToastrService,
    private citiesApiService: CitiesApiService,
    private governorateApiService: GovernorateApiService,
    private ApiService: ClientApiService,
    private groupService: GroupService,
    private clientTypeApiService: ClientTypeApiService,
    private router: Router,
    private route: ActivatedRoute) { this.maxDate = new Date() }
  ngOnDestroy(): void {
    
  }
  //#endregion

  //#region  ng OnInit
  ngOnInit(): void {
    this.imgURL = "./assets/images/statics/personAvatar.png";

    this.Govern_id = -1;
    this.group_List = [];
    this.Region_List = [];
    this.getGovernoate();
    // this.GetCities();
    this.getGroup();
    this.GetRegion();
    // this.GetCities();

    if (this.route.snapshot.paramMap.get('id')) {
      this.ApiService.Client=JSON.parse(localStorage.getItem("RiskClientData"));
      this.InitForm(this.ApiService.Client)
      this.update = true;
    } else {
      this.update = false;
      this._InitForm();
      this.Governorate = "أختر المحافظة";
      this.City = "أختر المدينة";
      this.region = "أختر المنطقة";
      this.group = "أختر المجموعة";
    }

  }
  //#endregion

  //#region  Init Form
  InitForm(client: GetClient) {
    this.Governorate = client.governorateTitle;
    this.City = client.cityTitle;
    this.imgURL = "./assets/images/MainDirectory/" + client.logoPath;

    this.InsertForm = this._formBuilder.group({
      name: ['', Validators.required],
      nameEn: ['', Validators.required],
      mname: ['', Validators.required],
      mnameEn: ['-1', Validators.required],
      lname: ['', Validators.required],
      lnameEn: ['', Validators.required],
      email: ['', Validators.required],
      nid: ['', Validators.required,Validators.minLength(14),Validators.maxLength(14)],
      mobile: ['', Validators.required,Validators.minLength(13),Validators.maxLength(13)],
      address: ['', Validators.required],
      addressEn: ['', Validators.required],
      cityId: ['-1', Validators.required],
      groupid: ['-1', Validators.required],
      regionId: ['-1', Validators.required],
      password: ['', Validators.required],
      pid: ['', Validators.required],
      pordid: ['', Validators.required],
    });
  }
  _InitForm() {
    this.InsertForm = this._formBuilder.group({
      name: ['', Validators.required],
      nameEn: ['', Validators.required],
      mname: ['', Validators.required],
      mnameEn: ['-1', Validators.required],
      lname: ['', Validators.required],
      lnameEn: ['', Validators.required],
      email: ['', Validators.required],
      nid: ['', Validators.required,Validators.minLength(14),Validators.maxLength(14)],
      mobile: ['', Validators.required ,Validators.required,Validators.minLength(13),Validators.maxLength(13)],
      address: ['', Validators.required],
      addressEn: ['', Validators.required],
      cityId: ['-1', Validators.required],
      groupid: ['-1', Validators.required],
      regionId: ['-1', Validators.required],
      password: ['', Validators.required],
      pid: ['', Validators.required],
      pordid: ['', Validators.required],
    });
    this.imgURL = "./assets/images/statics/personAvatar.png";
    // console.log("imgURL : ",this.imgURL);

  }
  //#endregion

  //#region  Insert Client Method
  InsertServiceProvider() {
    if (this.InsertForm.get('cityId').value == -1) {
      Swal.fire({
        icon: 'error',
        title: 'خطأ',
        text: "أختر المدينة أولا",
      })
    }
    else if (this.InsertForm.get('regionId').value == -1) {
      Swal.fire({
        icon: 'error',
        title: 'خطأ',
        text: "أختر المنطقة أولا",
      })
    }
    else if (this.groupID == -1) {
      Swal.fire({
        icon: 'error',
        title: 'خطأ',
        text: "أختر المجموعة أولا",
      })
    }
    // else if (this.InsertForm.get('groupid').value == -1) {
    //   Swal.fire({
    //     icon: 'error',
    //     title: 'خطأ',
    //     text: "أختر المدينة أولا",
    //   })
    // }
    else if (this.InsertForm.get('password').value == '') {
      Swal.fire({
        icon: 'error',
        title: 'خطأ',
        text: "كلمة المرور مطلوبة",
      })
    }
    else {
      let logoForm = new FormData();
      logoForm.append("FirstNameAr", this.InsertForm.get('name').value)
      logoForm.append("FirstName", this.InsertForm.get('nameEn').value)
      logoForm.append("MiddleNameAr", this.InsertForm.get('mname').value)
      logoForm.append("MiddleName", this.InsertForm.get('mnameEn').value)
      logoForm.append("LastNameAr", this.InsertForm.get('lname').value)
      logoForm.append("LastName", this.InsertForm.get('lnameEn').value)
      logoForm.append("Email", this.InsertForm.get('email').value)
      logoForm.append("NationalID", this.InsertForm.get('nid').value)
      logoForm.append("PhoneNumber","966"+this.InsertForm.get('mobile').value)
      logoForm.append("AddressAR", this.InsertForm.get('address').value)
      logoForm.append("Address", this.InsertForm.get('addressEn').value)
      logoForm.append("CityId", this.InsertForm.get('cityId').value)
     
      logoForm.append("RegionID", this.InsertForm.get('regionId').value)
      logoForm.append("Password", this.InsertForm.get('password').value)
      logoForm.append("PassportID", this.InsertForm.get('pid').value)
      logoForm.append("BorderNumber", this.InsertForm.get('pordid').value)
      logoForm.append("Gender", "1")
      logoForm.append("GroupId",this.groupID as unknown as Blob )

      this.ApiService.InsertServiceProvider(logoForm).subscribe(
        response => {
          Swal.fire({
            icon: 'success',
            title: "تم إضافة مقدم الخدمة بنجاح",
            showConfirmButton: false,
            timer: 1500
          })
          this.router.navigateByUrl("content/admin/getServiceProvider");
          window.setInterval(()=>{
            window.location.reload;
          },1000)
          this.groupID = -1;
        },
        err => {
          // Error_Message.Message();
          Swal.fire({
            icon: 'error',
            title: "هناك خطأ",
            text: err.error,
       });
        }
      )
    }

  }
  //#endregion

  //#region Update Client
  UpdateClient() {

    if (this.InsertForm.get('password').value != '')
      this.pass = this.InsertForm.get('password').value;
    else
      this.pass = "*";
      let logoForm = new FormData();
   logoForm.append("Id", this.ApiService.Client.clientId)
   logoForm.append("Name", this.InsertForm.get('name').value)
   logoForm.append("CityId", this.InsertForm.get('cityId').value)
   logoForm.append("ClientTypeId", this.InsertForm.get('clientTypeId').value)
   logoForm.append("UserName", this.InsertForm.get('username').value)
   logoForm.append("Password", this.pass)
   logoForm.append("Mobile", this.InsertForm.get('mobile').value)
   logoForm.append("Address", this.InsertForm.get('address').value)
   logoForm.append("LogoPath", this.ApiService.Client.logoPath)
   logoForm.append("Role", Roles.Client)
   logoForm.append("GroupId",this.groupID as unknown as Blob )
    if (!logoForm.has("Logo"))
      logoForm.append("Logo", null)

    // this.ApiService.UpdateClient(this.logoForm).subscribe(
    //   response => {
    //     Swal.fire({
    //       icon: 'success',
    //       title: "تم تعديل العميل بنجاح",
    //       showConfirmButton: false,
    //       timer: 1500
    //     })
    //     this.router.navigateByUrl("content/admin/GetClient");
    //     localStorage.removeItem("RiskClientData")
    //     window.setInterval(()=>{
    //       window.location.reload;
    //     },1000)
    //   },
    //   err => {
    //     // console.log(err.error);
    //     // Swal.fire({
    //     //   icon: 'error',
    //     //   title: 'خطأ',
    //     //   text: "هناك خطأ ما برجاء المحاولة مرة اخرى",
    //     // })
    //   }
    // )
  }
  //#endregion

  //#region Selected Governorate
  SelectedGroup(event: any) {
    this.groupID = +event.target.value ;
    this.InsertForm.patchValue({
      groupid: +event.target.value
    })
  }
  //#endregion

  SelectedCity(event: any) {
    this.InsertForm.patchValue({
      cityId: +event.target.value
    })
  }

  Selectedregion(event: any) {
    console.log(+event.target.value);
    
    this. GetCities( +event.target.value) ;
    this.InsertForm.patchValue({
      regionId: +event.target.value
    })
  }

  isFieldValid(field): boolean {
    return (
      this.InsertForm.get(field).invalid && this.InsertForm.get(field).touched
    )
   }

  //#region  get Governoate
  getGovernoate() {
    this.governorateApiService.GetGovernorate().subscribe(
      response => {
        this.Governorate_List = response.data;
        
        // response.data.forEach(element => {
        //   // this.Governorate_Dictionary[element.id] = element.title;
        // }
        // );
      },
      err => {
        Error_Message.Message();
      }
    )
  }
  //#endregion

  //#region  get Governoate
  getGroup() {
    this.groupService.Get().subscribe(
      response => {
        this.group_List = response.data;
        // response.data.forEach(element => {
        //   // this.Governorate_Dictionary[element.id] = element.title;
        // }
        // );
      },
      err => {
        Error_Message.Message();
      }
    )
  }
  //#endregion

  //#region Get Cities
  GetCities(id) {
    this.citiesApiService.GetCities().subscribe(
      response => {
        // console.log(response);regionId
        this.cities_List = response.data.filter(x=>x.regionId == id);
        // this.Filtered_cities_List = response.data;
        
      },
      err => {
        // Swal.fire({
        //   icon: 'error',
        //   title: 'خطأ',
        //   text: err.error,
        // })
      }
    )
  }
  //#endregion

  //#region Get Cities
  GetRegion() {
    this.citiesApiService.GetRegion().subscribe(
      response => {
        this.Region_List = response.data;
        // this.Filtered_cities_List = response.data;
        
      },
      err => {
        // Swal.fire({
        //   icon: 'error',
        //   title: 'خطأ',
        //   text: err.error,
        // })
      }
    )
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
        Error_Message.Message();
      }
    )
  }
  //#endregion



}
