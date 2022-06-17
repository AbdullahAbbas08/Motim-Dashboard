import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ClientTypeApiService } from 'src/app/shared/API-Service/client-type-api.service';
import { GetClientType } from 'src/app/shared/Models/GetClientType';
import { InsertClientType } from 'src/app/shared/Models/insert-client-type';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-client-type',
  templateUrl: './client-type.component.html',
  styleUrls: ['./client-type.component.css']
})
export class ClientTypeComponent implements OnInit {

  //#region Decalre varaibles
  ClientTypeForm: FormGroup;
  _InsertClientType:InsertClientType;
  maxDate: Date;
  update:boolean;
  //#endregion

  //#region  constructor
  constructor(private _formBuilder: FormBuilder,
              private toaster: ToastrService,
              private clientTypeApiService:ClientTypeApiService,
              private router:Router,
              private route: ActivatedRoute) 
  { this.maxDate = new Date(); }
  //#endregion

  //#region  ng OnInit
  ngOnInit(): void {
   
    if(this.route.snapshot.paramMap.get('id')){
      this.InitForm( localStorage.getItem("clientTypeTitle"))
      this.update = true;
    }else
    {
      this.update = false;
      this._InitForm();
    }
  }
  //#endregion

  //#region  Init Form
  InitForm(title:string){
    this.ClientTypeForm = this._formBuilder.group({
      firstName: [title, Validators.required],
    });
  }
  _InitForm(){
    this.ClientTypeForm = this._formBuilder.group({
      firstName: ['', Validators.required],
    });
  }
  //#endregion

  //#region  Insert Client-Type Method
  InsertClientType(){    
    console.log({title:this.ClientTypeForm.get('firstName').value} as InsertClientType );
    
    this.clientTypeApiService.InsertClientType({title:this.ClientTypeForm.get('firstName').value} as InsertClientType  ).subscribe(
      response=>{
        Swal.fire({
          icon: 'success',
          title: "تم إدخال نوع عميل بنجاح",
          showConfirmButton: false,
          timer: 1500
        })
        this.router.navigateByUrl("content/admin/Get-client-type");
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
    let id = +this.route.snapshot.paramMap.get('id');
    this.clientTypeApiService.UpdateClientType(id,{title:this.ClientTypeForm.get('firstName').value} as InsertClientType).subscribe(
      response=>{
        Swal.fire({
          icon: 'success',
          title: "تم تعديل نوع عميل بنجاح",
          showConfirmButton: false,
          timer: 1500
        })
        this.router.navigateByUrl("admin/Get-client-type");
        localStorage.removeItem("clientTypeTitle")
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


}
