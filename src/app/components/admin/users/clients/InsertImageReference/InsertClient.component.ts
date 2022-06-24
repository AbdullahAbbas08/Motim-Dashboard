import { stringify } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ClientApiService } from 'src/app/shared/API-Service/client-api.service';
import { ClientTypeApiService } from 'src/app/shared/API-Service/client-type-api.service';
import { GovernorateApiService } from 'src/app/shared/API-Service/governorate-api.service';
import { getCities } from 'src/app/shared/Models/getCities';
import { GetClient } from 'src/app/shared/Models/GetClient';
import { GetClientType } from 'src/app/shared/Models/GetClientType';
import { GetGovernorate } from 'src/app/shared/Models/GetGovernorate';
import { InsertCities } from 'src/app/shared/Models/InsertCities';
import { Roles } from 'src/app/shared/Models/Roles';
import { environment } from 'src/environments/environment.prod';
import Swal from 'sweetalert2';
import { CitiesApiService } from '../../../../../shared/API-Service/cities-api.service';


@Component({
  selector: 'app-InsertClient',
  templateUrl: './InsertImageReference.component.html',
  styleUrls: ['./InsertImageReference.component.css']
})
export class InsertClientComponent implements OnInit {

  //#region Decalre varaibles
  InsertForm: FormGroup;
  maxDate: Date;
  update: boolean;
  Governorate_Dictionary: { [Id: number]: string } = {}
  Governorate_List: GetGovernorate[];
  Cities_List: getCities[];
  ClientType_List: GetClientType[];
  Govern_id: number;
  Governorate: string;
  City: string;
  clientType: string;
  imgURL: any;
  imagePath: any;
  message: string;
  cities_List: getCities[];
  Filtered_cities_List: getCities[];
  Client_Type_List: GetClientType[];
  logoForm = new FormData();
  pass: string;
  file: File;
  id:string
  //#endregion

  //#region  constructor
  constructor(private _formBuilder: FormBuilder,
    private toaster: ToastrService,
    private citiesApiService: CitiesApiService,
    private governorateApiService: GovernorateApiService,
    private ApiService: ClientApiService,
    private clientTypeApiService: ClientTypeApiService,
    private router: Router,
    private route: ActivatedRoute) { this.maxDate = new Date() }
  //#endregion

  //#region  ng OnInit
  ngOnInit(): void {

    this.Govern_id = -1;
    this.id = this.route.snapshot.paramMap.get('id');

    if (this.route.snapshot.paramMap.get('id')) {
      this.ApiService.Client = JSON.parse(localStorage.getItem("RequirementClientData"));
      console.log( this.ApiService.Client);
      
      this.InitForm(this.ApiService.Client);
      this.update = true;
    } else {
      this.update = false;
      this._InitForm();
      this.Governorate = "أختر المحافظة";
      this.City = "أختر المدينة";
      this.clientType = "أختر نوع العميل";
    }

  }
  //#endregion

  //#region  Init Form
  InitForm(client: any) {
    
    this.InsertForm = this._formBuilder.group({
      name: [client.name, Validators.required],
      Namear: [client.NameAR, Validators.required],
      imageCode: [client.imageCode, Validators.required],
      sourceImagePath: ['', Validators.required],
    });
    this.imgURL =environment.Server_Image_URL+ client.sourceImagePath;
  }
  onSelectFile(event) {

    this.file = event.target.files[0]
  }
  _InitForm() {
    this.InsertForm = this._formBuilder.group({
      name: ['', Validators.required],
      Namear: ['', Validators.required],
      imageCode: [, Validators.required],
      sourceImagePath: ['', Validators.required],
    });
    this.imgURL = "./assets/images/statics/personAvatar.png";
    // console.log("imgURL : ",this.imgURL);

  }
  //#endregion

  //#region  Insert Client Method
  InsertClient() {
   
   if (this.InsertForm.get('imageCode').value == -1) {
      Swal.fire({
        icon: 'error',
        title: 'خطأ',
        text: "أختر نوع العميل أولا",
      })
    }
    else {

      this.logoForm.append("Name", this.InsertForm.get('name').value)
      this.logoForm.append("NameAR", this.InsertForm.get('Namear').value)
      this.logoForm.append("SourceImagePath", this.file)
      this.logoForm.append("ImageCode", this.InsertForm.get('imageCode').value)
      this.ApiService.InsertClient(this.logoForm).subscribe(
        response => {
          Swal.fire({
            icon: 'success',
            title: "تم إدخال متطلبات الخدمةو بنجاح",
            showConfirmButton: false,
            timer: 1500
          })
          this.router.navigateByUrl("content/admin/GetClient");
          window.setInterval(() => {
            window.location.reload;
          }, 1000)
        },
        err => {
          Swal.fire({
            icon: 'error',
            title: 'خطأ',
            text: err.error.error.message,
          })
        }
      )
    }

  }
  //#endregion

  //#region Update Client
  UpdateClient() {

    this.logoForm.append("Name", this.InsertForm.get('name').value)
    this.logoForm.append("NameAR", this.InsertForm.get('Namear').value)
    this.logoForm.append("SourceImagePath", this.file)
    this.logoForm.append("ImageCode", this.InsertForm.get('imageCode').value)

    this.ApiService.UpdateClient(this.ApiService.Client.id, this.logoForm).subscribe(
      response => {
        Swal.fire({
          icon: 'success',
          title: "تم تعديل متطلب الخدمة بنجاح",
          showConfirmButton: false,
          timer: 1500
        })
        this.router.navigateByUrl("content/admin/GetClient");
        localStorage.removeItem("RiskClientData")
        window.setInterval(() => {
          window.location.reload;
        }, 1000)
      },
      err => {
        // console.log(err.error);
        Swal.fire({
          icon: 'error',
          title: 'خطأ',
          text: "هناك خطأ ما برجاء المحاولة مرة اخرى",
        })
      }
    )
  }
  //#endregion

  //#region Selected Governorate
  SelectedGovernorate(event: any) {
    this.Govern_id = event.target.value;
    if (event.target.value != -1)
      this.Filtered_cities_List = this.cities_List.filter(x => x.regionId == event.target.value);
  }
  //#endregion

  //#region  Selected City
  SelectedCity(event: any) {
    this.InsertForm.patchValue({
      cityId: +event.target.value
    })
  }
  //#endregion

  //#region  Selected Client Type
  SelectedClientType(event: any) {
    this.InsertForm.patchValue({
      clientTypeId: +event.target.value
    })
  }
  //#endregion

  //#region  get Governoate
  getGovernoate() {
    this.governorateApiService.GetGovernorate().subscribe(
      response => {
        this.Governorate_List = response.data;
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

  //#region Get Cities
  GetCities() {
    this.citiesApiService.GetCities().subscribe(
      response => {
        // this.response = response;
        this.cities_List = response.data;
        // this.Filtered_cities_List = response.data;
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

  //#region Deal With Image
  preview(files: any) {
    if (files.length === 0)
      return;

    var mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      this.message = "Only images are supported.";
      return;
    }

    var reader = new FileReader();
    this.imagePath = files;
    reader.readAsDataURL(files[0]);
    reader.onload = (_event) => {
      this.imgURL = reader.result;
    }
  }
  //#endregion

}
