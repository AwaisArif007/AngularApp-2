import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrService } from 'ngx-toastr';
import { TokenStorageService } from 'src/app/Core/Services/Client/token-storage.service';
import * as signalR from '@microsoft/signalr'; 
import { environment } from 'src/environments/environment';
import { DashboardService } from 'src/app/Core/Services/Client/Dashboard/dashboard.service';



@Component({
  selector: 'app-client-layout',
  templateUrl: './client-layout.component.html',
  styleUrls: ['./client-layout.component.css']
})
export class ClientLayoutComponent implements OnInit {

 isLoggedIn = false;
 username?: string;
 usernameFirstChar='';
 email?: string;
 nameList: any = [];
 notificationList: any = [];
 notifyNameList: any = [];


  constructor(private router: Router,
    private toastr: ToastrService,
    private tokenStorageService: TokenStorageService,
    private dashboardService: DashboardService) { }

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorageService.getToken();
    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.username = user.userName;
      this.nameList = user.userName.split(" ");
      for(let i=0; i <2;i++)
      {
        var firstChar=this.nameList[i].charAt(0);
        this.usernameFirstChar= this.usernameFirstChar+firstChar;
      }
      
      this.email = user.email;
      
    }
    else
    {
      this.router.navigate(['/client/login']);
    }
    this.getNotifyDataTable();  
  /*   const connection = new signalR.HubConnectionBuilder()  
      .configureLogging(signalR.LogLevel.Information)  
      .withUrl('http://111.68.101.146/XpireeAPI/notify',{
        skipNegotiation: true,
        transport: signalR.HttpTransportType.WebSockets
    })  
      .build();  
  
    connection.start().then(function () {  
      console.log('SignalR Connected!');  
    }).catch(function (err) {  
      return console.error(err.toString());  
    });  
  
    connection.on("BroadcastMessage", () => {  
      this.getNotifyDataTable();  
    }); */
  }

  logout(): void {
    this.tokenStorageService.signOut();
    this.router.navigate(['/client/login']);
    window.location.reload();
  } 
  
  
  getNotifyDataTable():void {

    this.dashboardService.getNotifyDataTable().subscribe(
       (response: any) => {

        this.notificationList = response.result;
        
       },
       (error: any) => {
         this.toastr.error(error,"Error!!", );
       }
 
     )
   }
}
