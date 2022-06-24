import { Component, Input, OnInit } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { HubConnection, HubConnectionBuilder, LogLevel } from '@microsoft/signalr';
import { ServiceRequestApiService } from 'src/app/shared/API-Service/service-request-api.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  @Input('chatThredList') chatThredList:any[];
  Connection:HubConnection;
  image_server_path:string = environment.Server_Image_URL;
  ChatTitle:string="أختر عميل لبدأ المحاثة";
  imagePath:string = "";
  message_number :number=0;
  constructor(private serviceRequest: ServiceRequestApiService,) {
    // this.Connection = new HubConnectionBuilder()
    //                   .withUrl(environment.Server_URL)
    //                   .configureLogging(LogLevel.Information)
    //                   .build();
    // this.chatThredList = (JSON.parse(localStorage.getItem("chatThredList")))["data"];
    // console.log("---- : ",this.chatThredList["data"]);

    /*
    creationDate: "Saturday, 04 June 2022"
    id: 1
    imagePath: "f7a83adf-9e44-4e12-88bf-9b700b5964cc.jpg"
    isActive: true
    lastMsg: null
    providerName: null
    serviceRequestId: 335
    title: null
    */ 
    
   }

  ngOnInit(): void {

    const connection = new signalR.HubConnectionBuilder()  
    .configureLogging(signalR.LogLevel.Information)  
    .withUrl(environment.Server_URL + '/ChatThread')  
    .build();  

  connection.start().then(function () {  
    console.log('SignalR Connected!');  
  }).catch(function (err) {  
    return console.error(err.toString());  
  });  

  connection.on("BroadcastMessage", () => {  
    this.RecieveMsg();  
  }); 

  }
  sendmsg(){

  }
  sendmsgp(x:any){
    console.log("x : ",x);
    
  }
  RecieveMsg(){}

  getchat(item:any){
    this.ChatTitle = `العميل رقم ${item.serviceRequestId}`;
    this.imagePath = this.image_server_path+'/'+item.imagePath;

    this.serviceRequest.get_Message_user(item.id).subscribe(
      (res)=>{
        console.log("chat : ",res);  
      },
      (err)=>{
        console.log(err);  
      }
    )
  }
}
