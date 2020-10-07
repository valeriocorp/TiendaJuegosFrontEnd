import { Injectable } from '@angular/core';
import { UsersService } from '@core/services/users.service';
import { IRegisterForm } from '@core/interfaces/register.interface';
import { Apollo } from 'apollo-angular';
import { ApiService } from '@graphql/services/api.service';
import { BLOCK_USER, UPDATE_USER, ACTIVE_EMAIL_USER } from '../../../@graphql/operations/mutation/user';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UsersAdminService extends ApiService{

  constructor(private userService: UsersService, apollo: Apollo) {
    super(apollo);
  }

  register(user: IRegisterForm) {
   return this.userService.register(user);
  }

  update(user: IRegisterForm) {
    return this.set(
      UPDATE_USER,
      {
        user,
        include: false
      },
      {}).pipe(
        map((res: any) => {
        return res.updateUser;
        })
      );
  }

  unblock(id: string, unblock: boolean = false, admin: boolean = false) {
    return this.set(
      BLOCK_USER,
      {
        id,
        unblock,
        admin
      },
      {}).pipe(
        map((res: any) => {
        return res.blockUser;
        })
      );
  }

  sendEmailActive(id: string, email: string){
    return this.set(
      ACTIVE_EMAIL_USER,
      {
        id,
        email
      },
      {}).pipe(
        map((res: any) => {
        return res.activeUserEmail;
        })
      );
  }
}
