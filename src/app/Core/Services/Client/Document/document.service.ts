import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  private baseUrl= environment.API_URL;
  
  

  constructor(private http: HttpClient) { }
  AddDocument(data: any,selectedFiles : FileList,sendOn:any,remindOn:any): Observable<any> {
    const formData: FormData = new FormData();

    formData.append('DocName', data.DocName);
    formData.append('ExpiryDate', data.ExpiryDate);
    formData.append('IssueDate', data.IssueDate);
    formData.append('ValidFor', data.ValidFor);
    formData.append('DocTypeId', data.DocTypeId);
    formData.append('FolderId', data.FolderId);
    formData.append('DocOwnerName', data.DocOwnerName);
    formData.append('DocNumber', data.DocNumber);
    formData.append('CountryId', data.CountryId);
    formData.append('StateId', data.StateId);
    formData.append('RemindMe', data.RemindMe);
    formData.append('ValidForPeriod', data.ValidForPeriod);
    formData.append('ReminderCustomCount', data.ReminderCustomCount);
    formData.append('ReminderCustomPeriod', data.ReminderCustomPeriod);
    if(selectedFiles)
    {
      for (let i = 0; i < selectedFiles.length; i++) {
        formData.append('file', selectedFiles[i]);
      }
    }
    
      formData.append('sendOn',JSON.stringify(sendOn));
      formData.append('remindOn',JSON.stringify(remindOn));
    return this.http.post( this.baseUrl+"Client/addDocument", formData);
  }
  
  addBookmark(docId:string,bookmark :boolean): Observable<any> {
    let params = new HttpParams()
    .set('bookmark', bookmark)
    .set('docId', docId);
    return this.http.get( this.baseUrl+"Client/addBookmark",{params});
  }
  GetSavedDocumentDataTable(statusFilter:number): Observable<any> {

    let params = new HttpParams()
    .set('statusFilter', statusFilter);
    return this.http.get( this.baseUrl+"Client/GetSavedDocumentDataTable",{params});
  }
  GetDocumentByFolderId(folderId:number): Observable<any> {

    let params = new HttpParams()
    .set('folderId', folderId);
    return this.http.get( this.baseUrl+"Client/GetDocumentByFolderId",{params});
  }
  
  AddDocumentType(data: any): Observable<any> {
    return this.http.post( this.baseUrl+"Client/addDocType", data);
  }
  AddNewDocType (data: any): Observable<any> {
    return this.http.post( this.baseUrl+"Client/addDocType",data);
  }
 
  GetFilesDataTable (): Observable<any> {
    return this.http.get( this.baseUrl+"Client/GetFilesDataTable");
  }
  GetTaskList (): Observable<any> {
    return this.http.get( this.baseUrl+"Client/GetTaskList");
  }

  
  GetDocumentByMonth (month:number): Observable<any> {
    let params = new HttpParams()
    .set('month', month);
    return this.http.get( this.baseUrl+"Client/GetDocumentByMonth",{params});
  }
}   
