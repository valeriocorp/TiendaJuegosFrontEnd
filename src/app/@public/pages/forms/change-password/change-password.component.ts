import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { basicAlert } from '@shared/alert/toasts';
import { TYPE_ALERT } from '@shared/alert/values.config';
import { PasswordService } from '../../../../@core/services/password.service';


@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {
  token: string;
  values = {
    password: '',
    passwordTwo: ''
  };

  constructor(private route: ActivatedRoute, private passwordService: PasswordService, private router: Router) {
    this.route.params.subscribe(params => {
      console.log(params.token);
      this.token = params.token;
    });
   }
  ngOnInit(): void {
  }

  reset(){
  console.log(this.values);
  if (this.values.password !== this.values.passwordTwo) {
    basicAlert(TYPE_ALERT.WARNING, 'Las contraseñas no coinciden, intentalo otra ves', 'center');
    return;
  }
  this.passwordService.change(this.token, this.values.password).subscribe(
      result => {
        console.log(result);
        if (result.status) {
          basicAlert(TYPE_ALERT.SUCCESS, result.message);
          this.router.navigate(['login']);
          return;
        }
        basicAlert(TYPE_ALERT.WARNING, result.message);
      }
  );
  }

}
