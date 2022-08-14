import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CategoriesService } from 'src/app/shared/API-Service/Categories.service';
import { Error_Message } from 'src/app/shared/Constants/Error_Message';
import { GenericResponse } from 'src/app/shared/Models/GenericResponse';
import { GetCategories } from 'src/app/shared/Models/GetCategories';
import { Roles } from 'src/app/shared/Models/Roles';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {


  //#region  Declare Variables
  response: GenericResponse<GetCategories>;
  Employee_List: GetCategories[];
  //#endregion
  isSearching: string = '';

  //#region constructor
  constructor(private ApiService: CategoriesService, private router: Router) { }
  //#endregion

  //#region  ng OnInit
  ngOnInit(): void {
    this.GetEmployee()
  }
  //#endregion

  //#region Consume API's

  //#region  Get Employee
  GetEmployee() {
    if (!this.isSearching) {
      this.ApiService.GetCategories().subscribe(
        response => {
          this.response = response;
          this.Employee_List = response.data;
        },
        err => {

          Error_Message.Message();
        }
      )
    }else{
      this.ApiService.GetCategoriesByName(this.isSearching).subscribe(
        response => {
          this.response = response;
          this.Employee_List = response.data;
        },
        err => {

          Error_Message.Message();
        }
      )
    }
  }
  //#endregion


  //#region  Get Employee
  GetCategoriesSearch() {
    this.ApiService.GetCategories().subscribe(
      response => {
        this.response = response;
        this.Employee_List = response.data;
      },
      err => {

        Error_Message.Message();
      }
    )
  }
  //#endregion

  //#region  Delete Employee 
  DeleteEmployee(id: string) {
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
          this.ApiService.DeleteEmployee(id).subscribe(
            response => {
              this.GetEmployee();
              Swal.fire({
                icon: 'success',
                title: "تم حذف التصنيف بنجاح",
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

  //#region Add New Employee
  NavigateToInsert() {
    this.router.navigateByUrl("content/admin/InsertCategory");
  }
  //#endregion

  //#region update Employee
  updateEmployee(id: string, model: GetCategories) {
    this.ApiService.Category = model;
    localStorage.setItem("RiskEmployeeData", JSON.stringify(this.ApiService.Category));

    this.router.navigate(['content/admin/updateCategory', model.id]);
  }
  //#endregion


}
