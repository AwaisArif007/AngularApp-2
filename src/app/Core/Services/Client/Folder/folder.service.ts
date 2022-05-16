import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FolderService {
  private baseUrl= environment.API_URL;
  constructor(private http: HttpClient) { }

   CreateFolder(data: any): Observable<any> {
    return this.http.post( this.baseUrl+"Client/addFolder", data);
  }
  EditFolder(data: any): Observable<any> {
    return this.http.post( this.baseUrl+"Client/updateFolder", data);
  }
  ViewFolders(): Observable<any> {
    return this.http.get( this.baseUrl+"Client/getFolderDataTable");
  }

}
   
