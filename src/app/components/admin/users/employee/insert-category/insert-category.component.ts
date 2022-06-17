import { InsertCategory } from './../../../../../shared/Models/InsertCategory';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CategoriesService } from 'src/app/shared/API-Service/Categories.service';
import { GetCategories } from 'src/app/shared/Models/GetCategories';
import { InsertClientType } from 'src/app/shared/Models/insert-client-type';
import { Roles } from 'src/app/shared/Models/Roles';
import Swal from 'sweetalert2';
import { GenericResponse } from 'src/app/shared/Models/GenericResponse';
import { IDropdownSettings } from 'ng-multiselect-dropdown';

@Component({
  selector: 'app-insert-category',
  templateUrl: './insert-category.component.html',
  styleUrls: ['./insert-category.component.css']
})
export class InsertCategoryComponent implements OnInit {

  //#region Decalre varaibles
  CategoryForm: FormGroup;
  _InsertClientType:InsertClientType;
  maxDate: Date;
  update:boolean;
  pass:string;
  imgURL: any;
  imagePath: any;
  message: string;
  file:File;
  categoryId:string ='0';
  Governorate:string;
  response: GenericResponse<GetCategories>;
  categories: GetCategories[];
  categoryFormPic = new FormData();
  dropdownSettings: IDropdownSettings = {};
  dropdownList: any = [];
  selectedItem:any = [];
  //#endregion

  //#region  constructor
  constructor(private _formBuilder: FormBuilder,
              private toaster: ToastrService,
              private ApiService:CategoriesService,
              private router:Router,
              private route: ActivatedRoute) 
  { this.maxDate = new Date(); }
  //#endregion

  //#region  ng OnInit
  ngOnInit(): void {
   this.GetCategories();
    if(this.route.snapshot.paramMap.get('id')){
      this.ApiService.Category =  JSON.parse(localStorage.getItem("RiskEmployeeData"));
      this.InitForm(this.ApiService.Category);
      this.update = true;
      this.selectedItem = [{id:this.ApiService.Category.parentId, titleAr:this.ApiService.Category.parentTitleAr}]
      this.categoryId = this.ApiService.Category.parentId.toString();
     this.imgURL = "assets/images/statics/personAvatar.png";
    }else
    {
      this.update = false;
      this._InitForm();
     this.imgURL = "assets/images/statics/personAvatar.png";
     this.Governorate = "أختر تصنيف"

    }
    
    this.dropdownSettings = {
      singleSelection: true,
      idField: 'id',
      textField: 'titleAr',
      selectAllText: 'اختر الكل',
      unSelectAllText: 'الغاء اختر الكل',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };
  }
  onItemSelect(item: any) {
    this.categoryId = item.id;
    // console.log("---",this.EmployeeForm.get('Clients').value)
  }

  onSelectAll(items: any) {
    // console.log(items);
  }

  SelectedCategory(event:any){
    this.categoryId = event.target.value;
  }
  //#endregion
  onSelectFile(event){
    
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
  InitForm(category:GetCategories){
    this.Governorate = category.parentTitle;
    this.CategoryForm = this._formBuilder.group({
      categoryTitleEN: [category.title, Validators.required],
      categoryTitleAR: [category.titleAr, Validators.required],
      categoryImagePath: ['', Validators.required],
      categoryDescriptionEN: [category.description, Validators.required],
      categoryDescriptionAR: [category.descriptionAr, Validators.required],
      servicesAvgTime: [category.servicesAvgTime, Validators.nullValidator],
      categoryParentId: ['',  Validators.required],
      order: [category.order, Validators.required],
    });
  }

  _InitForm(){
    this.CategoryForm = this._formBuilder.group({
      categoryTitleEN: ['', Validators.required],
      categoryTitleAR: ['', Validators.required],
      categoryImagePath : ['', Validators.required],
      categoryDescriptionEN : ['', Validators.required],
      categoryDescriptionAR : ['', Validators.required],
      servicesAvgTime: ['', Validators.required],
      categoryParentId: ['',[Validators.required]],
      order: ['', Validators.required],
    });
    this.imgURL = "assets/images/statics/personAvatar.png";
  }
  //#endregion

  GetCategories() {
    this.ApiService.GetCategories().subscribe(
      response => {
        this.response = response;
        this.categories = response.data;
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
  //#region  Insert Client-Type Method
  InsertClientType(){    
    this.categoryFormPic.append('CategoryTitle',this.CategoryForm.get('categoryTitleEN').value)
    this.categoryFormPic.append('CategoryTitleAR',this.CategoryForm.get('categoryTitleAR').value)
    this.categoryFormPic.append('CategoryImagePath',this.file)
    this.categoryFormPic.append('CategoryDescription',this.CategoryForm.get('categoryDescriptionEN').value)
    this.categoryFormPic.append('CategoryDescriptionAR',this.CategoryForm.get('categoryDescriptionAR').value)
    this.categoryFormPic.append('ServicesAvgTime',this.CategoryForm.get('servicesAvgTime').value)
    this.categoryFormPic.append('CategoryParentId',this.categoryId)
    this.categoryFormPic.append('Order',this.CategoryForm.get('order').value)
      this.ApiService.InsertEmployee(this.categoryFormPic).subscribe(
      response=>{
        Swal.fire({
          icon: 'success',
          title: "تم إضافة التصنيف بنجاح",
          showConfirmButton: false,
          timer: 1500
        })
        this.router.navigateByUrl("content/admin/GetCategories");
      },
      err=>{
        Swal.fire({
          icon: 'error',
          title: 'خطأ',
          text: err.error,
        })
      }
    )
 
  }
  //#endregion

  //#region Update Client
  UpdateClientType(){

    let id = this.route.snapshot.paramMap.get('id');

    this.categoryFormPic.append('CategoryID', id)
    this.categoryFormPic.append('CategoryTitle',this.CategoryForm.get('categoryTitleEN').value)
    this.categoryFormPic.append('CategoryTitleAR',this.CategoryForm.get('categoryTitleAR').value)
    this.categoryFormPic.append('CategoryImagePath',this.file)
    this.categoryFormPic.append('CategoryDescription',this.CategoryForm.get('categoryDescriptionEN').value)
    this.categoryFormPic.append('CategoryDescriptionAR',this.CategoryForm.get('categoryDescriptionAR').value)
    this.categoryFormPic.append('ServicesAvgTime',this.CategoryForm.get('servicesAvgTime').value)
    this.categoryFormPic.append('CategoryParentId',this.categoryId)
    this.categoryFormPic.append('Order',this.CategoryForm.get('order').value)

    this.ApiService.UpdateEmployee(id, this.categoryFormPic).subscribe(
      response=>{
        Swal.fire({
          icon: 'success',
          title: "تم تعديل بيانات التصنيف بنجاح",
          showConfirmButton: false,
          timer: 1500
        })
        this.router.navigateByUrl("content/admin/GetCategories");
        localStorage.removeItem("RiskEmployeeData")
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


}
