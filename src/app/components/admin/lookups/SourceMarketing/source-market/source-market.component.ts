import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SourceMarketApiService } from 'src/app/shared/API-Service/source-market-api.service';
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

  //#endregion

  //#region constructor
  constructor(private ApiService: SourceMarketApiService,
    private router: Router) { }
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
        Swal.fire({
          icon: 'error',
          title: 'خطأ',
          text: err.error,
        })
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
  AddNew() {
    this.router.navigateByUrl("content/admin/InsertSourceMarket");
  }
  //#endregion

  //#region Governoate
  update(id: number,service: any) {
    this.ApiService.service = service;
    localStorage.setItem("service",JSON.stringify(service))
    this.router.navigate(['content/admin/updateSourceMarket', id]);
  }
  //#endregion


}
