import { NullVisitor } from '@angular/compiler/src/render3/r3_ast';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { DDLService } from 'src/app/Core/Services/Client/DDL/ddl.service';
import { DocumentService } from 'src/app/Core/Services/Client/Document/document.service';
import { FolderService } from 'src/app/Core/Services/Client/Folder/folder.service';
import { Router } from '@angular/router';
import { formatDate } from '@angular/common';



@Component({
  selector: 'app-add-document',
  templateUrl: './add-document.component.html',
  styleUrls: ['./add-document.component.css', '../client.component.css', '../../app.component.css']
})
export class AddDocumentComponent implements OnInit {
  @ViewChild("NewFolder",{static:true}) NewFolder:ElementRef;
  @ViewChild("DocType",{static:true}) DocType:ElementRef;
  selectedFolderInfo:any;
selectedDocType: any;
selectedState: any;
selectedCountry: any;
PreviewFileName : any =[];
  addDocumentData = true;
  previewData = false;
  isDisabledMonthsBefore=false;

isRemindSessionShow=false;
isRemindCustomShow=false;
AddDocumentData: any = {
    
     Id: null,
     DocName : null,
     ExpiryDate : null,
     IssueDate : null,
     ValidFor : null,
     ValidForPeriod : null,
     DocTypeId : null,
     DocTypeName: null,
     FolderId : null,
     FolderName : null,
     DocOwnerName : null,
     DocNumber: null,
     CountryId : null,
     CountryName:null,
     StateId : null,
     StateName: null,
     RemindMe : null,
     ReminderCustomCount:null,
     ReminderCustomPeriod:null,
  }
  selectedFiles: FileList;
  docTypeList: any = [];
  userFolderList: any = [];
  countryList: any = [];
  cityList: any = [];
  images : string[] = [];
    docTypeform: any = {
    Title: null,
  };
  CheckedSendOnList: any = [];
  CheckedRemindOnList: any = [];
  
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


  dataTableList: any = [];
  form: any = {
    Name: null,
    UserId: null,
    color:null,
  };



  constructor(private modalService: NgbModal, private docSrvice : DocumentService,private ddlSrv : DDLService,private toastr: ToastrService , private folderService: FolderService,private router: Router) { }

