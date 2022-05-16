import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/Core/Services/Client/Auth/auth.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { TokenStorageService } from 'src/app/Core/Services/Client/token-storage.service';
import { FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css', '../client.component.css'],
})
export class LoginComponent implements OnInit {




SignINdata: any = {
    userName: '',
    password: '',
    RememberMe:false
  } 
  isLoggedIn = false;
  isLoginFailed = false;
  
emailPattern = "^([a-zA-Z0-9!#$%&'*+\/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+\/=?^_`{|}~-]+)*@(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\.)+[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?)$"
 


  constructor(private LoginService: AuthService,private toastr: ToastrService,private tokenStorage: TokenStorageService,private router: Router) { }
 
  ngOnInit(): void {
   
   
  }
   onSubmit() {
    console.log("submit hit");

   this.LoginService.login(this.SignINdata).subscribe(
    (response: any) => {
      if(response==-1)
      {
        this.toastr.error("Email is not confirmed yet.","Not confirmed!!", );
      }
      else
      {
        this.tokenStorage.saveToken(response.accessToken);
        this.tokenStorage.saveUser(response); 
        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.router.navigate(['/client/dashboard']);
  
      
      }
       },
      (error: any) => {
       
        if(error.error.status==401)
        {
          this.toastr.error("Invalid Credentials","Error!!", );
        }
        this.isLoginFailed = true;
     }

    )  
  }

}
