import { Injectable } from '@angular/core';
import { UsersService } from '@core/services/users.service';
import { IRegisterForm } from '@core/interfaces/register.interface';
import { Apollo } from 'apollo-angular';
import { ApiService } from '@graphql/services/api.service';
import { BLOCK_USER, UPDATE_USER } from '../../../@graphql/operations/mutation/user';
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

  block(id: string) {
    return this.set(
      BLOCK_USER,
      {
        id
      },
      {}).pipe(
        map((res: any) => {
        return res.blockUser;
        })
      );
  }
}
