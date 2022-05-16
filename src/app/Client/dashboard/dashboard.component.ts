import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrService } from 'ngx-toastr';
import { TokenStorageService } from 'src/app/Core/Services/Client/token-storage.service';
import { CalendarOptions } from '@fullcalendar/angular'; 
import { FolderService } from 'src/app/Core/Services/Client/Folder/folder.service';
import { DashboardService } from 'src/app/Core/Services/Client/Dashboard/dashboard.service';
import { DDLService } from 'src/app/Core/Services/Client/DDL/ddl.service';
import { environment } from 'src/environments/environment';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe, formatDate } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css', '../client.component.css', '../../app.component.css']
})



export class DashboardComponent implements OnInit {
  
@ViewChild("content",{static:true}) content:ElementRef;
   
  calendarOptions: CalendarOptions = {
      
      initialView: 'dayGridMonth',
      events: [
        { title: 'event 1', date: '2022-04-01' ,color: 'purple'},
        { title: 'event 2', date: '2022-04-04' }
      ]
    };

   baseUrl= environment.API_URL;
  isModalOpen = false;
  isMainopen = true;
  isCollapsed: boolean = true;
  showDocumentDetails = false;
  noteseditView = true;
  notesSaveView = false;
  showDetailsEditView = true;
  showDetailsSaveView = false;
  alltasks = true;
  mytasks = false;
  showAddTask = false;
  showNewAssignTo=false;

  showModal = false;
  DisplayValidForPeriod='';
  isRemindSessionShow=false;
  isRemindCustomShow=false;
  DashboardCount: any = {
    ActiveDoc: null,
    ExpiringDoc: null,
    ExpiredDoc: null,
    TaskCount: null,
    SharerCount: null,
    ReminderOffCount: null,
  };

  shareDoc: any = {
    DocId: null,
    UserId: null,
    AccessTypeId: null,
  };
 
  ActiveDocList: any = [];
  ExpiringDocList: any = [];
  ExpiredDocList: any = [];
  AccessTypeList: any = [];
  ActiveDocCount=0;
  ExpiringDocCount=0;
  ExpiredDocCount=0;
  sendonList: any = [
    { SendOn: 1, name: 'Email' ,selected: null,},
    { SendOn: 2, name: 'Phone (Message)' ,selected: null,},
  ];
  RemindOnList: any = [
    { RemindValue: 1, name: '6 Months Before Expiration' ,selected: null,},
    { RemindValue: 2, name: '3 Months Before Expiration' ,selected: null,},
    { RemindValue: 3, name: '1 Months Before Expiration' ,selected: null,},
    { RemindValue: 4, name: '2 Weeks Before Expiration' ,selected: null,},
    { RemindValue: 5, name: 'Custom' ,selected: null,},
    
  ];
  DocumentData: any = {
    
    Id: null,
    DocName : null,
    ExpiryDate : null,
    IssueDate : null,
    ValidFor : null,
    ValidForPeriod : null,
    DocTypeId : null,
    FolderId : null,
    DocOwnerName : null,
    DocNumber: null,
    CountryId : null,
    StateId : null,
    RemindMe : null,
    Notes:null,
    DocTypeTitle:null,
    FolderName:null,
    CountryName:null,
    StateName:null,
    ReminderCustomCount:null,
    ReminderCustomPeriod:null,
 }
 CheckedSendOnList: any = [];
 CheckedRemindOnList: any = [];
 Task: any = {
    
  TaskName : null,
  AssignTo : null,
  DueDate : null,
  DocId : null,

}
newSharer: any = {
    
  Name : null,
  Email : null,

}
 selectedFiles: FileList;
 docTypeList: any = [];
 userFolderList: any = [];
 countryList: any = [];
 cityList: any = [];
 images : string[] = [];
 sharerUserList: any = [];
 assignUserList: any = [];
 taskList: any = [];
 sharedDocList: any = [];
 docList: any = [];
  constructor(private modalservice: NgbModal,private dashboardService: DashboardService,private ddlSrv:DDLService,private toastr: ToastrService,private router: Router) { }

  ngOnInit(): void {
    
    this.GetDashboardCounts();
    this.GetActiveDocDataTable();
    this.GetExpiringDocDataTable();
    this.GetExpiredDocDataTable();
    this.GetDocumentByMonth();

  }

