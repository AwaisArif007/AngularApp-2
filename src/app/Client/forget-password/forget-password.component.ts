import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/Core/Services/Client/Auth/auth.service';
import { TokenStorageService } from 'src/app/Core/Services/Client/token-storage.service';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css', '../client.component.css']
})
export class ForgetPasswordComponent implements OnInit {

 
forgetPass: any = {
  email: '',

} 
  constructor(private authService: AuthService,private toastr: ToastrService) { }

  ngOnInit(): void {
  }
  ClearForm(f:any): void {
    f.resetForm();

   }
  onSubmit(f:any) {
    this.authService.forgetPassword(this.forgetPass.email).subscribe(
     (response: any) => {
       if(response==1)
       {
        this.toastr.info("Plese check your email.","Info!!" );
        this.ClearForm(f);
       }
 
       },
       (error: any) => {
         this.toastr.error(error,"Error!!");
      }
 
     )  
   }
}
