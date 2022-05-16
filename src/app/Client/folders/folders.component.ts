import { Component, OnInit } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FolderService } from 'src/app/Core/Services/Client/Folder/folder.service';



@Component({
  selector: 'app-folders',
  templateUrl: './folders.component.html',
  styleUrls: ['./folders.component.css', '../../app.component.css']
})
export class FoldersComponent implements OnInit {

isModalOpen = false;


  showListView = false
  showGridView = true




  dataTableList: any = [];
  form: any = {
    Name: null,
    UserId: null,
    color:null,
  };
  constructor(private folderService: FolderService,private toastr: ToastrService, private router: Router) { }
  ngOnInit(): void {
    this.ViewFolders();
    this.form.color="#BEEAFF";
  }

  GridView(){
    this.showGridView = true;
    this.showListView = false;
   
    
    
    }
    ListView(){
    this.showGridView = false;
    this.showListView = true;
    }

    
  ViewFolders(): void {
    this.folderService.ViewFolders()
             .subscribe(
               (response: any) => {
                 this.dataTableList = response.result;
               }) 
   }
   ClearForm(f:any): void {
     f.resetForm();
 
    }
    CreateFolder(f:any): void {
 
    this.folderService.CreateFolder(this.form).subscribe(
    (response: any) => {

      if(response.result=="1")
      {

        this.toastr.success("Folder has been created!","Successfully !!", );
       
        this.ClearForm(f);
        
        this.ViewFolders();
     
        
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
GotoFolderDoc(data:any ): void {
  window.sessionStorage.setItem("FolderName", data.Name);
  this.router.navigateByUrl('client/FolderDocuments/'+data.Id);
} 



}
