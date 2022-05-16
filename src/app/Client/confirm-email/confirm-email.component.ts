import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/Core/Services/Client/Auth/auth.service';

@Component({
  selector: 'app-confirm-email',
  templateUrl: './confirm-email.component.html',
  styleUrls: ['./confirm-email.component.css', '../client.component.css']
})
export class ConfirmEmailComponent implements OnInit {

  constructor(private SignupService: AuthService,private route :ActivatedRoute) { }

  userId="";
  token="";
  form: any = {
    userId: null,
    token: null,

  };
  IsConfirmed:boolean;
  ngOnInit(): void {
     let UserId=this.route.snapshot.paramMap.get('UserId');
    let token=this.route.snapshot.paramMap.get('token');
    this.form.userId=UserId;
    this.form.token=token;
    this.ConfirmEmail()
  }
  ConfirmEmail(): void {
    this.SignupService.ConfirmEmail(this.form.userId,this.form.token)
            .subscribe(
              (response: any) => {
                if(response.Succeeded==true)
                {
                  this.IsConfirmed=true;
                }
                else{
                  this.IsConfirmed=false;
                }

              })
  }
}
