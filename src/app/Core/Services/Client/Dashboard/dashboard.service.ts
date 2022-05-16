import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  private baseUrl= environment.API_URL;
  constructor(private http: HttpClient) { }

 
  GetDashboardCounts(): Observable<any> {
    return this.http.get( this.baseUrl+"Client/GetDashboardCounts");
  }
  GetActiveDocDataTable(): Observable<any> {
    return this.http.get( this.baseUrl+"Client/GetActiveDocDataTable");
  }
  GetExpiringDocDataTable(): Observable<any> {
    return this.http.get( this.baseUrl+"Client/GetExpiringDocDataTable");
  }
  GetExpiredDocDataTable(): Observable<any> {
    return this.http.get( this.baseUrl+"Client/GetExpiredDocDataTable");
  }
  SaveNote(data: any): Observable<any> {
    return this.http.post( this.baseUrl+"Client/SaveNote", data);
  }
  AddTask(data: any): Observable<any> {
    return this.http.post( this.baseUrl+"Client/AddTask", data);
  }
  shareDcument(data: any): Observable<any> {
    return this.http.post( this.baseUrl+"Client/addDocSharing", data);
  }
  
  addSharer(data: any): Observable<any> {
    return this.http.post( this.baseUrl+"Account/addSharer", data,{responseType: 'text'});
  }
  
  WelcomeMsg(): Observable<any> {
    return this.http.get( this.baseUrl+"Account/welcomeMsg");
  }
  
  AssignedToFilter(assignPersonId:string,docId:string): Observable<any> {
    let params = new HttpParams()
    .set('AssignPersonId', assignPersonId)
    .set('docId', docId);
    return this.http.get( this.baseUrl+"Client/GetTaskByAssignPerson",{params});
  }
  addBookmark(docId:string,bookmark :boolean): Observable<any> {
    let params = new HttpParams()
    .set('bookmark', bookmark)
    .set('docId', docId);
    return this.http.get( this.baseUrl+"Client/addBookmark",{params});
  }
  
  GetDocumentById(id:string): Observable<any> {
    let params = new HttpParams()
    .set('DocId', id);
    return this.http.get( this.baseUrl+"Client/GetDocumentById",{params});
  }
  
  GetTaskDataTable(id:string): Observable<any> {
    let params = new HttpParams()
    .set('docId', id);
    return this.http.get( this.baseUrl+"Client/GetTaskDataTable",{params});
  }
  GetSharedDocbyId(id:string): Observable<any> {
    let params = new HttpParams()
    .set('docId', id);
    return this.http.get( this.baseUrl+"Client/GetDocSharingDataTable",{params});
  }

  updateDocument(data: any,selectedFiles : FileList,sendOn:any,remindOn:any): Observable<any> {
    const formData: FormData = new FormData();

    formData.append('Id', data.Id);
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
    return this.http.post( this.baseUrl+"Client/updateDocument", formData);
  }

  GetDocumentByMonth (month:number): Observable<any> {
    let params = new HttpParams()
    .set('month', month);
    return this.http.get( this.baseUrl+"Client/GetDocumentByMonth",{params});
  }
  getNotifyDataTable (): Observable<any> {
    return this.http.get( this.baseUrl+"Client/getNotifyDataTable");
  }
}
