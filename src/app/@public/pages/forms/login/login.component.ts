import { Component, OnInit } from '@angular/core';
import {ILoginForm, IResultLogin} from '@core/interfaces/login.interface';
import { AuthService } from '@core/services/auth.service';
import { basicAlert } from '../../../../@shared/alert/toasts';
import { TYPE_ALERT } from 'src/app/@shared/alert/values.config';
import { IMeData } from '../../../../@core/interfaces/session.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent{

  login: ILoginForm = {
    email: '',
    password: ''
  };

  constructor(private auth: AuthService, private router: Router) { }



  init(){
    console.log(this.login);
    this.auth.login(this.login.email, this.login.password)
    .subscribe((result: IResultLogin) => {
    if (result.status) {
      if (result.token !== null) {
        console.log(result);
        basicAlert(TYPE_ALERT.SUCCESS, result.message);
        this.auth.setSession(result.token);
        this.auth.updateSession(result);
        this.router.navigate(['/home']);
        return;
      }
      basicAlert(TYPE_ALERT.WARNING, result.message);
      return;
    }
    basicAlert(TYPE_ALERT.INFO, result.message);
    });
  }
}