  CloseModal():void{
     this.modalservice.dismissAll();
  }
  GetDocumentByMonth(): void {
    this.dashboardService.GetDocumentByMonth(5)
              .subscribe(
                (response: any) => {
                  this.docList = response.result;
                }) 
    }
  GetDashboardCounts(): void {
  this.dashboardService.GetDashboardCounts()
            .subscribe(
              (response: any) => {
                this.DashboardCount = response.result;
                if(this.DashboardCount.ActiveDoc==0 && this.DashboardCount.ExpiringDoc==0 && this.DashboardCount.ExpiredDoc==0)
                {
                  this.modalservice.open(this.content);
                   this.showModal=true; 
                }
                else
                {
                  this.showModal=false;
                }

                
              }) 
  }
  GetActiveDocDataTable(): void {
  this.dashboardService.GetActiveDocDataTable()
            .subscribe(
              (response: any) => {
                this.ActiveDocList = response.result.Item1;
                this.ActiveDocCount=response.result.Item2;
              }) 
  }
  GetExpiringDocDataTable(): void {
  this.dashboardService.GetExpiringDocDataTable()
            .subscribe(
              (response: any) => {
                this.ExpiringDocList = response.result.Item1;
                this.ExpiringDocCount=response.result.Item2;
              }) 
  }
  GetExpiredDocDataTable(): void {
  this.dashboardService.GetExpiredDocDataTable()
            .subscribe(
              (response: any) => {
                this.ExpiredDocList = response.result.Item1;
                this.ExpiredDocCount=response.result.Item2;
              }) 
  }

  ClearForm(f:any): void {
    f.resetForm();

   }

 

  SaveNote(f:any): void {

  this.dashboardService.SaveNote(this.DocumentData).subscribe(
  (response: any) => {

    if(response.result=="1")
    {

      this.toastr.success("Notes has been saved!","Successfully !!", );
      this.noteseditView = true;
      this.notesSaveView = false;  
      
    }
    else if(response.result=="-3")
    {
      this.toastr.info("This Notes are already exist.","Opps! :");
    }
    },
  (err: any) => {
  this.toastr.error(err.statusText,"Opps! :");
  });
  }
/*  AddTask(f:any): void {

  if(this.Task.AssignTo=="1")
  {
    this.dashboardService.addSharer(this.newSharer).subscribe(
      (response: any) => {
    
        if(response==1)
        {
          this.toastr.success("Please confirm this email by link has send.","Successfully !!", );
          this.ClearForm(f);
        }
        else if(response==-3)
        {
          this.toastr.info("This email is already exist in your list.","Opps! :");
        }
        else if(response==-2)
        {
          this.toastr.info("This email is not confirmed yet.","Opps! :");
        } 
        else
        {
          this.GetSharerByUserDDL();
          this.Task.AssignTo=response;
          this.NewTask(f);
        }
        },
      (err: any) => {
      this.toastr.error(err.statusText,"Opps! :");
      });
  }
  else{
    this.NewTask(f);
  } 
 }*/
 AddTask(f:any): void
 {

  this.Task.DocId=this.DocumentData.Id;
    
  this.dashboardService.AddTask(this.Task).subscribe(
  (response: any) => {

    if(response.result=="1")
    {

      this.toastr.success("Task has been Assigned!","Successfully !!", );
      this.showAddTask = false;
      this.alltasks = true;
      this.GetTaskDataTable();
      this.GetAssignTaskUserByDocIdDLL();
      this.ClearForm(f);
    }
    else if(response.result=="-3")
    {
      this.toastr.info("This Task are already exist.","Opps! :");
    }
    },
  (err: any) => {
  this.toastr.error(err.statusText,"Opps! :");
  });
 }
 shareDcument(f:any): void
 {

  this.shareDoc.DocId=this.DocumentData.Id;
    
  this.dashboardService.shareDcument(this.shareDoc).subscribe(
  (response: any) => {

    if(response.result=="1")
    {

      this.toastr.success("Document has been shared!","Successfully !!", );
      this.showAddTask = false;
      this.alltasks = true;
      this.GetTaskDataTable();
      this.GetAssignTaskUserByDocIdDLL();
      this.ClearForm(f);
    }
    else if(response.result=="-3")
    {
      this.toastr.info("This Task are already exist.","Opps! :");
    }
    },
  (err: any) => {
  this.toastr.error(err.statusText,"Opps! :");
  });
 }
 
