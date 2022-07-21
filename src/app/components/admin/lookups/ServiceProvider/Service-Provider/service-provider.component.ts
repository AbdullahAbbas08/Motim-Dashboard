import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DepartmentService } from 'src/app/shared/API-Service/department.service';
import { Error_Message } from 'src/app/shared/Constants/Error_Message';
import { GenericResponse } from 'src/app/shared/Models/GenericResponse';
import { GetGovernorate } from 'src/app/shared/Models/GetGovernorate';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-departments',
  templateUrl: './service-provider.component.html',
  styleUrls: ['./service-provider.component.css']
})
export class DepartmentsComponent implements OnInit {


  //#region  Declare Variables
  response: GenericResponse<GetGovernorate>;
  Response_List: GetGovernorate[];
  //#endregion

  //#region constructor
  constructor( private ApiService:DepartmentService , private router:Router) { }
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
    debugger
    this.ApiService.Get().subscribe(
      response => {
        debugger
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
    debugger
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
        debugger
          this.ApiService.Delete(id).subscribe(
            response=>{
              debugger
              this.get();
               Swal.fire({
                    icon: 'success',
                    title: "تم حذف القسم بنجاح",
                    showConfirmButton: false,
                    timer: 1500}) 
                  },
            err=>{
              debugger
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
    this.router.navigateByUrl("content/admin/InsertDepartment");
  }
  //#endregion

  //#region Governoate
  update(id:number,obj:any){    
    localStorage.setItem("DepartmentnameAr",JSON.stringify(obj.name))
    localStorage.setItem("DepartmentdescriptionAr",JSON.stringify(obj.description))
   
    this.router.navigate(['content/admin/InsertDepartment',id]);
  }
  //#endregion

}
