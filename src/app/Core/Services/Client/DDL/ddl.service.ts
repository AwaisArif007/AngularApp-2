import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DDLService {

  private baseUrl= environment.API_URL;

  constructor(private http: HttpClient) { }
  getCountryDDL (): Observable<any> {
    return this.http.get( this.baseUrl+"DDL/getCountryDDL");
  }
  getStateDDL (CountryId : number): Observable<any> {
    let params = new HttpParams()
    .set('CountryId', CountryId);
    return this.http.get( this.baseUrl+"DDL/getStateDDL",{params});
  }
  getDocTypeDDL (): Observable<any> {
    return this.http.get( this.baseUrl+"DDL/getDocTypeDDL");
  }
  getUserFoldersDLL (): Observable<any> {
    return this.http.get( this.baseUrl+"DDL/getUserFoldersDLL");
  }
  GetAccessTypeDDL(): Observable<any> {
    return this.http.get( this.baseUrl+"DDL/getAccessTypeDDL");
  }
  GetSharerByUserDDL(): Observable<any> {
    return this.http.get( this.baseUrl+"DDL/getSharerByUserDDL");
  }
  GetAssignTaskUserByDocIdDLL(id:string): Observable<any> {
    let params = new HttpParams()
    .set('DocId', id);
    return this.http.get( this.baseUrl+"DDL/GetAssignTaskUserByDocIdDLL",{params});
  }
  
}
