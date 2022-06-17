import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import * as feather from "feather-icons";
import { LayoutService } from "../../shared/services/layout.service";
import { NavService } from "../../shared/services/nav.service";
import { fadeInAnimation } from "../../shared/data/router-animation/router-animation";
import { Roles } from "src/app/shared/Models/Roles";
import { ServiceRequestApiService } from "../../shared/API-Service/service-request-api.service";
import { OrderTypes } from "../../shared/Constants/order-types";
import { serviceRequestObj } from "../../shared/Models/serviceRequestObj";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { LoginComponent } from "../authentication/login/login.component";
import { environment } from "src/environments/environment.prod";
import Swal from 'sweetalert2';
import * as moment from 'moment';

@Component({
  selector: "app-service-request",
  templateUrl: "./service-request.component.html",
  styleUrls: ["./service-request.component.css"],
})
export class ServiceRequestComponent implements OnInit {

  ServiceRequestList: any[];
  ServiceRequest_New: any[];
  ServiceRequest_Hold: any[];
  ServiceRequest_InProgress: any[];
  ServiceRequest_Closed: any[];
  userProfile:any;
  History:any[];
  Comment_Desc:string;
  serviceRequestId:any;
  // imgURL: any = '../assets/images/dashboard/user-img.jpg';
  imgURL: any = '../assets/images/dashboard/ImageNotFound.png';
  imgURL2: any =environment.Server_Image_URL;
  attachment:any[];
  comment:any[];
  ServiceRequest_Obj: serviceRequestObj;
 isCollapsed:boolean 
 reason:String;
 Reason_List:any[]=[];
 reason_Desc:string;
 select_reason_lbl:string;
 reason_desc:string;
 reason_title:string;




  constructor(
    private route: ActivatedRoute,
    public navServices: NavService,
    public layout: LayoutService,
    private ServiceRequest: ServiceRequestApiService,
  ) {    
    this.getServiceRequest();
    this.route.queryParams.subscribe((params) => {
      this.layout.config.settings.layout = params.layout
        ? params.layout
        : this.layout.config.settings.layout;
    });
  }

  ngOnInit() {
    this.ServiceRequestList = [];
    this.ServiceRequest_New = [];
    this.ServiceRequest_Hold = [];
    this.ServiceRequest_InProgress = [];
    this.ServiceRequest_Closed = [];
    this.attachment = [];
    this.History = [];
    this.comment = [];
    this.Comment_Desc = "";
    this.isCollapsed = false;
    this.serviceRequestId = -1;
    this.reason = "أختر السبب من القائمة";
    this.ServiceRequest_Obj = new serviceRequestObj();
    this.ServiceRequest_Obj.orderType = "";
    this.ServiceRequest_Obj.assignmentToEmpDate = new Date();
    this.ServiceRequest_Obj.creationDate = new Date();
    this.ServiceRequest_Obj.employeeId = "";
    this.ServiceRequest_Obj.customerPackageId = "";
    this.ServiceRequest_Obj.isDeleted = "";
    this.ServiceRequest_Obj.orderTypeName = "";
    this.ServiceRequest_Obj.orderTypeNameAr = "";
    this.ServiceRequest_Obj.serviceRequestCutomerSummary = "";
    this.ServiceRequest_Obj.serviceRequestDate = new Date();
    this.ServiceRequest_Obj.serviceRequestEmployeeSummary = "";
    this.Reason_List = [];
this.reason_Desc = "";
this.select_reason_lbl = "";
this.reason_desc = "";
this.reason_title = "";
    
  }

  ngAfterViewInit() {
    setTimeout(() => {
      feather.replace();
    });
  }

  public getRouterOutletState(outlet) {
    return outlet.isActivated ? outlet.activatedRoute : "";
  }

  get layoutClass() {
    switch (this.layout.config.settings.layout) {
      case "Dubai":
        return "compact-wrapper";
      case "London":
        return "only-body";
      case "Seoul":
        return "compact-wrapper modern-type";
      case "LosAngeles":
        return this.navServices.horizontal
          ? "horizontal-wrapper material-type"
          : "compact-wrapper material-type";
      case "Paris":
        return "compact-wrapper dark-sidebar";
      case "Tokyo":
        return "compact-sidebar";
      case "Madrid":
        return "compact-wrapper color-sidebar";
      case "Moscow":
        return "compact-sidebar compact-small";
      case "NewYork":
        return "compact-wrapper box-layout";
      case "Singapore":
        return this.navServices.horizontal
          ? "horizontal-wrapper enterprice-type"
          : "compact-wrapper enterprice-type";
      case "Rome":
        return "compact-sidebar compact-small material-icon";
      case "Barcelona":
        return this.navServices.horizontal
          ? "horizontal-wrapper enterprice-type advance-layout"
          : "compact-wrapper enterprice-type advance-layout";
    }
  }

