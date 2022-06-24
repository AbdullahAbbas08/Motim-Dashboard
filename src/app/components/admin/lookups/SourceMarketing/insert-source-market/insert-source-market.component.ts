import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { ToastrService } from 'ngx-toastr';
import { CallReasonApiService } from 'src/app/shared/API-Service/call-reason-api.service';
import { CategoriesService } from 'src/app/shared/API-Service/Categories.service';
import { ClientApiService } from 'src/app/shared/API-Service/client-api.service';
import { GroupService } from 'src/app/shared/API-Service/group.service';
import { SourceMarketApiService } from 'src/app/shared/API-Service/source-market-api.service';
import { environment } from 'src/environments/environment.prod';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-insert-source-market',
  templateUrl: './insert-source-market.component.html',
  styleUrls: ['./insert-source-market.component.css']
})
export class InsertSourceMarketComponent implements OnInit,OnDestroy {

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
  dropdownSettingsGroup: IDropdownSettings = {};
  dropdownListImage: any = [];
  selectedItemsImage: any[] = [];
  selectedItemsgroup: any[]=[];

  serviceToUpdate:any[] = [];
  groups:any[] = [];
  ServiceId:number = -1;
  groupService:any[]=[];
  serviceTitle:string="";
  img_path:string = environment.Server_Image_URL

  //#endregion

  //#region  constructor
  constructor(private _formBuilder: FormBuilder,
    private categoryService:CategoriesService,
    private GroupService:GroupService,
    private toaster: ToastrService,
    private ImageReferenceService: ClientApiService,
    private ApiService: SourceMarketApiService,
    private router: Router,
    private route: ActivatedRoute) {
    this.maxDate = new Date();
  }
  ngOnDestroy(): void {
    localStorage.removeItem("ServiceId");
    localStorage.removeItem("MARKETTitle");
    localStorage.removeItem("ServiceId")
    localStorage.removeItem("serviceTitleAR")
  }
  //#endregion

  //#region  ng OnInit
  ngOnInit(): void {
    this.imgURL = "assets/images/statics/personAvatar.png";
   
    // sessionStorage.test1 = "Lorem ipsum";
    this.serviceTitle = localStorage.getItem("serviceTitleAR")??"";
    this.getCategoryType();
    this.GetImageReference();
    this.get();
    if (this.route.snapshot.paramMap.get('id')) {

      let id = + this.route.snapshot.paramMap.get('id')
      this.GetGroupService(id);
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
    this.dropdownSettingsGroup = {
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
    this.ApiService.GetServiceById(id).subscribe((res:any) => {
      this.serviceToUpdate = res.data[0];
      this.selectedItems = res.data[0].categories;
      this.selectedItemsImage = res.data[0].prerequists;
    },err => {} ) 
  }
 
  getService(NAME:any):number{
    let id = -1;
    this.ApiService.Find(NAME).subscribe(
      (res) => {
     id =  res.data["id"];
    },err => {
      return -1;
    })
    return id;
  }

  GetGroupService(id:any){
    this.ApiService.GetGroupService().subscribe(
      (res) => {
      this.selectedItemsgroup.push({"id":1,"titleAr":"element.groupNameAR"})
      this.groups.push({"id":2,"titleAr":"element.groupNameAR"})     
    },err => {
    })
  }

  GetImageReference() {
    this.ImageReferenceService.GetClient().subscribe(
      response => {
        this.dropdownListImage = response.data;
        
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

  get() {
    this.GroupService.Get().subscribe(
      response => {                
        this.groups = response.data;  
              
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

  InsertGroupServ(data:any) {
    this.ApiService.InsertGroupService(data).subscribe(
      response => {
        Swal.fire({
          icon: 'success',
          title: "تم إضافة المجموعات للخدمة بنجاح",
          showConfirmButton: false,
          timer: 1500
        })
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
      ServiceLink: [service.ServiceOnlineUrl, Validators.required],
    });
      this.imgURL = environment.Server_Image_URL+service.imagePath;
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
      ServiceLink: ['', Validators.required],
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
    this.serviceFormPic.append('ServiceOnlineUrl', this.InsertForm.get('ServiceLink').value)
    
    this.ApiService.Insert(this.serviceFormPic).subscribe(
      response => {
            this.serviceTitle = response["serviceTitleAR"];
            localStorage.setItem("serviceTitleAR",response["serviceTitleAR"])        
            localStorage.setItem("ServiceId",response["serviceID"])        
        Swal.fire({
          icon: 'success',
          title: "تم إضافة الخدمة بنجاح",
          showConfirmButton: false,
          timer: 1500
        })
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
     this.serviceFormPic.append('ServiceID', id as unknown as Blob)
     this.serviceFormPic.append('ServiceTitle', this.InsertForm.get('ServiceTitle').value)
     this.serviceFormPic.append('ServiceTitleAR', this.InsertForm.get('ServiceTitleAR').value)
     this.serviceFormPic.append('ServiceDescription', this.InsertForm.get('ServiceDescription').value)
     this.serviceFormPic.append('ServiceDescriptionAR', this.InsertForm.get('ServiceDescriptionAR').value)
     this.serviceFormPic.append('ServiceImagePath', this.file)
     this.serviceFormPic.append('ServiceOrder', this.InsertForm.get('ServiceOrder').value)
     this.serviceFormPic.append('ServicePrice', this.InsertForm.get('ServicePrice').value)
     this.serviceFormPic.append('ServiceOnlineUrl', this.InsertForm.get('ServiceLink').value)

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
  
  onGroupSelect(event: any) {
    
  }

  onItemSelect(event: any) {
    // console.log("---",event.target.value)
  }

  onSelectAll(items: any) {
    // console.log(items);
  }

  InsertGroupService(){
    this.ServiceId = +localStorage.getItem("ServiceId")??-1
    if(this.ServiceId !=-1){
    // console.log(this.selectedItemsgroup);

    this.selectedItemsgroup.forEach(element => {
      this.groupService.push({
        "groupId": element.id,
        "serviceID":this.ServiceId
      })
    });

    if(this.selectedItemsgroup.length !=0  ){
         this.InsertGroupServ(this.groupService[0]);

    }else{
      Swal.fire({
        icon: 'error',
        title: 'خطأ',
        text: " يجب إضافة الخدمة أولا ثم أختيار المجموعات من القائمة",
      })
    }
    }

  }

}
