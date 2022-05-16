import { Component, OnInit } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';
import { SocialUser } from 'angularx-social-login';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/Core/Services/Client/Auth/auth.service';
import { TokenStorageService } from 'src/app/Core/Services/Client/token-storage.service';



@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css', '../client.component.css']
})

export class SignUpComponent implements OnInit {
show_button: Boolean = false;
  hide_button: Boolean = true;

  Signupdata: any = {
    name: '',
    email: '',
    password: '',
  
  }
  ExternalAuthDto: any = {
    provider: '',
    id: '',
    name: '',
    email: '',
  
  }
  constructor(private SignupService: AuthService,private toastr: ToastrService,private tokenStorage: TokenStorageService,private router: Router) { }

  ngOnInit(): void {
   
  }
  ClearForm(f:any): void {
    f.resetForm();

   }
  onSubmit(f:any) {

   this.SignupService.signup(this.Signupdata).subscribe(
      (response: any) => {
        if(response.Succeeded)
        {
          this.toastr.success("You have been Registered.Please confirmed your email before login!","Successfully!!", );
          this.ClearForm(f);
        }
        if(!response.Succeeded)
        {

          this.toastr.error(response.Errors[0].Description,"Error!!", );
        }

      },
      (error: any) => {
        this.toastr.error(error,"Error!!", );
      }

    )
  }

  
  GoogleLogin():void {
    this.SignupService.signInWithGoogle()
    .then(res => {
      const user: SocialUser = { ...res };
      console.log(user);
        this.ExternalAuthDto.provider= user.provider,
        this.ExternalAuthDto.id= user.id,
        this.ExternalAuthDto.email= user.email,
        this.ExternalAuthDto.name= user.name
     
      this.SignupService.externallogin(this.ExternalAuthDto).subscribe(
        (response: any) => {
          this.tokenStorage.saveToken(response.accessToken);
          this.tokenStorage.saveUser(response); 
          this.router.navigate(['/client/dashboard']);
  
        },
        (error: any) => {
          this.toastr.error(error,"Error!!", );
        }
  
      ) 
    }, error => console.log(error))
  }
  FacebookLogin():void {
    this.SignupService.signInWithFB()
    .then(res => {
      const user: SocialUser = { ...res };
      console.log(user);
        this.ExternalAuthDto.provider= user.provider,
        this.ExternalAuthDto.id= user.id,
        this.ExternalAuthDto.email= user.email,
        this.ExternalAuthDto.name= user.name
     
      this.SignupService.externallogin(this.ExternalAuthDto).subscribe(
        (response: any) => {
          this.tokenStorage.saveToken(response.accessToken);
          this.tokenStorage.saveUser(response); 
          this.router.navigate(['/client/dashboard']);
  
        },
        (error: any) => {
          this.toastr.error(error,"Error!!", );
        }
  
      ) 
    }, error => console.log(error))
  }
  
  
  
showPassword() {
  
    this.show_button = !this.show_button;
    this.hide_button = !this.hide_button;
  }
}
