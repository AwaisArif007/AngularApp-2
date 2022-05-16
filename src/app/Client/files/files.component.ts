import { Component, OnInit } from '@angular/core';
import { DocumentService } from 'src/app/Core/Services/Client/Document/document.service';
import { ToastrService } from 'ngx-toastr';
import { SettingService } from 'src/app/Core/Services/Client/Setting/setting.service';

@Component({
  selector: 'app-files',
  templateUrl: './files.component.html',
  styleUrls: ['./files.component.css', '../../app.component.css']
})
export class FilesComponent implements OnInit {

  fileList: any = [];
  constructor(private toastr: ToastrService,private docService:DocumentService) { }

  ngOnInit(): void {
    this.GetFilesDataTable();
  }
  GetFilesDataTable():void {

    this.docService.GetFilesDataTable().subscribe(
       (response: any) => {
        this.fileList=response.result;
       },
       (error: any) => {
         this.toastr.error(error,"Error!!", );
       }
 
     )
   }
}
