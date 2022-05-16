import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SettingService {

  private baseUrl= environment.API_URL;

  constructor(private http: HttpClient) { }

  

  AddFeedBack(data: any): Observable<any> {
    return this.http.post( this.baseUrl+"Client/addFeedBack", data);
  }


  AddSharer(data: any): Observable<any> {
    return this.http.post( this.baseUrl+"Client/addSharer", data);
  }
  AddUserInfo(data: any,file : File): Observable<any> {

    const formData: FormData = new FormData();

    formData.append('Name', data.Name);
    formData.append('ProfilePic', data.ProfilePic);
    formData.append('DocExpiringCriteria', data.DocExpiringCriteria);
    formData.append('Email', data.Email);
    formData.append('PhoneNumber', data.PhoneNumber);
    formData.append('file', file);
    return this.http.post( this.baseUrl+"Account/UpdateUserAccount", formData);

  }
  
  SetNotification(data: any): Observable<any> {
    return this.http.post( this.baseUrl+"Client/addNotificationSetting", data);
  }

  ViewNotification(): Observable<any> {
    return this.http.get( this.baseUrl+"Client/getNotifySettingDataTable");
  }

  GetUserInfo(): Observable<any> {
    return this.http.get( this.baseUrl+"Account/GetUserInfo");
  }
  GetSharerDataTable(): Observable<any> {
    return this.http.get( this.baseUrl+"Client/getSharerDataTable");
  }
  FindSharerByEmail(email :string): Observable<any> {
    let params = new HttpParams()
    .set('email', email);
    return this.http.get( this.baseUrl+"Client/findSharerByEmail",{params});
  }
  
}