  sidebarToggle() {
    this.navServices.collapseSidebar = !this.navServices.collapseSidebar;
  }






  getServiceRequest() {
    this.ServiceRequest.Get().subscribe(
      (data) => {

        this.ServiceRequestList = data;
        this.ServiceRequest_New = this.ServiceRequestList.filter((x) => x["orderType"] == OrderTypes.New);
        this.ServiceRequest_Hold = this.ServiceRequestList.filter((x) => x["orderType"] == OrderTypes.Hold);
        this.ServiceRequest_Closed = this.ServiceRequestList.filter((x) => x["orderType"] == OrderTypes.Closed);
        this.ServiceRequest_InProgress = this.ServiceRequestList.filter((x) => x["orderType"] == OrderTypes.InProgress);
        console.log("--- : ",data);
      },
      (err) => {
        // console.log(err);
      }
    );
  }

  getServiceRequestbyId(id: number) {
    this.ServiceRequest.GetServiceById(id).subscribe(
      (data) => {
        this.ServiceRequest_Obj = data[0];

        this.ServiceRequest_Obj.assignmentToEmpDate = new Date();
        this.GetProfile(data[0].userId);
        // console.log(this.ServiceRequest_Obj);
      },
      (err) => {
        // console.log(err);
      }
    );
  }

  GetProfile(id:any) {    
    this.ServiceRequest.GetProfile(id).subscribe(
      (res) => {
        this.userProfile = res["data"][0];
        // console.log(res["data"][0]);
      },
      (err) => {
        // console.log(err);
      }
    );
  }

  GetHistory(id:any) {    
    this.ServiceRequest.Gethistory(id).subscribe(
      (res) => {
        this.History = res["data"];
        // console.log(res["data"]);
      },
      (err) => {
        // console.log(err);
      }
    );
  }



  UpdateServiceRequestby(obj: any,type:number) {
    // console.log(obj);
    
    if(type == 3){
      this.reason_title = "سبب تعليق الخدمة";
      this.select_reason_lbl = "أختر سبب تعليق الخدمة";
    }
    else if(type == 2){
      this.reason_title = "سبب إنهاء الخدمة";
      this.select_reason_lbl = "أختر سبب إنهاء الخدمة";

    }
    let param =   {     
      "orderType": type,
      "serviceRequestEmployeeSummary": "string",
      "serviceRequestDate": "2022-05-14T04:32:27.449Z",
      "assignmentToEmpDate": "2022-05-14T04:32:27.449Z",
      "employeeId": "string"
  } 
    // this.ServiceRequest.Update(obj.serviceRequestID,param).subscribe(
    //   (data) => {
    //    this.getServiceRequest();
    //    this.GetDtail(obj.serviceRequestID,obj.userId) ;
    //   },
    //   (err) => {
    //     // console.log(err);
    //   }
    // );
  }




  GetDtail(id: number,userid:any) {
    // console.log(id);
    this.serviceRequestId = id;
    
    this.getServiceRequestbyId(id);
    this.ServiceRequest_Obj.assignmentToEmpDate = new Date();
    this.GetAttachmentById(userid);
    this.GetHistory(userid);
    this.ServiceRequestComment(id);
    // console.log(this.ServiceRequest_Obj);
  }

  GetAttachmentById(id: any) {
    // console.log(id);
    
    this.ServiceRequest.GetAttachmentById(id).subscribe(
      (res) => {
        this.attachment = res["data"];
      },
      (err) => {
        // console.log(err);
      }
    );
  }


  ServiceRequestComment(id: any) {
    // console.log(id);
    
    this.ServiceRequest.ServiceRequestComment(id).subscribe(
      (res) => {
        this.comment = res["data"];
        // console.log("comment : ",this.comment);
      },
      (err) => {
      }
    );
  }


  displaySwal(url:string){
    Swal.fire({
      imageUrl: this.imgURL2+'/'+url, 
      imageHeight: 200,
      imageAlt: 'حدث خطأ ما فى عرض الصورة'
    })
  }

  addComment(){

    if(this.serviceRequestId !=-1){
      // console.log(moment().format("YYYY-MM-DD[T]HH:mm:ss"));   
      let comment_obj = {
        "comment": this.Comment_Desc,
        "serviceRequestId": this.serviceRequestId,
        "createdAt": moment().format("YYYY-MM-DD[T]HH:mm:ss")
      }
      this.ServiceRequest.insertComment(comment_obj).subscribe(
        (res) => {
          this.ServiceRequestComment(this.serviceRequestId);
        },
        (err) => {
          Swal.fire('رقم طلب الخدمة غير صحيح ! حاول مرة أخرى')
        }
      );

      this.Comment_Desc = "";
        }
    else{

    }
   
  }

  SelectedReason(event:any){

  }




}
