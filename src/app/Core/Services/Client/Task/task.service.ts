import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private baseUrl= environment.API_URL;
  constructor(private http: HttpClient) { }

   CreateTask(data: any): Observable<any> {
    return this.http.post( this.baseUrl+"Client/addFolder", data);
  }
  EditTask(data: any): Observable<any> {
    return this.http.post( this.baseUrl+"Client/updateFolder", data);
  }
  ViewTasks(): Observable<any> {
    return this.http.get( this.baseUrl+"Client/getFolderDataTable");
  }
   AddFeedBack(data: any): Observable<any> {
    return this.http.post( this.baseUrl+"Client/addFolder", data);
  }
  
}
