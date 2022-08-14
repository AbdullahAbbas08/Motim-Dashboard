import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Error_Message } from 'src/app/shared/Constants/Error_Message';
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
    }else
    {
      this.update = false;
      
      this._InitForm();
    }
  }
  //#endregion

  //#region  Init Form
  InitForm(title:any){
    this.InsertForm = this._formBuilder.group({
      regionID:[title.regionID,Validators.nullValidator],
      regionName: [title.regionName,Validators.required],
      regionNameAR: [title.regionNameAR,Validators.required],
      regionCode: [title.regionCode,Validators.required],
      regionOrder: [title.regionOrder,Validators.required],
    });
  }
  _InitForm(){
    this.InsertForm = this._formBuilder.group({
      regionID:[],
      regionName: ['',Validators.required],
      regionNameAR: ['',Validators.required],
      regionCode: ['',Validators.required],
      regionOrder: [0,Validators.required],
    });
  }
  //#endregion

  //#region  Insert Client-Type Method
  InsertGovernorate(){     
    this.governorateApiService.InsertGovernorate(this.InsertForm.value).subscribe(
      response=>{
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
    this.governorateApiService.UpdateGovernorate(id,{
      "regionID": this.InsertForm.get('regionID').value,
      "regionName": this.InsertForm.get('regionName').value,
      "regionNameAR": this.InsertForm.get('regionNameAR').value,
      "regionCode": this.InsertForm.get('regionCode').value,
      "regionOrder": this.InsertForm.get('regionOrder').value
    }).subscribe(
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
        Error_Message.Message();
      }
    )
  }
  //#endregion


}
