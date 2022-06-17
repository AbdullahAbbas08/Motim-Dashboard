import { stringify } from '@angular/compiler/src/util';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ClientApiService } from 'src/app/shared/API-Service/client-api.service';
import { ClientTypeApiService } from 'src/app/shared/API-Service/client-type-api.service';
import { GovernorateApiService } from 'src/app/shared/API-Service/governorate-api.service';
import { GroupService } from 'src/app/shared/API-Service/group.service';
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
  logoForm = new FormData();
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
    this.GetCities();
    this.getGroup();
    this.GetRegion();
    this.GetCities();

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
      nid: ['', Validators.required],
      mobile: ['', Validators.required],
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
      nid: ['', Validators.required],
      mobile: ['', Validators.required],
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

      this.logoForm.append("FirstNameAr", this.InsertForm.get('name').value)
      this.logoForm.append("FirstName", this.InsertForm.get('nameEn').value)
      this.logoForm.append("MiddleNameAr", this.InsertForm.get('mname').value)
      this.logoForm.append("MiddleName", this.InsertForm.get('mnameEn').value)
      this.logoForm.append("LastNameAr", this.InsertForm.get('lname').value)
      this.logoForm.append("LastName", this.InsertForm.get('lnameEn').value)
      this.logoForm.append("Email", this.InsertForm.get('email').value)
      this.logoForm.append("NationalID", this.InsertForm.get('nid').value)
      this.logoForm.append("PhoneNumber", this.InsertForm.get('mobile').value)
      this.logoForm.append("AddressAR", this.InsertForm.get('address').value)
      this.logoForm.append("Address", this.InsertForm.get('addressEn').value)
      this.logoForm.append("CityId", this.InsertForm.get('cityId').value)
      this.logoForm.append("GroupId", this.InsertForm.get('groupid').value)
      this.logoForm.append("RegionID", this.InsertForm.get('regionId').value)
      this.logoForm.append("Password", this.InsertForm.get('password').value)
      this.logoForm.append("PassportID", this.InsertForm.get('pid').value)
      this.logoForm.append("BorderNumber", this.InsertForm.get('pordid').value)
      this.logoForm.append("Gender", "1")
  

      this.ApiService.InsertServiceProvider(this.logoForm).subscribe(
        response => {
          Swal.fire({
            icon: 'success',
            title: "تم إضافة مقدم الخدمة بنجاح",
            showConfirmButton: false,
            timer: 1500
          })
          // this.router.navigateByUrl("content/admin/GetClient");
          window.setInterval(()=>{
            window.location.reload;
          },1000)
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

  }
  //#endregion

  //#region Update Client
  UpdateClient() {

    if (this.InsertForm.get('password').value != '')
      this.pass = this.InsertForm.get('password').value;
    else
      this.pass = "*";

    this.logoForm.append("Id", this.ApiService.Client.clientId)
    this.logoForm.append("Name", this.InsertForm.get('name').value)
    this.logoForm.append("CityId", this.InsertForm.get('cityId').value)
    this.logoForm.append("ClientTypeId", this.InsertForm.get('clientTypeId').value)
    this.logoForm.append("UserName", this.InsertForm.get('username').value)
    this.logoForm.append("Password", this.pass)
    this.logoForm.append("Mobile", this.InsertForm.get('mobile').value)
    this.logoForm.append("Address", this.InsertForm.get('address').value)
    this.logoForm.append("LogoPath", this.ApiService.Client.logoPath)
    this.logoForm.append("Role", Roles.Client)

    if (!this.logoForm.has("Logo"))
      this.logoForm.append("Logo", null)

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
    this.InsertForm.patchValue({
      regionId: +event.target.value
    })
  }



  //#region  get Governoate
  getGovernoate() {
    this.governorateApiService.GetGovernorate().subscribe(
      response => {
        this.Governorate_List = response.data;
        response.data.forEach(element => {
          // this.Governorate_Dictionary[element.id] = element.title;
        }
        );
      },
      err => {
       
      }
    )
  }
  //#endregion

  //#region  get Governoate
  getGroup() {
    this.groupService.Get().subscribe(
      response => {
        this.group_List = response.data;
        response.data.forEach(element => {
          // this.Governorate_Dictionary[element.id] = element.title;
        }
        );
      },
      err => {
       
      }
    )
  }
  //#endregion

  //#region Get Cities
  GetCities() {
    this.citiesApiService.GetCities().subscribe(
      response => {
        // console.log(response);
        this.cities_List = response.data;
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
        // Swal.fire({
        //   icon: 'error',
        //   title: 'خطأ',
        //   text: err.error,
        // })
      }
    )
  }
  //#endregion


}
