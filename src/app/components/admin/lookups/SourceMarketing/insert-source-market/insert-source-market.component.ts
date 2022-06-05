import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { ToastrService } from 'ngx-toastr';
import { CallReasonApiService } from 'src/app/shared/API-Service/call-reason-api.service';
import { CategoriesService } from 'src/app/shared/API-Service/Categories.service';
import { ClientApiService } from 'src/app/shared/API-Service/client-api.service';
import { SourceMarketApiService } from 'src/app/shared/API-Service/source-market-api.service';
import { InsertCallReason } from 'src/app/shared/Models/insert-call-reason';
import { InsertSourceMarket } from 'src/app/shared/Models/InsertSourceMarket';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-insert-source-market',
  templateUrl: './insert-source-market.component.html',
  styleUrls: ['./insert-source-market.component.css']
})
export class InsertSourceMarketComponent implements OnInit {

  //#region Decalre varaibles
  InsertForm: FormGroup;
  maxDate: Date;
  update: boolean;
  imgURL: any;
  imagePath: any;
  message: string;
  file:File;
  serviceFormPic = new FormData();
  dropdownSettings: IDropdownSettings = {};
  dropdownList: any = [];
  selectedItems: any[] = [];

  dropdownSettingsImage: IDropdownSettings = {};
  dropdownListImage: any = [];
  selectedItemsImage: any[] = [];

  serviceToUpdate:any[] = [];
  //#endregion

  //#region  constructor
  constructor(private _formBuilder: FormBuilder,
    private categoryService:CategoriesService,
    private toaster: ToastrService,
    private ImageReferenceService: ClientApiService,
    private ApiService: SourceMarketApiService,
    private router: Router,
    private route: ActivatedRoute) {
    this.maxDate = new Date();
  }
  //#endregion

  //#region  ng OnInit
  ngOnInit(): void {
    this.imgURL = "assets/images/statics/personAvatar.png";
    this.getCategoryType();
    this.GetImageReference();
    if (this.route.snapshot.paramMap.get('id')) {
      // MARKETTitle
      // MARKETOrder
      let id = + this.route.snapshot.paramMap.get('id')
      this.getServiceWithId(id);
      this.ApiService.service = JSON.parse(localStorage.getItem("service"))

      this.InitForm(this.ApiService.service)
      this.update = true;
      // console.log(this.update);
      
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
      unSelectAllText: 'الغاء اختر الكل',
      itemsShowLimit: 5,
      allowSearchFilter: true
    };
    this.dropdownSettingsImage = {
      singleSelection: false,
      idField: 'id',
      textField: 'name',
      selectAllText: 'اختر الكل',
      unSelectAllText: 'الغاء اختر الكل',
      itemsShowLimit: 5,
      allowSearchFilter: true
    };

  }

  getServiceWithId(id:number){
    debugger
    this.ApiService.GetServiceById(id).subscribe((res:any) => {
      this.serviceToUpdate = res.data[0];
      this.selectedItems = res.data[0].categories;
      this.selectedItemsImage = res.data[0].prerequists;
    },err => 
     console.log(err))
  }

