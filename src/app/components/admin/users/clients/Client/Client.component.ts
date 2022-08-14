import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClientApiService } from 'src/app/shared/API-Service/client-api.service';
import { Error_Message } from 'src/app/shared/Constants/Error_Message';
import { GenericResponse } from 'src/app/shared/Models/GenericResponse';
import { GetClient } from 'src/app/shared/Models/GetClient';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-Client',
  templateUrl: './Client.component.html',
  styleUrls: ['./Client.component.css']
})
export class ClientComponent implements OnInit {

  //#region  Declare Variables
  response: GenericResponse<GetClient>;
  Client_List: any[];
  //#endregion

  //#region constructor
  constructor(private ApiService: ClientApiService , private router:Router) { }
  //#endregion

  //#region  ng OnInit
  ngOnInit(): void {
    this.Client_List = [];
    this.GetClient();
  }
  //#endregion

  //#region Consume API's

  //#region  Get Client
  GetClient() {
    this.ApiService.GetClient().subscribe(
      response => {
        this.response = response;
        this.Client_List = response.data;
        
      },
      err => {
        Error_Message.Message();
      }
    )
  }
  //#endregion

  //#region  Delete Client 
  DeleteClient(id:string){    
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
          this.ApiService.DeleteClient(id).subscribe(
            response=>{
              this.GetClient();
               Swal.fire({
                    icon: 'success',
                    title: "تم حذف متطلب الخدمة بنجاح",
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

  //#region Add New
  NavigateToInsertClient(){
    this.router.navigateByUrl("content/admin/InsertClient");
  }
  //#endregion
  AddNew() {
    this.router.navigateByUrl("content/admin/InsertClient");
  }
  //#region update Client
  updateClient(ClientId:any, Client:any){
    this.ApiService.Client = Client;
    // console.log("Client : ",Client);
    
    localStorage.setItem("RequirementClientData",JSON.stringify(Client));
    
    this.router.navigate(['content/admin/updateClient',Client.id]);
  }
  //#endregion
}
