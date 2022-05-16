import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DocumentService } from 'src/app/Core/Services/Client/Document/document.service';



@Component({
  selector: 'app-saved-documents',
  templateUrl: './saved-documents.component.html',
  styleUrls: ['./saved-documents.component.css', '../../app.component.css']
})
export class SavedDocumentsComponent implements OnInit {
  dataTableList: any = [];

  constructor(private docService: DocumentService,private toastr: ToastrService,private route :ActivatedRoute) { }
  form: any = {
    statusFilter: null,
  };
  ngOnInit(): void {
    let statusFilter=this.route.snapshot.paramMap.get('statusFilter');
    this.form.statusFilter=statusFilter;
    this.getSavedDocumentList();
  }
  getSavedDocumentList(): void {
    this.docService.GetSavedDocumentDataTable(this.form.statusFilter)
             .subscribe(
               (response: any) => {
                 this.dataTableList = response.result;
               }) 
   }
   addBookmark(docId:string,bookmark:boolean ): void { 

    this.docService.addBookmark(docId,bookmark).subscribe(
    (response: any) => {
      this.getSavedDocumentList();
      },
    (err: any) => {
    this.toastr.error(err.statusText,"Opps! :");
    });

    }  
}