  GetImageReference() {
    this.ImageReferenceService.GetClient().subscribe(
      response => {
        this.dropdownListImage = response.data;
        // console.log(this.Client_List);
        
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
  //#region  Init Form
  InitForm(service: any) {
    this.InsertForm = this._formBuilder.group({
      ServiceTitle: [service.title, Validators.required],
      ServiceTitleAR: [service.titleAr, Validators.required],
      ServiceDescription: [service.description, Validators.required],
      ServiceDescriptionAR: [service.descriptionAr, Validators.required],
      ServiceImagePath: ["", Validators.required],
      ServiceOrder: [service.order, Validators.required],
      ServicePrice: [service.price, Validators.required],
      CategoriesIds: ['', Validators.required],
      PrerequistsIds: ['', Validators.required],
    });
  }


  _InitForm() {

    this.InsertForm = this._formBuilder.group({
      ServiceTitle: ['', Validators.required],
      ServiceTitleAR: ['', Validators.required],
      ServiceDescription: ['', Validators.required],
      ServiceDescriptionAR: ['', Validators.required],
      ServiceImagePath: ['', Validators.required],
      ServiceOrder: ['', Validators.required],
      ServicePrice: ['', Validators.required],
      CategoriesIds: ['', Validators.required],
      PrerequistsIds: ['', Validators.required],
    });
    this.Get()
  }
  //#endregion

  //#region  Insert Call Reason Method
  Insert() {
    let categoriesIds :number[] = []
   this.InsertForm.get('CategoriesIds').value.forEach(element => {
      categoriesIds.push(element.id)
      this.serviceFormPic.append('CategoriesIds',element.id)
    });

    let imageRefIds :number[] = []
   this.InsertForm.get('PrerequistsIds').value.forEach(element => {
    imageRefIds.push(element.id)
    this.serviceFormPic.append('PrerequistsIds', element.id)
    });
    this.serviceFormPic.append('ServiceTitle', this.InsertForm.get('ServiceTitle').value)
    this.serviceFormPic.append('ServiceTitleAR', this.InsertForm.get('ServiceTitleAR').value)
    this.serviceFormPic.append('ServiceDescription', this.InsertForm.get('ServiceDescription').value)
    this.serviceFormPic.append('ServiceDescriptionAR', this.InsertForm.get('ServiceDescriptionAR').value)
    this.serviceFormPic.append('ServiceImagePath', this.file)
    this.serviceFormPic.append('ServiceOrder', this.InsertForm.get('ServiceOrder').value)
    this.serviceFormPic.append('ServicePrice', this.InsertForm.get('ServicePrice').value)
    
    this.ApiService.Insert(this.serviceFormPic).subscribe(
      response => {
        Swal.fire({
          icon: 'success',
          title: "تم إضافة الخدمة بنجاح",
          showConfirmButton: false,
          timer: 1500
        })
        this.router.navigateByUrl("content/admin/GetSourceMarket");
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
  Update() {
    let id = +this.route.snapshot.paramMap.get('id');
    let categoriesIds :number[] = []
    this.InsertForm.get('CategoriesIds').value.forEach(element => {
       categoriesIds.push(element.id)
       this.serviceFormPic.append('CategoriesIds',element.id)
     });
 
     let imageRefIds :number[] = []
    this.InsertForm.get('PrerequistsIds').value.forEach(element => {
     imageRefIds.push(element.id)
     this.serviceFormPic.append('PrerequistsIds', element.id)
     });
     this.serviceFormPic.append('ServiceID', id.toString())
     this.serviceFormPic.append('ServiceTitle', this.InsertForm.get('ServiceTitle').value)
     this.serviceFormPic.append('ServiceTitleAR', this.InsertForm.get('ServiceTitleAR').value)
     this.serviceFormPic.append('ServiceDescription', this.InsertForm.get('ServiceDescription').value)
     this.serviceFormPic.append('ServiceDescriptionAR', this.InsertForm.get('ServiceDescriptionAR').value)
     this.serviceFormPic.append('ServiceImagePath', this.file)
     this.serviceFormPic.append('ServiceOrder', this.InsertForm.get('ServiceOrder').value)
     this.serviceFormPic.append('ServicePrice', this.InsertForm.get('ServicePrice').value)
    this.ApiService.Update(id, this.serviceFormPic).subscribe(
      response => {
        Swal.fire({
          icon: 'success',
          title: "تم تعديل الخدمة بنجاح",
          showConfirmButton: false,
          timer: 1500
        })
        this.router.navigateByUrl("content/admin/GetSourceMarket");
        localStorage.removeItem("MARKETTitle");
        localStorage.removeItem("MARKETOrder");

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
  Get() {
    this.ApiService.Get().subscribe(
      response => {
        this.InsertForm.patchValue({ Order: response.data.length + 1 });
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
  
  onItemSelect(item: any) {
    // console.log("---",this.EmployeeForm.get('Clients').value)
  }

  onSelectAll(items: any) {
    // console.log(items);
  }


}
