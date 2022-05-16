import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DocumentService } from 'src/app/Core/Services/Client/Document/document.service';

@Component({
  selector: 'app-folder-documents',
  templateUrl: './folder-documents.component.html',
  styleUrls: ['./folder-documents.component.css', '../../app.component.css']
})
export class FolderDocumentsComponent implements OnInit {

  dataTableList: any = [];

  constructor(private docService: DocumentService,private toastr: ToastrService,private route :ActivatedRoute) { }
  form: any = {
    folderId: null,
    foldername:null,
  };
  foldername :string;
  ngOnInit(): void {
    let folderId=this.route.snapshot.paramMap.get('folderId');
    this.form.folderId=folderId;
    this.form.foldername= window.sessionStorage.getItem("FolderName");
    this.GetDocumentByFolderId();
  }
  GetDocumentByFolderId(): void {
    this.docService.GetDocumentByFolderId(this.form.folderId)
             .subscribe(
               (response: any) => {
                 this.dataTableList = response.result;
               }) 
   }
   addBookmark(docId:string,bookmark:boolean ): void { 

    this.docService.addBookmark(docId,bookmark).subscribe(
    (response: any) => {
      this.GetDocumentByFolderId();
      },
    (err: any) => {
    this.toastr.error(err.statusText,"Opps! :");
    });

    }  
}
