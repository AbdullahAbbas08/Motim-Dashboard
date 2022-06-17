import { CategoryExtract } from './../../../../../shared/Models/CategoryExtract';
import { GetCallReason } from 'src/app/shared/Models/get-call-reason';
import { PackageCategory } from './../../../../../shared/Models/packageCategory';
import { CategoriesService } from './../../../../../shared/API-Service/Categories.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IDropdownSettings } from 'ng-multiselect-dropdown';

import { ToastrService } from 'ngx-toastr';
import { CallReasonApiService } from 'src/app/shared/API-Service/call-reason-api.service';
import { ClientTypeApiService } from 'src/app/shared/API-Service/client-type-api.service';
import { Assign_ClientCustomer } from 'src/app/shared/Models/Assign_ClientCustomer';
import { CallClient } from 'src/app/shared/Models/CallClient';
import { InsertCallReason } from 'src/app/shared/Models/insert-call-reason';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-InsertCallReason',
  templateUrl: './InsertCallReason.component.html',
  styleUrls: ['./InsertCallReason.component.css']
})
export class InsertCallReasonComponent implements OnInit {

  //#region Decalre varaibles
  PackageForm: FormGroup;
  PackageFormPic = new FormData();
  maxDate: Date;
  update: boolean;
  dropdownSettings: IDropdownSettings = {};
  dropdownList: any = [];
  selectedItems: any[] = [];
  callClient: any[] = [];
  imgURL: any;
  imagePath: any;
  message: string;
  file: File;
  packageCategory:PackageCategory = {packageID:0, categories:[]}
  packageCategoryUpdate:PackageCategory = {packageID:0, categories:[]}
  categoriesExtract:any[] = [];
  elements : any[] = [];
  
  //#endregion

  //#region  constructor
  constructor(private _formBuilder: FormBuilder,
    private toaster: ToastrService,
    private ApiService: CallReasonApiService,
    private categoryService : CategoriesService,
    private clientTypeApiService: ClientTypeApiService,
    private router: Router,
    private route: ActivatedRoute) {
    this.maxDate = new Date();

  }
  //#endregion

  //#region  ng OnInit
  ngOnInit(): void {
    this.getCategoryType();
    this.imgURL = "assets/images/statics/personAvatar.png";

    if (this.route.snapshot.paramMap.get('id')) {

      this.ApiService.package = JSON.parse(localStorage.getItem("package")) ;
      this.getClientTypeById(this.ApiService.package.packageID);

      this.InitForm(this.ApiService.package)
      this.update = true;
      // console.log(this.update);
      //this.getClientTypeById(+this.route.snapshot.paramMap.get('id'));

    } else {
      this.update = false;
      // console.log(this.update);

      this._InitForm();
    }


    this.dropdownSettings = {
      singleSelection: false,
      idField: 'id',
      textField: 'titleAr',
      selectAllText: 'اختر الكل',
      unSelectAllText: 'الغاء اختيار الكل',
      itemsShowLimit: 5,
      allowSearchFilter: true
    };

  }
  //#endregion
  onSelectFile(event) {

    this.file = event.target.files[0]
  }
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

  //#region  Init Form
  InitForm(packageUpdating:GetCallReason) {
    this.PackageForm = this._formBuilder.group({
      packageTitle: [packageUpdating.packageTitle, Validators.required],
      packageTitleAR: [packageUpdating.packageTitleAr, Validators.required],
      packageDescription: [packageUpdating.packageDescription, Validators.required],
      packageDescriptionAR: [packageUpdating.packageDescriptionAr, Validators.required],
      packageImagePath: ['', Validators.required],
      packagePrice: [packageUpdating.packagePrice, Validators.required],
      packageOrder: [packageUpdating.packageOrder, Validators.required],
      serviceRequestCount: [packageUpdating.serviceRequestCount, Validators.required],
      packageDuration: [packageUpdating.packageDuration, Validators.required],
      categoryTypes: [this.selectedItems]
    });
  }

