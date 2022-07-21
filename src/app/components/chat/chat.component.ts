import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as signalR from '@microsoft/signalr';
import { HubConnection, HubConnectionBuilder, LogLevel } from '@microsoft/signalr';
import { ServiceRequestApiService } from 'src/app/shared/API-Service/service-request-api.service';
import { SignalRService } from 'src/app/shared/API-Service/signal-r.service';
import { Error_Message } from 'src/app/shared/Constants/Error_Message';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  @ViewChild('msg') msg_input: ElementRef;
  @Input('chatThredList') chatThredList:any[];
  Form: FormGroup;

  Connection:HubConnection;
  image_server_path:string = environment.Server_Image_URL;
  ChatTitle:string="أختر عميل لبدأ المحاثة";
  imagePath:string = "";
  message_number :number=0;
  Message_List:any[]=[];
  phone_user:any="";
  chatThredID :number ;
  imgURL: any;
  fileURL: any;
  message: string;
  userid:any = -1;
  constructor(private serviceRequest: ServiceRequestApiService,
              private _formBuilder: FormBuilder , 
              private signalRService: SignalRService) {
 
   }

  ngOnInit(): void {
    this._InitForm();
    this.signalRService.startConnection();

    setTimeout(() => {
      this.signalRService.askServerListener();
      this.signalRService.askServer();
    }, 2000);
  }



  _InitForm() {

    this.Form = this._formBuilder.group({
      message: [''],
      image: [''],
      file: [''],
    });

  }


  preview(files: any) {
    if (files.length === 0)
      return;

    var mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      this.message = "Only images are supported.";
      return;
    }

    var reader = new FileReader();
    this.imagePath = files;
    reader.readAsDataURL(files[0]);
    reader.onload = (_event) => {
      this.imgURL = reader.result;
    }

    // console.log( files[0]);
    
    let date = new Date().toLocaleDateString()  +" "+ new Date().toLocaleTimeString();
    let SendMessage = new FormData();
    SendMessage.append("FilePath", files[0])
    SendMessage.append("FileType", 1 as unknown as Blob)
    SendMessage.append("ChatThreadId",this.chatThredID as unknown as Blob);
    SendMessage.append("CreationDate",date as unknown as Blob);
    this.serviceRequest.SendMeaasge( SendMessage).subscribe(
      res=>{
        // console.log("res ",res);
        this.getchatdata(this.chatThredID);
        SendMessage = null;
      },
      err=>{
        Error_Message.Message();
      }
    )
  }

  preview2(files: any) {
    
    
    if (files.length === 0){
      return;
    }

    // var mimeType = files[0].type;
    // if (mimeType.match(/image\/*/) == null) {
    //   this.message = "Only images are supported.";
    //   return;
    // }

    var reader = new FileReader();
    this.imagePath = files;
    reader.readAsDataURL(files[0]);
    reader.onload = (_event) => {
      this.fileURL = reader.result;
    }
    // console.log(files); 
    // console.log( files[0]);
    
    let date = new Date().toLocaleDateString()  +" "+ new Date().toLocaleTimeString();
    let SendMessage = new FormData();
    SendMessage.append("FilePath", files[0])
    SendMessage.append("FileType", 3 as unknown as Blob)
    SendMessage.append("ChatThreadId",this.chatThredID as unknown as Blob);
    SendMessage.append("CreationDate",date as unknown as Blob);
    this.serviceRequest.SendMeaasge( SendMessage).subscribe(
      res=>{
        // console.log("res ",res);
        this.getchatdata(this.chatThredID);
        SendMessage = null;
      },
      err=>{
        Error_Message.Message();
      }
    )
  }


  sendmsg(){
    // console.log("xx: ",this.Form.get('message').value);
    console.log("chatThredID : ",this.chatThredID);

    if(!(this.Form.get('message').value == '')){
      let date = new Date().toLocaleDateString()  +" "+ new Date().toLocaleTimeString();
      let SendMessage = new FormData();
     SendMessage.append("ToID","");
     SendMessage.append("CreationDate",date as unknown as Blob);
     SendMessage.append("ChatThreadId",this.chatThredID as unknown as Blob);
     SendMessage.append("Message",this.Form.get('message').value);
    //  SendMessage.append("FileType",this.Form.get('image').value);
    //  SendMessage.append("FilePath",this.Form.get('image').value);
      this.serviceRequest.SendMeaasge( SendMessage).subscribe(
        res=>{
            // console.log(res); 
            this.getchatdata(this.chatThredID);
            SendMessage = null;
            this. _InitForm();
        },
        err=>{
         Error_Message.Message();
        }
      )
     
    }
  }

  sendmsgp(x:any){
    // console.log("x : ",x);
    
  }
  RecieveMsg(){
    this.getchatdata(this.userid);
  }

  getchat(item:any){
    console.log("chat : ",item);  
    this.ChatTitle = `العميل رقم ${item.serviceRequestId}`;
    this.phone_user = item.userName;
    this.chatThredID = item.id;
    this.imagePath = this.image_server_path+'/'+item.imagePath;
    // console.log(item.id);
    this.userid= item.id;
    this.getchatdata(item.id);
  }

  getchatdata(id:any){
    console.log(id);
    
    this.serviceRequest.get_Message_user(id).subscribe(
      (res)=>{
       
        this.Message_List = res["data"];
        this.message_number = this.Message_List.length; 
        setTimeout(() => {
          document.getElementById('EndOfChatMessage')?.scrollIntoView(); 
          // this.Form.patchValue([{message:""}])
         
        }, 500);
        this.msg_input.nativeElement.value = "";
      },
      (err)=>{
        Error_Message.Message();  
      }
    )
  }


}
