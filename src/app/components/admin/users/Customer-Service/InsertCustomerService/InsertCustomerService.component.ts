import { InsertCategory } from './../../../../../shared/Models/InsertCategory';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { ToastrService } from 'ngx-toastr';
import { EmployeeApiService } from 'src/app/shared/API-Service/employee-api.service';
import { ClientApiService } from 'src/app/shared/API-Service/client-api.service';
import { GetEmployee } from 'src/app/shared/Models/GetEmployee';
import { InsertClientType } from 'src/app/shared/Models/insert-client-type';
import { IdNameList } from 'src/app/shared/Models/IdNameList';
import Swal from 'sweetalert2';
import { GetClient } from 'src/app/shared/Models/GetClient';
import { Roles } from 'src/app/shared/Models/Roles';
import { Assign_ClientCustomer } from 'src/app/shared/Models/Assign_ClientCustomer';

@Component({
  selector: 'app-InsertCustomerService',
  templateUrl: './InsertCustomerService.component.html',
  styleUrls: ['./InsertCustomerService.component.css']
})
export class InsertCustomerServiceComponent implements OnInit {

  //#region Decalre varaibles
  EmployeeForm: FormGroup;
  _InsertClientType:InsertClientType;
  maxDate: Date;
  update:boolean;
  pass:string;
  Client_List: GetClient[];
  dropdownSettings: IDropdownSettings = {};
  dropdownList: any = [];
  selectedItems: any[] = [];
  ClientCustumer: Assign_ClientCustomer[] = [];
  selectedItemsIds: number[] = [];
  DefaultSelect:any;
  //#endregion

  //#region  constructor
  constructor(private _formBuilder: FormBuilder,
              private toaster: ToastrService,
              private ApiService:EmployeeApiService,
              private clientApiService: ClientApiService,
              private router:Router,
              private route: ActivatedRoute) 
  { this.maxDate = new Date();
    
    
  }
  //#endregion

  //#region  ng OnInit
  ngOnInit(): void {
   
    this.GetClient()
    
    if(this.route.snapshot.paramMap.get('id')){
      this.ApiService.Employee =JSON.parse(localStorage.getItem("RiskCustomerServiceData")) ;
      this.GetClientRelated(this.ApiService.Employee.id)
      this.InitForm(this.ApiService.Employee)
      this.update = true;
    }else
    {
      this.update = false;
      this._InitForm();
    }

   

    this.dropdownSettings = {
      singleSelection: false,
      idField: 'id',
      textField: 'name',
      selectAllText: 'اختر الكل',
      unSelectAllText: 'الغاء اختر الكل',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };

  }
  //#endregion

  //#region  Init Form
  InitForm(employee:GetEmployee){
    this.EmployeeForm = this._formBuilder.group({
      name: [employee.name, Validators.required],
      username: [employee.userName, Validators.required],
      password: ['', Validators.nullValidator],
      nationalId: [employee.nationalId, Validators.required],
      mobile: [employee.mobile, Validators.required],
      address: [employee.address, Validators.required],
      Clients: [this.selectedItems, Validators.required],

    });
  }
  _InitForm(){
    this.EmployeeForm = this._formBuilder.group({
      name: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', Validators.nullValidator],
      nationalId: ['', Validators.required],
      mobile: ['', Validators.required],
      address: ['', Validators.required],
      Clients: ['', Validators.required],
    });
  }
  //#endregion

  //#region  Insert Employee Method
  InsertEmployee(){    
    
    if(this.EmployeeForm.get('password').value =='')
    {
      Swal.fire({
        icon: 'error',
        title: 'خطأ',
        text:'كلمة المرور مطلوبة',
      })
    }
    else
    {
      this.ApiService.InsertEmployee({ 
        CategoryTitle:this.EmployeeForm.get('name').value ,
        CategoryTitleAR:this.EmployeeForm.get('username').value ,
        CategoryImagePath:this.EmployeeForm.get('nationalId').value ,
        CategoryDescription:this.EmployeeForm.get('address').value ,
        CategoryDescriptionAR:this.EmployeeForm.get('mobile').value ,
        ServicesAvgTime:this.EmployeeForm.get('password').value ,
        CategoryParentId:this.EmployeeForm.get('password').value ,
        Order:this.EmployeeForm.get('password').value ,
      } as InsertCategory).subscribe(
      response=>{
        
        this.EmployeeForm.get('Clients').value.forEach(element => {
          this.ClientCustumer.push({ClientId:element.id,CustomerId:response.iD_Created}as Assign_ClientCustomer);
        });

        this.ApiService.AssignCustomerToClient( this.ClientCustumer ).subscribe(
          data=>{
            Swal.fire({
              icon: 'success',
              title: "تم إضافة الموظف بنجاح",
              showConfirmButton: false,
              timer: 1500
            })
            this.router.navigateByUrl("content/admin/GetCustomerService");
          },
          err=>{
          }
        )
        this.ClientCustumer = [];
      },
      err=>{
        Swal.fire({
          icon: 'error',
          title: 'خطأ',
          text: err.error,
        })
      }
    )
    }
 
  }
  //#endregion

  //#region Update Employee
  UpdateClientType(){

    let id = this.route.snapshot.paramMap.get('id');

  
     this.pass = this.EmployeeForm.get('password').value;

    this.ApiService.UpdateEmployee({ 
      id:id,
      name:this.EmployeeForm.get('name').value ,
      userName:this.EmployeeForm.get('username').value ,
      nationalId:this.EmployeeForm.get('nationalId').value ,
      address:this.EmployeeForm.get('address').value ,
      mobile:this.EmployeeForm.get('mobile').value ,
      password:this.pass ,
      Role:Roles.Agent
    } as GetEmployee).subscribe(
      response=>{

        this.EmployeeForm.get('Clients').value.forEach(element => {
          this.ClientCustumer.push({ClientId:element.id,CustomerId:id}as Assign_ClientCustomer);
        });

        this.ApiService.AssignCustomerToClient( this.ClientCustumer ).subscribe(
          data=>{
           
        Swal.fire({
          icon: 'success',
          title: "تم تعديل بيانات الموظف بنجاح",
          showConfirmButton: false,
          timer: 1500
        })
        this.router.navigateByUrl("content/admin/GetCustomerService");
        localStorage.removeItem("RiskCustomerServiceData");
          },
          err=>{

          }
        )
        this.ClientCustumer = [];
      },
      err=>{
        Swal.fire({
          icon: 'error',
          title: 'خطأ',
          text: err.message,
        })
      }
    )
  }
  //#endregion

    //#region  Get Client
    GetClient() {
      this.clientApiService.GetClientIdName().subscribe(
        response => {
          this.dropdownList = response.data
          // console.log(this.dropdownList);
          
        //  response.data.forEach(element => {
        //    this.dropdownList.push({Id:element.clientId,Name:element.name} );
        //    console.log(this.dropdownList);
        //  });  
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

  onItemSelect(item: any) {
    // console.log("---",this.EmployeeForm.get('Clients').value)
  }

  onSelectAll(items: any) {
    // console.log(items);
  }

  GetClientRelated(id:string){
    this.ApiService.GetClientsRelatedWithAgent(id).subscribe(
      (response)=>{
        this.selectedItems = response.data;
        // console.log("--- : ",response.data);
        
      },
      (err)=>{
          // console.log(err);
          
      }
    )
  }

 
}
