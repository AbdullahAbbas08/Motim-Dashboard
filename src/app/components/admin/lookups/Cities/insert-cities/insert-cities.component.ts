import { stringify } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { GovernorateApiService } from 'src/app/shared/API-Service/governorate-api.service';
import { Error_Message } from 'src/app/shared/Constants/Error_Message';
import { GetGovernorate } from 'src/app/shared/Models/GetGovernorate';
import { InsertCities } from 'src/app/shared/Models/InsertCities';
import Swal from 'sweetalert2';
import { CitiesApiService } from '../../../../../shared/API-Service/cities-api.service';


@Component({
  selector: 'app-insert-cities',
  templateUrl: './insert-cities.component.html',
  styleUrls: ['./insert-cities.component.css']
})
export class InsertCitiesComponent implements OnInit {

  //#region Decalre varaibles
  InsertForm: FormGroup;
  maxDate: Date;
  update: boolean;
  Governorate_Dictionary:{[Id:number]:string} = {}
  Governorate_List:GetGovernorate[];
  Govern_id:number;
  Governorate:string="أختر المنطقة";
  Governorateobj:any;

  //#endregion

  //#region  constructor
  constructor(private _formBuilder: FormBuilder,
    private toaster: ToastrService,
    private citiesApiService: CitiesApiService,
    private governorateApiService:GovernorateApiService,
    private router: Router,
    private route: ActivatedRoute) { this.maxDate = new Date(); }
  //#endregion

  //#region  ng OnInit
  ngOnInit(): void {

    this.Govern_id = -1;
    this.getGovernoate();
    
    this.Governorateobj = JSON.parse(localStorage.getItem("Governorate"));

    if (this.route.snapshot.paramMap.get('id')) {
      this.InitForm(this.Governorateobj)
      this.governorateApiService.GetGovernorate().subscribe(
        response => {
          this.Governorate = response.data.find(x=>x.regionID == this.Governorateobj.regionId)?.regionName;
        },
        err => {
          Error_Message.Message();
        }
      )
           
      this.update = true;
    } else {
      this.update = false;
      this._InitForm();
      this.Governorate = "أختر المحافظة";
    }
  }
  //#endregion

  //#region  Init Form
  InitForm(obj: any) {
    this.InsertForm = this._formBuilder.group({
      name: [obj.name, Validators.required],
      nameAr: [obj.nameAr, Validators.required],
      code: [obj.code, Validators.required],
      // order: ['', Validators.required],
      regionId: [obj.regionCode, Validators.nullValidator],
    });
  
    
  }
  _InitForm() {
    this.InsertForm = this._formBuilder.group({
      name: ['', Validators.required],
      nameAr: ['', Validators.required],
      code: ['', Validators.required],
      // order: ['', Validators.required],
      regionId: [-1, Validators.nullValidator],
    });
  }
  //#endregion

  //#region  Insert Cities Method
  InsertCities() {
    console.log("riehgt : ",this.InsertForm.get('regionId').value);
    // console.log("this.InsertForm.get('GovernorateId') : ",this.InsertForm.get('GovernorateId').value);
    if(this.InsertForm.get('regionId').value == -1){
      Swal.fire({
        icon: 'error',
        title: 'خطأ',
        text: "أختر المحافظة أولا",
      })
    }else
    {
     
      
      this.citiesApiService.InsertCities({
        
        name: this.InsertForm.get('name').value,
        nameAr: this.InsertForm.get('nameAr').value,
        code: this.InsertForm.get('code').value,
        // order: this.InsertForm.get('order').value,
        regionId: this.InsertForm.get('regionId').value
      } as InsertCities).subscribe(
        response => {
          Swal.fire({
            icon: 'success',
            title: "تم إدخال المدينة بنجاح",
            showConfirmButton: false,
            timer: 1500
          })
          this.router.navigateByUrl("content/admin/Get-cities");
        },
        err => {
          Error_Message.Message();
        }
      )
    }
  
  }
  //#endregion

  //#region Update Cities
  UpdateCities() {

    if(!(this.InsertForm.get('regionId').value == -1)){
      let id = this.Governorateobj.id;
      this.citiesApiService.UpdateCities(id, {
        id: id,
        name: this.InsertForm.get('name').value,
          nameAr: this.InsertForm.get('nameAr').value,
          code: this.InsertForm.get('code').value,
          order: 0,
          regionId: this.InsertForm.get('regionId').value
      }).subscribe(
        response => {
          console.log("response : ",response);
          
          Swal.fire({
            icon: 'success',
            title: "تم تعديل المدينة بنجاح",
            showConfirmButton: false,
            timer: 1500
          })
          this.router.navigateByUrl("content/admin/Get-cities");
          localStorage.removeItem("Governorate");
        },
        err => {
          Error_Message.Message();
        }
      )
    }
    else{
      Swal.fire({
        icon: 'error',
        title: 'خطأ',
        text: "أختر المنطقة أولا",
      })
    }
   
  }
  //#endregion

  //#region Selected Governorate
  SelectedGovernorate(event:any){
    this.InsertForm.patchValue({
      regionId:event.target.value
    })
  }
  //#endregion

  //#region  get Governoate
    getGovernoate() {
      this.governorateApiService.GetGovernorate().subscribe(
        response => {
          this.Governorate_List = response.data;
          // console.log(response);

          // response.data.forEach(element => {
            
          //   if(element.regionID ==this.Governorateobj.nameAr ){
          //     this.Governorate = element.regionNameAR
          //     this.InsertForm.patchValue({
          //       regionId:element.regionID
          //     })
          //   }
          //  });
        },
        err => {
          Error_Message.Message();
        }
      )
    }
    //#endregion

}
