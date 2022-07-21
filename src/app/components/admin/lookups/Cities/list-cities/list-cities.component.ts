import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { CitiesApiService } from 'src/app/shared/API-Service/cities-api.service';
import { GovernorateApiService } from 'src/app/shared/API-Service/governorate-api.service';
import { Error_Message } from 'src/app/shared/Constants/Error_Message';
import { GenericResponse } from 'src/app/shared/Models/GenericResponse';
import { getCities } from 'src/app/shared/Models/getCities';
import { getCitiesWithGovernorate } from 'src/app/shared/Models/getCitiesWithGovernorate';
import { GetGovernorate } from 'src/app/shared/Models/GetGovernorate';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-cities',
  templateUrl: './list-cities.component.html',
  styleUrls: ['./list-cities.component.css']
})
export class ListCitiesComponent implements OnInit {

  //#region  Declare Variables
  response: getCitiesWithGovernorate[];
  Response_List: getCities[];
  Filtered_List: getCities[];
  Govern_id: number;
  Governorate_List: GetGovernorate[];
  dropdownSettings: IDropdownSettings = {};
  dropdownList: any = [];
  selectedItem:any = [];
  //#endregion

  //#region constructor
  constructor(private citiesApiService: CitiesApiService,
    private governorateApiService: GovernorateApiService,
    private router: Router) { }
  //#endregion

  //#region  ng OnInit
  ngOnInit(): void {
    this.Response_List = [];
    this.getGovernoate();
    this.GetCities();
    
    this.dropdownSettings = {
      singleSelection: true,
      idField: 'regionID',
      textField: 'regionNameAR',
      selectAllText: 'اختر الكل',
      unSelectAllText: 'الغاء اختر الكل',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };
  }
  //#endregion
  onItemSelect(item: any) {
    this.Govern_id = item.regiodId;
    if (item.regiodId == -1)
      this.Filtered_List = this.Response_List;
    else
    this.Filtered_List = this.Response_List.filter(x => x.regionId == item.regionID);
    // console.log("---",this.EmployeeForm.get('Clients').value)
  }
  onItemDeSelect(item:any){
    this.Filtered_List = this.Response_List;
  }

  onSelectAll(items: any) {
    // console.
  }
  //#region Consume API's

  //#region  get Governoate
  GetCities() {
    this.citiesApiService.GetCitiesWithGovernorate().subscribe(
      (response:any) => {
        this.response = response.data;
        
        this.Response_List = response.data;
        this.Filtered_List = response.data;
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
      text: "هل انت متأكد من حذف هذه المدينة ؟ ",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#F00',
      cancelButtonColor: '#d33',
      confirmButtonText: 'حذف',
      cancelButtonText: 'إنهاء',
    })
      .then((result) => {

        if (result.isConfirmed) {
          
          this.citiesApiService.DeleteCities(id).subscribe(
            response => {
              this.GetCities();
              Swal.fire({
                icon: 'success',
                title: "تم حذف المدينة بنجاح",
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
    this.router.navigateByUrl("content/admin/insert-city");
  }
  //#endregion

  //#region Governoate
  update( obj: any) {
    
    localStorage.setItem("Governorate",JSON.stringify(obj));    
    this.router.navigate(['content/admin/update-city', obj.regionId]);
  }
  //#endregion

  //#region Selected Governorate
  SelectedGovernorate(event: any) {
    this.Govern_id = event.target.value;
    if (event.target.value == -1)
      this.Filtered_List = this.Response_List;
    else
      this.Filtered_List = this.Response_List.filter(x => x.regionId == event.target.value);
  }
  //#endregion

  //#region  get Governoate
  getGovernoate() {
    this.governorateApiService.GetGovernorate().subscribe(
      response => {
        this.Governorate_List = response.data;
        this.dropdownList = response.data;

        // response.data.forEach(element => {
        //   this.Governorate_List[element.id] = element.title;
        // });
      },
      err => {
        Error_Message.Message();
      }
    )
  }
  //#endregion


}