  toggleCollapsed(){
    this.isCollapsed = !this.isCollapsed;
  }
  ViewCalender(){
    this.isCollapsed = !this.isCollapsed;
  }
  updateDocument(f:any): void {

    this.dashboardService.updateDocument(this.DocumentData,this.selectedFiles,this.CheckedSendOnList,this.CheckedRemindOnList).subscribe(
    (response: any) => {

      if(response.result=="1")
      {

        this.toastr.success("Document has been updated!","Successfully !!", );
        this.showDetailsEditView = false;
        this.showDetailsSaveView = true;
        this.ClearForm(f);
      }
      
       },
    (err: any) => {
     this.toastr.error(err.statusText,"Opps! :");
    });
}

  ModalbtnCick(){
    this.isModalOpen = false;
    this.isMainopen = true;
  }
  getDocTypeDLL(): void {
    this.ddlSrv.getDocTypeDDL()
             .subscribe(
               (response: any) => {
                 this.docTypeList = response.result;
               }) 
   }
   getUserFoldersDLL(): void {
    this.ddlSrv.getUserFoldersDLL()
             .subscribe(
               (response: any) => {
                 this.userFolderList = response.result;
               }) 
   }
   getCountryDDL(): void {
    this.ddlSrv.getCountryDDL()
             .subscribe(
               (response: any) => {
                 this.countryList = response.result;
               }) 
   }
   getStateDDL(): void {
    this.ddlSrv.getStateDDL(this.DocumentData.CountryId)
             .subscribe(
               (response: any) => {
                 this.cityList = response.result;
               }) 
   }
   GetSharerByUserDDL(): void {
    this.ddlSrv.GetSharerByUserDDL().subscribe(
               (response: any) => {
                 this.sharerUserList = response.result;
               }) 
   }
   GetAssignTaskUserByDocIdDLL(): void {
    this.ddlSrv.GetAssignTaskUserByDocIdDLL(this.DocumentData.Id).subscribe(
               (response: any) => {
                 this.assignUserList = response.result;
               }) 
   }
  GetTaskDataTable(): void {
    this.dashboardService.GetTaskDataTable(this.DocumentData.Id).subscribe(
               (response: any) => {
                 this.taskList = response.result;
               }) 
   }
   GetSharedDocbyId(): void {
    this.dashboardService.GetSharedDocbyId(this.DocumentData.Id).subscribe(
               (response: any) => {
                 this.sharedDocList = response.result;
               }) 
   }
   
  /*  NewAssignTo(value:string): void {
    if(value=="1")
    {
      this.showNewAssignTo=true;
    }
    else
    {
      this.showNewAssignTo=false;
    }
   } */
   
  onShowDocumentDetails(id :String)
  {
    this.showDocumentDetails = true;
    
    this.DocumentData.Id=id;
    this.dashboardService.GetDocumentById(this.DocumentData.Id).subscribe(
        (response: any) => {
          this.DocumentData = response.result;
         this.DocumentData.ExpiryDate = formatDate(new Date(), 'yyyy-MM-dd', 'en_US');
         this.DocumentData.IssueDate = formatDate(new Date(), 'yyyy-MM-dd', 'en_US');
         this.DisplayValidForPeriod=this.DocumentData.ValidForPeriod;
         this.DocumentData.RemindMe=true;
         this.ChangeRemindMe(this.DocumentData.RemindMe);
        
         if(this.DocumentData.ValidForPeriod=="Years" && this.DocumentData.ValidFor=='1')
         {
          this.DisplayValidForPeriod="Year";
         }
         if(this.DocumentData.ValidForPeriod=="Months" && this.DocumentData.ValidFor=='1')
         {
          this.DisplayValidForPeriod="Month";
         }
         if(this.DocumentData.ValidForPeriod=="Weeks" && this.DocumentData.ValidFor=='1')
         {
          this.DisplayValidForPeriod="Week";
         }

          if(this.DocumentData.Notes==null)
          {
            this.noteseditView = false;

            this.notesSaveView = true;  
          }
          else
          {
            this.noteseditView = true;

            this.notesSaveView = false;  
          }
          this.getStateDDL();
        });
      
        this.getDocTypeDLL();
        this.getUserFoldersDLL();
        this.getCountryDDL();
        this.getStateDDL();
        this.GetSharerByUserDDL();
        this.GetAssignTaskUserByDocIdDLL();
        this.GetTaskDataTable();
        this.GetAccessTypeDDL();
        this.GetSharedDocbyId();
        
  }
  onHideDocumentDetails(){
  this.showDocumentDetails = false;

  }
  NotesEditClick(){
    this.noteseditView = false;
    this.notesSaveView = true;   
  }
  onNotesCancelClick(){
    this.noteseditView = true;

    this.notesSaveView = false; 
  }
  onDetailsEditClick(){
    this.showDetailsEditView = false;
    this.showDetailsSaveView = true;
  }
  onDetailsCancelClick(){
  this.showDetailsEditView = true;
  this.showDetailsSaveView = false;
  }
  AssignedToMe(){
  this.alltasks = false;
  this.showAddTask = false;

    this.mytasks = true;
  }
  onAddTask(){
  this.showAddTask = true;
    this.alltasks = false;
      this.mytasks = false;


  }

