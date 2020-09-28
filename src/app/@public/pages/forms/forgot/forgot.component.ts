import { Component, OnInit } from '@angular/core';
import { basicAlert } from '@shared/alert/toasts';
import { TYPE_ALERT } from '@shared/alert/values.config';
import { EMAIL_PATTERN } from '../../../../@core/constant/regex';
import { PasswordService } from '../../../../@core/services/password.service';

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.scss']
})
export class ForgotComponent implements OnInit {
  emailvalue: string;
  pattern = EMAIL_PATTERN;

  constructor(private password: PasswordService) { }

  ngOnInit(): void {
  }

  reset(){
    this.password.reset(this.emailvalue).subscribe(
      result => {
        console.log(result);
        if (result.status) {
          basicAlert(TYPE_ALERT.SUCCESS, result.message);
          return;
        }
        basicAlert(TYPE_ALERT.WARNING, result.message);
      }
    );
  }

}
