import { Component, OnInit } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrService } from 'ngx-toastr';
import { DDLService } from 'src/app/Core/Services/Client/DDL/ddl.service';
import { SettingService } from 'src/app/Core/Services/Client/Setting/setting.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css', '../../app.component.css']
})
export class SettingsComponent implements OnInit {
  showSaveView = true;
  showEditView = false;
  sharerSaveView = true;
  sharerEditView = false;
  selectedFiles: FileList;
  currentFile: File;
  sharerCount:number;
  previewImage : string;
  FeedBack: any = {
    subject: null,
    detail: null,
    UserId:"",
  }
  sharer: any = {
    email: null,
    name: null,
    AccessTypeId:null,
    SharerId: null,
    UserId:"",
  }
  NotificationSetting: any = {
    DocExpiry: false,
    DocShared: false,
    InAppReminder:false,
    UserId:"",
  }
 UserAccount:any={
  Name:null,
  ProfilePic:null,
  DocExpiringCriteria:60,
  Email:null,
  PhoneNumber:null,
 }
 AccessTypeList: any = [];
 sharerList: any = [];
  constructor(private toastr: ToastrService,private ddlSrv:DDLService,private setting:SettingService) { }

  ngOnInit(): void {
    this.GetNotifySetting();
    this.GetAccessTypeDDL();
    this.GetUserInfo();
    this.GetSharerDataTable();
  }
  onAccountEditClick() {
    this.showSaveView = true;
    this.showEditView = false;
  }
  onSharerSaveClick() {
    this.sharerSaveView = false;
    this.sharerEditView = true;
  }
  ClearForm(f:any): void {
    f.resetForm();

   }
   setDefaultCriteria(): void {
    this.UserAccount.DocExpiringCriteria=60;

   }
   incrementCriteria(): void
   {
     if(this.UserAccount.DocExpiringCriteria <120)
     {
      
       
      this.UserAccount.DocExpiringCriteria=this.UserAccount.DocExpiringCriteria + 1;
     }
    
   }
   decrementCriteria(): void
   { if(this.UserAccount.DocExpiringCriteria>60)
    {
    this.UserAccount.DocExpiringCriteria=this.UserAccount.DocExpiringCriteria-1;
    }
   }
  AddFeedBack(f:any):void {

    this.setting.AddFeedBack(this.FeedBack).subscribe(
       (response: any) => {
         if(response=="1")
         {
           this.toastr.success("You have added FeedBack.","Successfully!!", );
           this.ClearForm(f);
         }
         else if (response=="-3")
         {
          this.toastr.error("Already Exist","Oops!!", );
         }
      
 
       },
       (error: any) => {
         this.toastr.error(error,"Error!!", );
       }
 
     )
   }
   SetNotification():void {

    this.setting.SetNotification(this.NotificationSetting).subscribe(
       (response: any) => {
         if(response=="1")
         {
           this.toastr.success("Notification have Updated.","Successfully!!", );
         }
      
 
       },
       (error: any) => {
         this.toastr.error(error,"Error!!", );
       }
 
     )
   }
   GetNotifySetting():void {

    this.setting.ViewNotification().subscribe(
       (response: any) => {
        this.NotificationSetting.DocExpiry=response.DocExpiry;
        this.NotificationSetting.DocShared=response.DocShared;
        this.NotificationSetting.InAppReminder=response.InAppReminder;
        this.NotificationSetting.UserId=response.UserId;
       },
       (error: any) => {
         this.toastr.error(error,"Error!!", );
       }
 
     )
   }
   GetAccessTypeDDL():void {

    this.ddlSrv.GetAccessTypeDDL().subscribe(
       (response: any) => {
        this.AccessTypeList=response.result;
       },
       (error: any) => {
         this.toastr.error(error,"Error!!", );
       }
 
     )
   }
   selectFile(event: any): void {
    this.selectedFiles = event.target.files;
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];

      const reader = new FileReader();
      reader.onload = () => {
        this.previewImage = reader.result as string;
      }

      reader.readAsDataURL(file);
    }
    
  }
   GetUserInfo():void {

    this.setting.GetUserInfo().subscribe(
       (response: any) => {
        this.UserAccount=response;
       if(this.UserAccount.ProfilePic!=null)
       {
        this.UserAccount.ProfilePic= environment.API_URL+this.UserAccount.ProfilePic;
       }

        if(this.UserAccount.DocExpiringCriteria==null)
        {
          this.UserAccount.DocExpiringCriteria=60;
        }
        else
        {
          this.showSaveView=false;
          this.showEditView = true;
        }
       },
       (error: any) => {
         this.toastr.error(error,"Error!!", );
       }
 
     )
   }
   AddUserInfo(f:any):void {

    if (this.selectedFiles) {
      const file: File | null = this.selectedFiles.item(0);

      if (file) {
        this.currentFile = file;
      }
    }
    this.setting.AddUserInfo(this.UserAccount,this.currentFile).subscribe(
       (response: any) => {
         if(response=="1")
         {
           this.toastr.success("Account have been updated.","Successfully!!", );
           this.GetUserInfo();
           this.showSaveView = false;
           this.showEditView = true;
         }
         else if (response=="-3")
         {
          this.toastr.error("Already Exist","Oops!!", );
         }
      
 
       },
       (error: any) => {
         this.toastr.error(error,"Error!!", );
       }
 
     )
   }

   FindSharerByEmail():void {

    this.setting.FindSharerByEmail(this.sharer.email).subscribe(
       (response: any) => {
        this.sharer.name=response.Name;
        this.sharer.SharerId=response.Id;
       },
       (error: any) => {
         this.toastr.error(error,"Error!!", );
       }
 
     )
   }
   AddSharer(f:any):void {

    this.setting.AddSharer(this.sharer).subscribe(
       (response: any) => {
         if(response=="1")
         {
           this.toastr.success("Sharer has been Added.","Successfully!!", );
           this.GetSharerDataTable();
         }
         else if (response=="-3")
         {
          this.toastr.error("Already Exist","Oops!!", );
         }
      
 
       },
       (error: any) => {
         this.toastr.error(error,"Error!!", );
       }
 
     )
   }
   GetSharerDataTable():void {

    this.setting.GetSharerDataTable().subscribe(
       (response: any) => {
        this.sharerList=response.result.Item1;
        this.sharerCount=response.result.Item2;

       },
       (error: any) => {
         this.toastr.error(error,"Error!!", );
       }
 
     )
   }
}
