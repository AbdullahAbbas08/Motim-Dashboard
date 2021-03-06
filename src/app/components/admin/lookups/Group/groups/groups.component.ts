import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GroupService } from 'src/app/shared/API-Service/group.service';
import { Error_Message } from 'src/app/shared/Constants/Error_Message';
import { GenericResponse } from 'src/app/shared/Models/GenericResponse';
import { GetGovernorate } from 'src/app/shared/Models/GetGovernorate';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.css']
})
export class GroupsComponent implements OnInit {

  //#region  Declare Variables
  response: GenericResponse<GetGovernorate>;
  Response_List: GetGovernorate[];
  //#endregion

  //#region constructor
  constructor( private ApiService:GroupService , private router:Router) { }
  //#endregion

  //#region  ng OnInit
  ngOnInit(): void {
    this.Response_List = [];
    this.get();
  }
  //#endregion

  //#region Consume API's

  //#region  get Governoate
  get() {
    this.ApiService.Get().subscribe(
      response => {
        // console.log(response);
        
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
  Delete(id:number){
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
            response=>{
              this.get();
               Swal.fire({
                    icon: 'success',
                    title: "تم حذف المحافظة بنجاح",
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
    this.router.navigateByUrl("content/admin/InsertGroup");
  }
  //#endregion

  //#region Governoate
  update(obj:any){     
    localStorage.setItem("name",obj.name)
    localStorage.setItem("nameAr",obj.nameAr)
    localStorage.setItem("deptID",obj.deptID)
    this.router.navigate(['content/admin/InsertGroup',obj.id]);
  }
  //#endregion

}