  ngOnInit(): void {
    this.getDocTypeDLL();
    this.getUserFoldersDLL();
    this.getCountryDDL();
this.form.color="#BEEAFF";
    
  }
  ClearForm(f:any): void {
    f.resetForm();

   }
   addDays():void {
     if(this.AddDocumentData.ValidForPeriod !=null && this.AddDocumentData.ValidFor!=null && this.AddDocumentData.IssueDate !=null)
     {
      if(this.AddDocumentData.ValidForPeriod=="Weeks")
      {
       const calculateDays=this.AddDocumentData.ValidFor * 7;
       const calculateDate = new Date(this.AddDocumentData.IssueDate);
       calculateDate.setDate(calculateDate.getDate() + calculateDays);
       this.AddDocumentData.ExpiryDate=formatDate(calculateDate, 'yyyy-MM-dd', 'en_US');
      }
      else if(this.AddDocumentData.ValidForPeriod=="Years")
      {
       const calculateDays=this.AddDocumentData.ValidFor * 365;
       const calculateDate = new Date(this.AddDocumentData.IssueDate);
       calculateDate.setDate(calculateDate.getDate() + calculateDays);
       this.AddDocumentData.ExpiryDate=formatDate(calculateDate, 'yyyy-MM-dd', 'en_US');
      }
      else if(this.AddDocumentData.ValidForPeriod=="Months")
      {
        const calculateDays=this.AddDocumentData.ValidFor * 30;
        const calculateDate = new Date(this.AddDocumentData.IssueDate);
        calculateDate.setDate(calculateDate.getDate() + calculateDays);
        this.AddDocumentData.ExpiryDate=formatDate(calculateDate, 'yyyy-MM-dd', 'en_US');
      }
     
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

    DeleteImageFromList(i:number)
    {
      this.images.splice(i,1);
    }
   selectFile(event: any): void {
    this.selectedFiles = event.target.files;
    this.PreviewFileName = event.target.files;
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

 
  addDocument(): void {

    this.docSrvice.AddDocument(this.AddDocumentData,this.selectedFiles,this.CheckedSendOnList,this.CheckedRemindOnList).subscribe(
    (response: any) => {

      if(response.result=="1")
      {

        this.toastr.success("Document has been added!","Successfully !!", );
               this.router.navigate(['/client/dashboard'])

        // this.ClearForm(f);
        
      }
       },
    (err: any) => {
     this.toastr.error(err.statusText,"Opps! :");
    });
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
  this.ddlSrv.getStateDDL(this.AddDocumentData.CountryId)
           .subscribe(
             (response: any) => {
               this.cityList = response.result;
             }) 
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
 onPreviewClick(){
  this.addDocumentData = false;
 this.previewData = true;
}

incrementCriteria(): void
{ 
  if(this.AddDocumentData.ReminderCustomCount<52)
  {
    
  this.AddDocumentData.ReminderCustomCount=this.AddDocumentData.ReminderCustomCount + 1;
  if(this.AddDocumentData.ReminderCustomCount>=13)
  {
    this.isDisabledMonthsBefore=true;
  }
}
}
decrementCriteria(): void
{ 
  if(this.AddDocumentData.ReminderCustomCount>0)
  {
    this.AddDocumentData.ReminderCustomCount=this.AddDocumentData.ReminderCustomCount-1;
  if(this.AddDocumentData.ReminderCustomCount<13)
  {
    this.isDisabledMonthsBefore=false;
  }
  }
 
 
}
onCancelPreview(){
  this.previewData = false;
 this.addDocumentData = true;
}

ChangeFolder(event:any){
  this.AddDocumentData.FolderId =this.selectedFolderInfo.Id;
  this.AddDocumentData.FolderName=this.selectedFolderInfo.Name;
 if(event.target.value=="1")
  {
    this.modalService.open(this.NewFolder);
  }
}
ChangeDocument(event:any){
  
  this.AddDocumentData.DocTypeId =this.selectedDocType.Id;
  this.AddDocumentData.DocTypeName=this.selectedDocType.Title;
  if(event.target.value=="1")
    {
      this.modalService.open(this.DocType);
  }
}

ChangeState(){
  this.AddDocumentData.StateId =this.selectedState.Id;
  this.AddDocumentData.StateName=this.selectedState.FullName;
}

ChangeCountry(){
  this.AddDocumentData.CountryId =this.selectedCountry.Id;
  this.AddDocumentData.CountryName=this.selectedCountry.FullName;
  this.getStateDDL();
}


ViewFolders(): void {
    this.folderService.ViewFolders()
             .subscribe(
               (response: any) => {
                 this.dataTableList = response.result;
               }) 
   }
 CreateFolder(f:any): void {
 this.folderService.CreateFolder(this.form).subscribe(
 (response: any) => {
   if(response.result=="1")
   {

     this.toastr.success("Folder has been created!","Successfully !!", );
     this.ClearForm(f);
     this.getUserFoldersDLL();
     
    this.modalService.dismissAll();
   }
   else if(response.result=="-3")
   {
     this.toastr.info("This Folder is already exist.","Opps! :");
   }
    },
 (err: any) => {
  this.toastr.error(err.statusText,"Opps! :");
 });
} 

AddNewDocType(f:any): void {
  this.docSrvice.AddNewDocType(this.docTypeform).subscribe(
  (response: any) => {
    if(response.result=="1")
    {
 
      this.toastr.success("Document Type has been added!","Successfully !!", );
      this.ClearForm(f);
      this.getDocTypeDLL();
      
     this.modalService.dismissAll();
    }
    else if(response.result=="-3")
    {
      this.toastr.info("This Document Type is already exist.","Opps! :");
    }
     },
  (err: any) => {
   this.toastr.error(err.statusText,"Opps! :");
  });
 } 

CloseModel():void{
  
    this.modalService.dismissAll();
  
}
ChangeNewDocType():void{
 // if(event.target.value=="1")
 // {
    this.modalService.open(this.DocType);
 //// }
}




  // $("#dt1").datepicker({
  //           dateFormat: "dd/mm/yy",
  //           onSelect: function (date) {
  //               var dt1 = $('#dt1').datepicker('getDate');
  //               var dt2 = $('#dt2').datepicker('getDate');
  //               if (dt1 > dt2) {
  //                   $('#dt2').datepicker('setDate', dt1);
  //               }
  //               $('#dt2').datepicker('option', 'minDate', dt1);
  //           }
  //       });

        
  //       $('#dt2').datepicker({
  //           dateFormat: "dd/mm/yy",
  //           minDate: $('#dt1').datepicker('getDate'),
  //           onClose: function () {
  //               var dt1 = $('#dt1').datepicker('getDate');
  //               var dt2 = $('#dt2').datepicker('getDate');
  //               //check to prevent a user from entering a date below date of dt1
  //               if (dt2 <= dt1) {
  //                   var minDate = $('#dt2').datepicker('option', 'minDate');
  //                   $('#dt2').datepicker('setDate', minDate);
  //               }
  //           }
  //       });
}
