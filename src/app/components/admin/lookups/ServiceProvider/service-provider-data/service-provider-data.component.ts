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

    this.ApiService.GetAllProfile().subscribe(
      response => {
        this.Response_List = response;
        // console.log(response);
        
      },
      err => {
        Error_Message.Message();
      }
    )
  }

  
  //#endregion

  //#region  Delete Governoate
  Delete(id:any){
    Swal.fire({
      title: ' تحذير !',
      text: "هل انت متأكد من عملية الحذف  ؟ ",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#F00',
      cancelButtonColor: '#d33',
      confirmButtonText: 'حذف',
      cancelButtonText: 'إنهاء',
    })
    .then((result) => {

      if (result.isConfirmed) {
          this.ApiService.DeleteUser(id).subscribe(
            response=>{
              this.get()
               Swal.fire({
                    icon: 'success',
                    title: "تمت عملية الحذف  بنجاح",
                    showConfirmButton: false,
                    timer: 1500}) 
                  },
            err=>{
              Error_Message.Message();
            }
          )
        
      } else {
        // Swal.fire(
        //   'Your appointment still active ',
        // );
      }
    }); 
  }
  //#endregion
  
  //#endregion

  //#region AddNew
  AddNew(){
    this.router.navigateByUrl("content/admin/Insertserviceprovider");
  }
  //#endregion

  update(id:string){
    this.router.navigate(['content/admin/Insertserviceprovider',id]);
  }


}
