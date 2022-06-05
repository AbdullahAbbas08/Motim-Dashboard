import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CustomerApiService } from 'src/app/shared/API-Service/customer-api.service';
import { EmployeeApiService } from 'src/app/shared/API-Service/employee-api.service';
import { environment } from 'src/environments/environment.prod';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-agent',
  templateUrl: './agent.component.html',
  styleUrls: ['./agent.component.css']
})
export class AgentComponent implements OnInit {

  constructor( private ApiService:EmployeeApiService,
              private customerApiService:CustomerApiService,
              private router:Router) {    this.imgURL = "../../../assets/images/statics/personAvatar.png";
            }
  imgURL:string ;
  Clients:any;
  MobileRes:any;
  passdata:string;

  ngOnInit(): void {
    this.GetClientRelated(localStorage.getItem('RiskAuthorization'));
  }

  getClientData(data:any){
    Swal.fire({
      title: 'أدخل رقم الموبايل',
      input: 'text',
      inputAttributes: {
        autocapitalize: 'off',
      },
      showCancelButton: true,
      confirmButtonText: 'تحقق',
      showLoaderOnConfirm: true,
      preConfirm: (phone) => {
        this.passdata = phone;
        // return fetch(`${environment.Server_URL}/Customer/GetCustomer?phone=${phone}`)
        //   .then(response => {            
        //     if (!response.ok) { throw new Error(response.statusText)}
        //     return response.json()
        //   })
        //   .catch(error => { Swal.showValidationMessage(`خطأ : ${error}` )
        //   })
      },
      allowOutsideClick: () => !Swal.isLoading()
    }).then((result) => {

      if (result.isConfirmed) {
        
        this.customerApiService.GetCustomerById(this.passdata).subscribe(
          (res)=>{
            // console.log(res["data"]);
            if(res["data"] != null){
              this.customerApiService.CustomerData = res["data"]; 
              localStorage.setItem("Risk_Customer_Data",JSON.stringify( res["data"]));     
              this.router.navigate(["/content/agent/DisplayData",data]);
            }
            else
            {
              this.customerApiService.mobile = this.passdata;
              this.router.navigate(["/content/agent/Customer",data]);
            }
           
          },
          (err)=>{

          }
        )
        // if(result["value"].data != null){             
        //   this.customerApiService.CustomerData = result["value"].data;      
        //   this.router.navigate(["content/agent/Customer",data]);
        // }
        // else
        // {
        //   this.router.navigate(["content/agent/Customer",data]);
        // }
       
        
        // if(code == result.value.login )
        // {
          // this.toastr.success('Code Success ' , 'Success');
        //   this.create(this.CreateUser); 
        // }
        // else
        // {
        //   this.ShowPopup(code);
        //   this.toastr.error('Please make sure that the code sent is correct' , 'Incorrect Code');
        // }
      }
    })
    
  }
  GetClientRelated(id:string){
    this.ApiService.GetClientRelated(id).subscribe(
      (response)=>{
        this.Clients = response.data;
        console.log("---------- : ",response.data);
        
      },
      (err)=>{
          // console.log(err);
          
      }
    )
  }

}
