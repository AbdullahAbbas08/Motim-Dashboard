import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClientApiService } from 'src/app/shared/API-Service/client-api.service';
import { GovernorateApiService } from 'src/app/shared/API-Service/governorate-api.service';
import { Error_Message } from 'src/app/shared/Constants/Error_Message';
import { GenericResponse } from 'src/app/shared/Models/GenericResponse';
import { GetGovernorate } from 'src/app/shared/Models/GetGovernorate';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-service-provider-data',
  templateUrl: './service-provider-data.component.html',
  styleUrls: ['./service-provider-data.component.css']
})
export class ServiceProviderDataComponent implements OnInit {

  //#region  Declare Variables
  Response_List: any[] = [];
  //#endregion

  //#region constructor
  constructor(  private ApiService: ClientApiService, private router:Router) { }
  //#endregion

  ngOnInit(): void {
    this.Response_List = [];
    this.get();
  }

  get() {
    debugger
    this.ApiService.GetAllProfile().subscribe(
      response => {
        debugger
        this.Response_List = response;
        console.log(response);
        
      },
      err => {
        Error_Message.Message();
      }
    )
  }
  //#endregion

  //#region  Delete Governoate
  // Delete(id:number){
  //   debugger
  //   Swal.fire({
  //     title: ' تحذير !',
  //     text: "هل انت متأكد من حذف هذا العنصر ؟ ",
  //     icon: 'warning',
  //     showCancelButton: true,
  //     confirmButtonColor: '#F00',
  //     cancelButtonColor: '#d33',
  //     confirmButtonText: 'حذف',
  //     cancelButtonText: 'إنهاء',
  //   })
  //   .then((result) => {

  //     if (result.isConfirmed) {
  //         this.ApiService.GetAllProfile(id).subscribe(
  //           response=>{
  //             debugger
  //             this.getGovernoate();
  //              Swal.fire({
  //                   icon: 'success',
  //                   title: "تم حذف المحافظة بنجاح",
  //                   showConfirmButton: false,
  //                   timer: 1500}) 
  //                 },
  //           err=>{
  //             debugger
  //             Swal.fire({
  //               icon: 'error',
  //               title: 'خطأ',
  //               text: err.error,
  //             })
  //           }
  //         )
        
  //     } else {
  //       // Swal.fire(
  //       //   'Your appointment still active ',
  //       // );
  //     }
  //   }); 
  // }
  //#endregion
  
  //#endregion

  //#region AddNew
  AddNew(){
    this.router.navigateByUrl("content/admin/Insertserviceprovider");
  }
  //#endregion

  //#region Governoate
  // update(id:number,title:any){
  //   debugger
  //   this.governorateApiService.title = title;
  //   localStorage.setItem("riskgovernorate",JSON.stringify(title))
  //   this.router.navigate(['content/admin/update-governorate',id]);
  // }
  //#endregion


}
