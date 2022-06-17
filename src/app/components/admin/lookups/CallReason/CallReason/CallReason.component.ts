import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CallReasonApiService } from 'src/app/shared/API-Service/call-reason-api.service';
import { GenericResponse } from 'src/app/shared/Models/GenericResponse';
import { GetCallReason } from 'src/app/shared/Models/get-call-reason';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-CallReason',
  templateUrl: './CallReason.component.html',
  styleUrls: ['./CallReason.component.css']
})
export class CallReasonComponent implements OnInit {

  //#region  Declare Variables
  response: GenericResponse<GetCallReason>;
  Response_List: GetCallReason[];
  isSearching: string = '';

  //#endregion

  //#region constructor
  constructor(private ApiService: CallReasonApiService,
    private router: Router) { }
  //#endregion

  //#region  ng OnInit
  ngOnInit(): void {
    this.Response_List = [];
    this.GetCallReason();
  }
  //#endregion

  //#region Consume API's

  //#region  Get Call Reason
  getPackage(){
    if(!this.isSearching){
      this.ApiService.GetCallReason().subscribe(
        response => {
          this.response = response;
          this.Response_List = response.data;
          // console.log(response);
          
        },
        err => {
          Swal.fire({
            icon: 'error',
            title: 'خطأ',
            text: err.error,
          })
        }
      )
    }else{
      this.ApiService.GetPackageByName(this.isSearching).subscribe(
        response => {
          this.response = response;
          this.Response_List = response.data;
          // console.log(response);
          
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
  }
  GetCallReason() {
    this.ApiService.GetCallReason().subscribe(
      response => {
        this.response = response;
        this.Response_List = response.data;
        // console.log(response);
        
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
    debugger
    Swal.fire({
      title: ' تحذير !',
      text: "هل انت متأكد من حذف هذه الباقة ؟ ",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#F00',
      cancelButtonColor: '#d33',
      confirmButtonText: 'حذف',
      cancelButtonText: 'إنهاء',
    })
      .then((result) => {

        if (result.isConfirmed) {
          
          this.ApiService.DeleteCallReason(id).subscribe(
            response => {
              this.GetCallReason();
              Swal.fire({
                icon: 'success',
                title: "تم حذف الباقة  بنجاح",
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
    this.router.navigateByUrl("content/admin/insert-call-reason");
  }
  //#endregion

  //#region Governoate
  update(packageUpdating:GetCallReason) {
    this.ApiService.package = packageUpdating;
    localStorage.setItem("package",JSON.stringify(packageUpdating))
    this.router.navigate(['content/admin/update-call-reason', packageUpdating.packageID]);
  }
  //#endregion

}