  _InitForm() {

    this.PackageForm = this._formBuilder.group({
      packageTitle: ['', Validators.required],
      packageTitleAR: ['', Validators.required],
      packageDescription: ['', Validators.required],
      packageDescriptionAR: ['', Validators.required],
      packageImagePath: ['', Validators.required],
      packagePrice: ['', Validators.required],
      packageOrder: ['', Validators.required],
      serviceRequestCount: ['', Validators.required],
      packageDuration: ['', Validators.required],
      categoryTypes: ['']
    });

  }
  //#endregion
  //#region  Insert Call Reason Method
  InsertPackage() {
    debugger
    this.PackageFormPic.append('PackageTitle',this.PackageForm.get('packageTitle').value);
    this.PackageFormPic.append('PackageTitleAR',this.PackageForm.get('packageTitleAR').value);
    this.PackageFormPic.append('PackageDescription',this.PackageForm.get('packageDescription').value);
    this.PackageFormPic.append('PackageDescriptionAR',this.PackageForm.get('packageDescriptionAR').value);
    this.PackageFormPic.append('PackageImagePath',this.file);
    this.PackageFormPic.append('PackagePrice',this.PackageForm.get('packagePrice').value);
    this.PackageFormPic.append('PackageOrder',this.PackageForm.get('packageOrder').value);
    this.PackageFormPic.append('ServiceRequestCount',this.PackageForm.get('serviceRequestCount').value);
    this.PackageFormPic.append('PackageDuration',this.PackageForm.get('packageDuration').value);
    
    this.ApiService.InsertCallReason(this.PackageFormPic).subscribe(
      (response:any) => {
        // console.log(response);
        this.packageCategory.packageID = response.packageID;

        this.PackageForm.get('categoryTypes').value.forEach(element => {

          this.packageCategory.categories.push(element.id);
        });
        this.ApiService.CallReasonClientType(this.packageCategory).subscribe(
          (data) => {
            Swal.fire({
              icon: 'success',
              title: "تم إضافة الباقة بنجاح",
              showConfirmButton: false,
              timer: 1500
            })
            this.router.navigateByUrl("content/admin/Get-Call-Reason");
          },
          (err) => {

          }
        )
        this.callClient = [];
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
  getCategoryType() {
    this.categoryService.GetCategories().subscribe(
      response => {
        this.dropdownList = response.data;
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
  getClientTypeById(id: number) {
    // console.log(id);
    this.clientTypeApiService.GetClientTypeById(id).subscribe(
      response => {
        this.categoriesExtract = response.data;
        this.categoriesExtract.forEach(element => {
          this.elements.push({id:element.category.id, titleAr:element.category.titleAr});
        })
        this.selectedItems = this.elements;
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


  //#region Update Call Reason
  UpdateCallReason() {
    let id = +this.route.snapshot.paramMap.get('id');
    this.ApiService.UpdateCallReason(id, {PackageId :id,
      PackageTitle: this.PackageForm.get('packageTitle').value,
      PackageTitleAR :this.PackageForm.get('packageTitleAR').value,
      PackageDescription :this.PackageForm.get('packageDescription').value,
      PackageDescriptionAR :this.PackageForm.get('packageDescriptionAR').value,
      PackageImagePath :this.file,
      PackagePrice :this.PackageForm.get('packagePrice').value,
      PackageOrder :this.PackageForm.get('packageOrder').value,
      ServiceRequestCount :this.PackageForm.get('serviceRequestCount').value,
      PackageDuration :this.PackageForm.get('packageDuration').value,
     }).subscribe(
      response => {
        this.packageCategory.packageID = id;
        this.PackageForm.get('categoryTypes').value.forEach(element => {
          this.packageCategory.categories.push(element.id);
        });
        // console.log(response);
        this.ApiService.DeleteAllCategories(id).subscribe(
          response => {
           
          }
        )
        this.ApiService.CallReasonClientType(this.packageCategory).subscribe(
          (data) => {
            Swal.fire({
              icon: 'success',
              title: "تم تعديل الباقة بنجاح",
              showConfirmButton: false,
              timer: 1500
            })
            this.router.navigateByUrl("content/admin/Get-Call-Reason");
            localStorage.removeItem("package");

          },
          (err) => {

          }
        )
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

  //#region  Get Call Reason
  GetCallReason() {
    this.ApiService.GetCallReason().subscribe(
      response => {
        this.PackageForm.patchValue({ Order: response.data.length + 1 });
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



  onItemSelect(item: any) {
    // console.log("---",this.EmployeeForm.get('Clients').value)
  }

  onSelectAll(items: any) {
    // console.log(items);
  }


}