  WelcomeMsg(): void {
      this.dashboardService.WelcomeMsg().subscribe(
      (response: any) => {
        },
      (err: any) => {
      });
      }


      AssignedToFilter(userId:string ): void {

        this.dashboardService.AssignedToFilter(userId,this.DocumentData.Id).subscribe(
        (response: any) => {
          this.taskList = response.result;
          },
        (err: any) => {
        this.toastr.error(err.statusText,"Opps! :");
        });
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
         ChangeRemindMe(value:any){
          if(value==true)
          {
            this.isRemindSessionShow=true;
          }
          else {
            this.isRemindSessionShow=false;
          }
        }
         incrementCriteria(): void
         { this.DocumentData.ReminderCustomCount=this.DocumentData.ReminderCustomCount + 1;
           
          
         }
         decrementCriteria(): void
         { 
           if(this.DocumentData.ReminderCustomCount>0)
           {
             this.DocumentData.ReminderCustomCount=this.DocumentData.ReminderCustomCount-1;
           }
          
          
         }
         CheckRemindOn(list:any){
          if(list.selected==true)
          {
              this.CheckedRemindOnList.push(list);
            if(list.RemindValue==5)
            {
              this.isRemindCustomShow=true;
            }
                  
          }
          else if(list.selected==false)
          { 
            for (let i = 0; i < this.CheckedRemindOnList.length; i++) {
              if(list.RemindValue==5)
              {
                this.isRemindCustomShow=false;
              }
              if(JSON.stringify(list.RemindValue) === JSON.stringify(this.CheckedRemindOnList[i].RemindValue) ){
                this.CheckedRemindOnList.splice(i,1);
                break;
              }
             
              
          }
          }
        }
        CheckSendOn(list:any){
          if(list.selected==true)
          {
              this.CheckedSendOnList.push(list);
        
            
          }
          else if(list.selected==false)
          { 
            for (let i = 0; i < this.CheckedSendOnList.length; i++) {
    
              if(JSON.stringify(list.SendOn) === JSON.stringify(this.CheckedSendOnList[i].SendOn) ){
                this.CheckedSendOnList.splice(i,1);
                break;
              }
            }
          }
        }

        selectFile(event: any): void {
          this.selectedFiles = event.target.files;
          if (event.target.files && event.target.files[0]) {
            var filesAmount = event.target.files.length;
            for (let i = 0; i < filesAmount; i++) {
                    var reader = new FileReader();
        
                    reader.onload = (event:any) => {
                       this.images.push(event.target.result); 
        
                    }
       
                    reader.readAsDataURL(event.target.files[i]);
            }
        }
          
        }

        addBookmark(docId:string,bookmark:boolean ): void {

          this.dashboardService.addBookmark(docId,bookmark).subscribe(
          (response: any) => {
            this.GetActiveDocDataTable();
            this.GetExpiringDocDataTable();
            this.GetExpiredDocDataTable();
            },
          (err: any) => {
          this.toastr.error(err.statusText,"Opps! :");
          });
          }     
  GetView(statusFilter:number ): void {

           this.router.navigateByUrl('client/savedDocuments/'+statusFilter);
    } 
}
