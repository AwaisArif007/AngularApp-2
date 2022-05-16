import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../../../Interfaces/user';
import { HttpClient, HttpEvent, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { SocialAuthService } from "angularx-social-login";
import { FacebookLoginProvider, GoogleLoginProvider } from "angularx-social-login";


@Injectable({
  providedIn: 'root'
})


export class AuthService {

 private baseUrl= environment.API_URL;
  // private loggedIn = new BehaviorSubject<boolean>(false);

  // get isLoggedIn() {
  //   return this.loggedIn.asObservable();
  // }

  constructor(private http: HttpClient,private _externalAuthService: SocialAuthService) {}

  signup(data: any): Observable<any> {
    return this.http.post( this.baseUrl+"Account/signUp", data);
  }
  ConfirmEmail(userId: string,token :string): Observable<any> {
    let params = new HttpParams()
    .set('userId', userId)
    .set('token', token);
    return this.http.get( this.baseUrl+"Account/ConfirmEmail",{params});
  }
  
 login(data: any): Observable<any> {
    return this.http.post(this.baseUrl+"Account/signIn", data);
  }
  externallogin(data: any): Observable<any> {
    return this.http.post( this.baseUrl+"Account/ExternalLogin", data);
  }
  public signInWithGoogle = ()=> {
    return this._externalAuthService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }
  public signInWithFB = ()=> {
    return this._externalAuthService.signIn(FacebookLoginProvider.PROVIDER_ID);
  }
  forgetPassword(email: string): Observable<any> {
    let params = new HttpParams()
    .set('email', email);
    return this.http.get(this.baseUrl+"Account/forgetPassword",{params});
  }
  resetPassword(data: any): Observable<any> {
    return this.http.post(this.baseUrl+"Account/ResetPassword",data);
  }
  
  public signOutExternal = () => {
    this._externalAuthService.signOut();
  }
  // reset(data: any): Observable<any> {
  //   return this.http.post("url", data);
  // }
  // forget(data: any): Observable<any> {
  //   return this.http.post("url", data);
  // }
}

  // login(user: User){
  //   if (user.userName !== '' && user.password !== '' ) { 
  //     this.loggedIn.next(true);
  //     this.router.navigate(['/']);
  //   }
  // }

  // logout() {                            
  //   this.loggedIn.next(false);
  //   this.router.navigate(['/login']);
  // }

