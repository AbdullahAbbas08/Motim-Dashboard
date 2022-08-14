import { THIS_EXPR } from "@angular/compiler/src/output/output_ast";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import Swal from "sweetalert2";
import { AuthenticationService } from "../../../shared/API-Service/Authentication.service";
import { NgxSpinnerService } from "ngx-spinner";
import { Router } from "@angular/router";
import { Roles } from "src/app/shared/Models/Roles";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
  InsertForm: FormGroup;
  public show: boolean = true;

  constructor(
    private _formBuilder: FormBuilder,
    private Authentication: AuthenticationService,
    private toastr: ToastrService,
    private SpinnerService: NgxSpinnerService,
    private router: Router
  ) {
   
  }

  ngOnInit(): void {
    if(localStorage.getItem("token")){
      this.router.navigateByUrl("/ServiceRequest");
    };
    this.InitForm();
    
  }

  InitForm() {
    this.InsertForm = this._formBuilder.group({
      phoneNumber: ["", Validators.required],
      passowrd: ["", Validators.required],
    });
  }

  Login() {
    this.RequestLogin({
      phoneNumber: this.InsertForm.get("phoneNumber").value,
      password: this.InsertForm.get("passowrd").value,
    });
  }

  RequestLogin(obj: any) {
    this.SpinnerService.show();
    this.Authentication.RequestLogin(obj).subscribe(
      (response:any) => {
        this.SpinnerService.hide();
        if (response.statusCode == 400) {
          return this.toastr.error(response.message);
        } else {
          localStorage.setItem("token", response.data[0].token);
          localStorage.setItem("role", response.data[0].roles[0]);
          localStorage.setItem("username", response.data[0].username);
          this.toastr.success("تم تسجيل الدخول بنجاح", "الحالة");
          if(response.data[0].roles[0] == Roles.SERVICEPROVIDER){
            this.router.navigateByUrl("/ServiceRequest");
          }
          else if(response.data[0].roles[0] == Roles.ADMINISTRATOR){
            this.router.navigateByUrl("/content/admin/GetCategories");
          }
          else{
            this.router.navigateByUrl("/login");
          }
        }
      },
      (err) => {
        this.SpinnerService.hide();
        Swal.fire({
          icon: "error",
          title: "خطأ",
          text: err.error,
        });
      }
    );
  }
}
