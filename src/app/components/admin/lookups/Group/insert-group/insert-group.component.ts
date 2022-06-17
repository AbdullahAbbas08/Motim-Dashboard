import { stringify } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { GovernorateApiService } from 'src/app/shared/API-Service/governorate-api.service';
import { GroupService } from 'src/app/shared/API-Service/group.service';
import { GetGovernorate } from 'src/app/shared/Models/GetGovernorate';
import { InsertCities } from 'src/app/shared/Models/InsertCities';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-insert-group',
  templateUrl: './insert-group.component.html',
  styleUrls: ['./insert-group.component.css']
})
export class InsertGroupComponent implements OnInit {

  //#region Decalre varaibles
  InsertForm: FormGroup;
  maxDate: Date;
  update: boolean;
  Governorate_Dictionary:{[Id:number]:string} = {}
  Dept_List:any[];
  Govern_id:number;
  DepartmentTitle:string;
  name:string;
  nameAr:string;
  deptID:string;

  //#endregion

  //#region  constructor
  constructor(private _formBuilder: FormBuilder,
    private toaster: ToastrService,
    private ApiService: GroupService,
    private governorateApiService:GovernorateApiService,
    private router: Router,
    private route: ActivatedRoute) { this.maxDate = new Date(); }
  //#endregion

  //#region  ng OnInit
  ngOnInit(): void {
this.getAllDepartment();
    this.Govern_id = -1;
    
    this.name = localStorage.getItem("name");
    this.nameAr = localStorage.getItem("nameAr");
    this.deptID = localStorage.getItem("deptID");
    if (this.route.snapshot.paramMap.get('id')) {
      this.InitForm(this.name,this.nameAr,this.deptID)
      this.ApiService.GetDepartment(this.deptID).subscribe(
        response => {          
          this.DepartmentTitle = response.data[0].name;
        },
        err => {
          Swal.fire({
            icon: 'error',
            title: 'خطأ',
            text: err.error,
          })
        }
      )
           
      this.update = true;
    } else {
      this.update = false;
      this._InitForm();
      this.DepartmentTitle = "أختر قسم";
    }
  }
  //#endregion

  //#region  Init Form
  InitForm(name:any,nameAr:any,deptID:any) {
    this.InsertForm = this._formBuilder.group({
      name: [name, Validators.required],
      nameAr: [nameAr, Validators.required],
      deptID: [deptID, Validators.required],
    });
  }
  _InitForm() {
    this.InsertForm = this._formBuilder.group({
      name: ['', Validators.required],
      nameAr: ['', Validators.required],
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
        text: "أختر قسم أولا",
      })
    }else
    {
      this.ApiService.Insert({
        
        name: this.InsertForm.get('name').value,
        nameAr: this.InsertForm.get('nameAr').value,
        deptID: this.InsertForm.get('deptID').value,
      }).subscribe(
        response => {
          Swal.fire({
            icon: 'success',
            title: "تم إدخال المجموعة بنجاح",
            showConfirmButton: false,
            timer: 1500
          })
          this.router.navigateByUrl("content/admin/Groups");
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

  //#region Update Cities
  Update() {
    let id = this.route.snapshot.paramMap.get('id'); 
    this.ApiService.Update(id, {
          "id": id,
          "name": this.InsertForm.get('name').value,
          "nameAr": this.InsertForm.get('nameAr').value,
          "deptID": this.InsertForm.get('deptID').value,
      }).subscribe(
      response => {        
        Swal.fire({
          icon: 'success',
          title: "تم تعديل المجموعة بنجاح",
          showConfirmButton: false,
          timer: 1500
        })
        this.router.navigateByUrl("content/admin/Groups");
        localStorage.removeItem("name");
        localStorage.removeItem("nameAr");
        localStorage.removeItem("name");
        localStorage.removeItem("deptID");
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

  //#region Selected Governorate
  SelectedItem(event:any){
    this.InsertForm.patchValue({deptID:event.target.value})      
  }
  //#endregion

  //#region  get 
    get() {
      this.ApiService.GetDepartment(this.deptID).subscribe(
        response => {
          // this.Governorate_List = response.data;
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


    //#region  get 
    getAllDepartment() {
      this.ApiService.GetAllDepartment().subscribe(
        response => {          
          this.Dept_List = response.data;
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

}
