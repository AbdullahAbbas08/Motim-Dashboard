import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClientTypeApiService } from 'src/app/shared/API-Service/client-type-api.service';
import { GenericResponse } from 'src/app/shared/Models/GenericResponse';
import { GetClientType } from 'src/app/shared/Models/GetClientType';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-client-type',
  templateUrl: './list-client-type.component.html',
  styleUrls: ['./list-client-type.component.css']
})
export class ListClientTypeComponent implements OnInit {

  //#region  Declare Variables
  response: GenericResponse<GetClientType>;
  Client_Type_List: GetClientType[];
  //#endregion

  //#region constructor
  constructor(private clientTypeApiService: ClientTypeApiService , private router:Router) { }
  //#endregion

  //#region  ng OnInit
  ngOnInit(): void {
    this.Client_Type_List = [];
    this.getClientType();
  }
  //#endregion

  //#region Consume API's

  //#region  Get Client Types
  getClientType() {
    this.clientTypeApiService.GetClientType().subscribe(
      response => {
        this.response = response;
        this.Client_Type_List = response.data;
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

  //#region  Delete Client Type
  DeleteClient(id:number){
    Swal.fire({
      title: ' تحذير !',
      text: "هل انت متأكد من حذف هذا العنصر ؟ ",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#F00',
      cancelButtonColor: '#d33',
      confirmButtonText: 'حذف',
      cancelButtonText: 'إنهاء',
    })
    .then((result) => {

      if (result.isConfirmed) {
          this.clientTypeApiService.DeleteClientType(id).subscribe(
            response=>{
              this.getClientType();
               Swal.fire({
                    icon: 'success',
                    title: "تم حذف نوع عميل بنجاح",
                    showConfirmButton: false,
                    timer: 1500}) 
                  },
            err=>{
              Swal.fire({
                icon: 'error',
                title: 'خطأ',
                text: err.error,
              })
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
    this.router.navigateByUrl("content/admin/client-type");
  }
  //#endregion

  //#region updateClient
  updateClient(id:number,title:string){
    this.clientTypeApiService.title = title;
    localStorage.setItem("clientTypeTitle",title);
    this.router.navigate(['content/admin/update-client-type',id]);
  }
  //#endregion

}
