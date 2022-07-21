import { stringify } from '@angular/compiler/src/util';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { GovernorateApiService } from 'src/app/shared/API-Service/governorate-api.service';
import { ReasonService } from 'src/app/shared/API-Service/reason.service';
import { Error_Message } from 'src/app/shared/Constants/Error_Message';
import { ReasonsType } from 'src/app/shared/Constants/ReasonsType';
import { GetGovernorate } from 'src/app/shared/Models/GetGovernorate';
import { InsertCities } from 'src/app/shared/Models/InsertCities';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-insert-reason',
  templateUrl: './insert-reason.component.html',
  styleUrls: ['./insert-reason.component.css']
})
export class InsertReasonComponent implements OnInit,OnDestroy {

  //#region Decalre varaibles
  InsertForm: FormGroup;
  maxDate: Date;
  update: boolean;
  Governorate_Dictionary:{[Id:number]:string} = {}
  reason_List:any[];
  Govern_id:number;
  DepartmentTitle:string;
  name:string;
  nameAr:string;
  deptID:string;

  //#endregion

  //#region  constructor
  constructor(private _formBuilder: FormBuilder,
    private toaster: ToastrService,
    private ApiService: ReasonService,
    private governorateApiService:GovernorateApiService,
    private router: Router,
    private route: ActivatedRoute) { 
      this.maxDate = new Date();
    }

  ngOnDestroy(): void {
     localStorage.removeItem("ReasonTypeTitle");
     localStorage.removeItem("ReasonTypeId");
  }
  //#endregion

  //#region  ng OnInit
  ngOnInit(): void {
    this.reason_List = [];
    this.reason_List.push({id:ReasonsType.Hold,name:'معلق'});
    this.reason_List.push({id:ReasonsType.Cancel,name:'إغلاق'});
    this.Govern_id = -1;
    
    this.name = localStorage.getItem("ReasonTypeTitle");
    this.deptID = localStorage.getItem("ReasonTypeId");
    if (this.route.snapshot.paramMap.get('id')) {
      this.InitForm(this.name,this.deptID)
      this.ApiService.GetDepartment(this.deptID).subscribe(
        response => {          
          this.DepartmentTitle = response.data[0].name;
        },
        err => {
          Error_Message.Message();
        }
      )
           
      this.update = true;
    } else {
      this.update = false;
      this._InitForm();
      this.DepartmentTitle = "أختر نوع سبب";
    }
  }
  //#endregion

  //#region  Init Form
  InitForm(name:any,deptID:any) {
    this.InsertForm = this._formBuilder.group({
      name: [name, Validators.required],
      deptID: [deptID, Validators.required],
    });
    if(deptID == ReasonsType.Hold){
      this.DepartmentTitle = 'معلق';  
      this.InsertForm.patchValue({
        deptID: ReasonsType.Hold ,
      })
    }
    else{
      this.DepartmentTitle = 'إغلاق';
      this.InsertForm.patchValue({
        deptID: ReasonsType.Cancel ,
      })
    }
  }
  _InitForm() {
    this.InsertForm = this._formBuilder.group({
      name: ['', Validators.required],
      deptID: ['', Validators.required],
    });
  }
  //#endregion

  //#region  Insert Cities Method
  Insert() {
    // console.log("this.InsertForm.get('GovernorateId') : ",this.InsertForm.get('GovernorateId').value);
    if(this.InsertForm.get('deptID').value == -1){
      Swal.fire({
        icon: 'error',
        title: 'خطأ',
        text: "أختر نوع سبب أولا",
      })
    }else
    {
      // console.log("name : ",this.InsertForm.get('name').value);
      // console.log("deptID : ",this.InsertForm.get('deptID').value);
      this.ApiService.Insert({
        reasonMessage: this.InsertForm.get('name').value,
        reasonType: +this.InsertForm.get('deptID').value,
      }).subscribe(
        response => {
          Swal.fire({
            icon: 'success',
            title: "تم  إضافة السبب بنجاح",
            showConfirmButton: false,
            timer: 1500
          })
          this.router.navigateByUrl("content/admin/Reasons");
        },
        err => {
          Error_Message.Message();
        }
      )
    }
  
  }
  //#endregion

  //#region Update Cities
  Update() {
    let id = this.route.snapshot.paramMap.get('id'); 
    this.ApiService.Update(id, {
          "id": id,
          reasonMessage: this.InsertForm.get('name').value,
        reasonType: +this.InsertForm.get('deptID').value,
      }).subscribe(
      response => {        
        Swal.fire({
          icon: 'success',
          title: "تم تعديل السبب بنجاح",
          showConfirmButton: false,
          timer: 1500
        })
        this.router.navigateByUrl("content/admin/Reasons");
        localStorage.removeItem("name");
        localStorage.removeItem("name");
        localStorage.removeItem("deptID");
      },
      err => {
        Error_Message.Message();
      }
    )
  }
  //#endregion

  //#region Selected Governorate
  SelectedItem(event:any){
    this.InsertForm.patchValue({deptID:event.target.value})      
  }
  //#endregion

  //#region  get 
    // get() {
    //   this.ApiService.GetDepartment(this.deptID).subscribe(
    //     response => {
    //       // this.Governorate_List = response.data;
    //       response.data.forEach(element => {
    //         this.Governorate_Dictionary[element.regionID] = element.regionName;            
    //       });
    //     },
    //     err => {
    //       Swal.fire({
    //         icon: 'error',
    //         title: 'خطأ',
    //         text: err.error,
    //       })
    //     }
    //   )
    // }
    //#endregion


    //#region  get 
    // getAllDepartment() {
    //   this.ApiService.GetAllDepartment().subscribe(
    //     response => {          
    //       this.Dept_List = response.data;
    //     },
    //     err => {
    //       Swal.fire({
    //         icon: 'error',
    //         title: 'خطأ',
    //         text: err.error,
    //       })
    //     }
    //   )
    // }
    //#endregion

}
