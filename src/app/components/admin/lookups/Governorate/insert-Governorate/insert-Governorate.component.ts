import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { GovernorateApiService } from '../../../../../shared/API-Service/governorate-api.service';
import { InsertGovernorate } from '../../../../../shared/Models/InsertGovernorate';


@Component({
  selector: 'app-insert-governorate',
  templateUrl: './insert-Governorate.component.html',
  styleUrls: ['./insert-Governorate.component.css']
})
export class GovernorateComponent implements OnInit {

  //#region Decalre varaibles
  InsertForm: FormGroup;
  maxDate: Date;
  update:boolean;
  //#endregion

  //#region  constructor
  constructor(private _formBuilder: FormBuilder,
              private toaster: ToastrService,
              private governorateApiService:GovernorateApiService,
              private router:Router,
              private route: ActivatedRoute) 
  { this.maxDate = new Date(); }
  //#endregion

  //#region  ng OnInit
  ngOnInit(): void {
   debugger
    if(this.route.snapshot.paramMap.get('id')){
      this.governorateApiService.title =  JSON.parse(localStorage.getItem("riskgovernorate"));
      this.InitForm(this.governorateApiService.title)
      this.update = true;
      console.log(this.update);
    }else
    {
      this.update = false;
      console.log(this.update);
      
      this._InitForm();
    }
  }
  //#endregion

  //#region  Init Form
  InitForm(title:any){
    debugger
    this.InsertForm = this._formBuilder.group({
      regionName: [title.regionName,Validators.required],
      regionNameAR: [title.regionNameAR,Validators.required],
      regionCode: [title.regionCode,Validators.required],
      regionOrder: [title.regionOrder,Validators.required],
    });
  }
  _InitForm(){
    debugger
    this.InsertForm = this._formBuilder.group({
      regionName: ['',Validators.required],
      regionNameAR: ['',Validators.required],
      regionCode: ['',Validators.required],
      regionOrder: [0,Validators.required],
    });
  }
  //#endregion

  //#region  Insert Client-Type Method
  InsertGovernorate(){     
    debugger   
    this.governorateApiService.InsertGovernorate(this.InsertForm.value).subscribe(
      response=>{
        debugger
        Swal.fire({
          
          icon: 'success',
          title: "تم إدخال المحافظة بنجاح",
          showConfirmButton: false,
          timer: 1500
        })
        this.router.navigateByUrl("content/admin/Get-governorate");
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
  UpdateGovernorate(){
    let id = +this.route.snapshot.paramMap.get('id');
    this.governorateApiService.UpdateGovernorate(id,this.InsertForm.value).subscribe(
      response=>{
        Swal.fire({
          icon: 'success',
          title: "تم تعديل المحافظة بنجاح",
          showConfirmButton: false,
          timer: 1500
        })
        this.router.navigateByUrl("content/admin/Get-governorate");
        localStorage.removeItem("riskgovernorate");
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
