import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/Core/Services/Client/Auth/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css', '../client.component.css']
})
export class ResetPasswordComponent implements OnInit {

show_button: Boolean = false;
  hide_button: Boolean = true;

  show_button2: Boolean = false;
  hide_button2: Boolean = true;

  Resetform: any = {
    Password: '',
    ConfirmPassword: '',
    email:'',
    token:'',

  }
  constructor(private SignupService: AuthService,private route :ActivatedRoute,private toastr: ToastrService) { }

  ngOnInit(): void {
    let email=this.route.snapshot.paramMap.get('email');
    let token=this.route.snapshot.paramMap.get('token');
    this.Resetform.email=email;
    this.Resetform.token=token;
  }
  ClearForm(f:any): void {
    f.resetForm();

   }
  resetPassword(f:any): void {
    this.SignupService.resetPassword(this.Resetform)
            .subscribe(
              (response: any) => {
              if(response.Succeeded==true)
                {
                  
                this.toastr.success("Password has been Updated.","Successfully!!" );
                this.ClearForm(f);
                }
              } , (error: any) => {
                this.toastr.error(error,"Error!!");
             }
        )
  }

  showPassword() {
  
    this.show_button = !this.show_button;
    this.hide_button = !this.hide_button;
  }

    showPassword2() {
  
    this.show_button2 = !this.show_button2;
    this.hide_button2 = !this.hide_button2;
  }
}
