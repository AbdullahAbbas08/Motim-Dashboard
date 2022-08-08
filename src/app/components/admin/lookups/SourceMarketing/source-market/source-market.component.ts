import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GroupService } from 'src/app/shared/API-Service/group.service';
import { SourceMarketApiService } from 'src/app/shared/API-Service/source-market-api.service';
import { Error_Message } from 'src/app/shared/Constants/Error_Message';
import { GenericResponse } from 'src/app/shared/Models/GenericResponse';
import { GetServices } from 'src/app/shared/Models/getServices';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-source-market',
  templateUrl: './source-market.component.html',
  styleUrls: ['./source-market.component.css']
})
export class SourceMarketComponent implements OnInit {

  //#region  Declare Variables
  response: GenericResponse<GetServices>;
  Response_List: GetServices[];
  selectedItemsgroup:any[]=[];

  //#endregion

  //#region constructor
  constructor(private ApiService: SourceMarketApiService,
    private router: Router,private GroupService:GroupService) { }

  //#endregion

  //#region  ng OnInit
  ngOnInit(): void {
    this.Response_List = [];
    this.Get();
  }
  //#endregion

  //#region Consume API's

  //#region  Get Call Reason
  Get() {
    this.ApiService.Get().subscribe(
      response => {
        this.response = response;
        this.Response_List = response.data;
      },
      err => {
        Error_Message.Message();
      }
    )
  }
  //#endregion

  //#region  Delete Governoate
  Delete(id: number) {
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
          
          this.ApiService.Delete(id).subscribe(
            response => {
              this.Get();
              Swal.fire({
                icon: 'success',
                title: "تم حذف الخدمة بنجاح",
                showConfirmButton: false,
                timer: 1500
              })
            },
            err => {
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
  AddNew() {
    this.router.navigateByUrl("content/admin/InsertSourceMarket");
  }
  //#endregion

  //#region Governoate
  update(id: number,service: any) {
    this.ApiService.service = service;
    this.GroupService.Getallgroup().subscribe(
      response => {  
        response.data.filter(x=>x.serviceID == id).forEach(element => {
            // this.selectedItemsgroup.push({"id":element.groupId,"nameAr":element.nameAR})
            this.selectedItemsgroup.push(element)
            
        });  
            localStorage.setItem("selectedItemsgroup",JSON.stringify(this.selectedItemsgroup))
      },
      err => {
        Error_Message.Message();
      }
    ) 

    localStorage.setItem("service",JSON.stringify(service))
    setTimeout(() => {
      this.router.navigate(['content/admin/updateSourceMarket', id]);
    }, 3000);
  }
  //#endregion


}
