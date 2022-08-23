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
  userData:any={
    "userName": "",
    "firstName": "",
    "firstNameAr": "",
    "middleName": "",
    "middleNameAr": "",
    "lastName": "",
    "lastNameAr": "",
    "phoneNumber": "",
    "nationalID": "",
    "passportID": "",
    "borderNumber": "",
    "region": "",
    "regionId": 0,
    "city": "",
    "cityId": 0,
    "address": "",
    "addressAr": "",
    "email": "",
    "gender": "Male",
  };
  updatepass:boolean;
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
    private route: ActivatedRoute) { this.maxDate = new Date() 
     
    }
  ngOnDestroy(): void {
    
  }
  //#endregion

  //#region  ng OnInit
  ngOnInit(): void {
    this.updatepass = false;
   this._InitForm();
    this.Govern_id = -1;
    this.group_List = [];
    this.Region_List = [];
    this.getGovernoate();
    // this.GetCities();
    this.getGroup();
    this.GetRegion();
    // this.GetCities();
    if (this.route.snapshot.paramMap.get('id')) {  
      this.GetUserProfile(this.route.snapshot.paramMap.get('id')) 
        // this.InitForm( this.userData); 
     this.update = true;
   } else {
     this.update = false;
    //  this._InitForm();
     this.Governorate = "أختر المحافظة";
     this.City = "أختر المدينة";
     this.region = "أختر المنطقة";
     this.group = "أختر المجموعة";
   }
  

  }
  //#endregion

  //#region  Init Form
  
  InitForm(data: any) {
    // this.Governorate = data.governorateTitle;
    // this.City = data.cityTitle; 
    this.GetCities(data.regionId); 
    this.InsertForm.patchValue({
      name: data.firstNameAr,
      nameEn:data.firstName,
      mname:data.middleNameAr,
      mnameEn:data.middleName,
      lname: data.lastNameAr,
      lnameEn:data.lastName,
      email:data.email,
      nid:data.nationalID,
      mobile:data.phoneNumber.substring(3),
      address:data.addressAr,
      addressEn:data.address,
      cityId: data.cityId,
      groupid: data.userGroupID,
      regionId: data.regionId,
      password: '############',
      pid: data.passportID,
      pordid: data.borderNumber,
    }) 

    this.region = this.Region_List.filter(x=>x.regionID == data.regionId)[0].regionName;
    this.City =  data.city;
    this.group = this.group_List.filter(x=>x.id == data.userGroupID)[0].nameAr;
        
    // this.InsertForm = this._formBuilder.group({
    //   name:   [data.firstNameAr, Validators.required],
    //   nameEn: [data.firstName, Validators.required],
    //   mname:    [data.middleNameAr , Validators.required],
    //   mnameEn: [data.middleName, Validators.required],
    //   lname: [data.lastNameAr, Validators.required],
    //   lnameEn: [data.lastName, Validators.required],
    //   email: [data.email, Validators.required],
    //   nid: [data.nationalID, Validators.required,Validators.minLength(14),Validators.maxLength(14)],
    //   mobile: [data.phoneNumber, Validators.required,Validators.minLength(13),Validators.maxLength(13)],
    //   address: [data.addressAr, Validators.required],
    //   addressEn: [data.address, Validators.required],
    //   cityId: [data.cityId, Validators.required],
    //   groupid: [data, Validators.required],
    //   regionId: [data.regionId, Validators.required],
    //   password: ['', Validators.required],
    //   pid: [data.passportID, Validators.required],
    //   pordid: [data.borderNumber, Validators.required],
    // });
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
      mobile: ['', Validators.required ],
      address: ['', Validators.required],
      addressEn: ['', Validators.required],
      cityId: ['-1', Validators.required],
      groupid: ['-1', Validators.required],
      regionId: ['-1', Validators.required],
      password: ['############', Validators.required],
      pid: ['', Validators.required],
      pordid: ['', Validators.required],
    });
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
    else if (this.InsertForm.get('groupid').value == -1) {
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
    
    this.ApiService.UpdateuserSr({
      "firstName": this.InsertForm.get('nameEn').value,
      "firstNameAr": this.InsertForm.get('name').value,
      "middleName": this.InsertForm.get('mnameEn').value,
      "middleNameAr": this.InsertForm.get('mname').value,
      "lastName": this.InsertForm.get('lnameEn').value,
      "lastNameAr": this.InsertForm.get('lname').value,
      "phoneNumber":"966"+this.InsertForm.get('mobile').value,
      "nationalID": this.InsertForm.get('nid').value,
      "passportID": this.InsertForm.get('pid').value,
      "borderNumber": this.InsertForm.get('pordid').value,
      "regionID": this.InsertForm.get('regionId').value,
      "cityId": this.InsertForm.get('cityId').value,
      "userGroupId": this.InsertForm.get('groupid').value,
      "address": this.InsertForm.get('addressEn').value,
      "password":this.InsertForm.get('password').value,
      "addressAR": this.InsertForm.get('address').value,
      "email": this.InsertForm.get('email').value,
      "userId": this.route.snapshot.paramMap.get('id')
    }).subscribe(
      response => {
        Swal.fire({
          icon: 'success',
          title: "تم التعديل  بنجاح",
          showConfirmButton: false,
          timer: 1500
        })
        this.router.navigateByUrl("content/admin/getServiceProvider");
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
  updatepassword(){
    this.updatepass = !this.updatepass;
  }
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
        // console.log(response.data);
        
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
  
  GetUserProfile(id) {
    this.ApiService.GetUserProfile(id).subscribe(
      response => {
        // this.userData = response.data[0]
        console.log(response);
        
       this.InitForm(response.data[0]);  
      },
      err => {
       
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
