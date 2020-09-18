import { Component, OnInit } from '@angular/core';
import { DocumentNode } from 'graphql';
import { IResultData } from '../../../@core/interfaces/result-data.interface';
import { USER_LIST_QUERY } from '@graphql/operations/query/user';
import { ITableColums } from '@core/interfaces/table-colums.interface';
import { infoDetailBasic, userformBasicDialog } from '@shared/alert/alerts';
import { UsersAdminService } from './users-admin.service';
import { IRegisterForm } from '../../../@core/interfaces/register.interface';
import { basicAlert } from '@shared/alert/toasts';
import { TYPE_ALERT } from '@shared/alert/values.config';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

 query: DocumentNode = USER_LIST_QUERY;
 context: object;
 itemsPage: number;
 resultData: IResultData;
 include: boolean;
 columns: Array<ITableColums>;

 constructor(private service: UsersAdminService){}

  ngOnInit(): void {
    this.context = {};
    this.itemsPage = 10;
    this.resultData = {
      listKey: 'users',
      definitionKey: 'users',
    };
    this.include = true;
    this.columns = [
      {
        property: 'id',
        label: '#'
      },
      {
        property: 'name',
        label: 'Nombre del usuario'
      },
      {
        property: 'lastname',
        label: 'Apellidos del usuario'
      },
      {
        property: 'email',
        label: 'Email del usuario'
      },
      {
        property: 'role',
        label: 'Permisos del usuario'
      },
      {
        property: 'birthday',
        label: 'Dia de cumpleaños del usuario'
      },
    ];
  }

  private inicializeForm(user: any){
    const defaultName =
    user.name !== undefined && user.name !== '' ? user.name : '';
    const defaultLastname =
    user.lastname !== undefined && user.lastname !== '' ? user.lastname : '';
    const defaultEmail =
    user.email !== undefined && user.email !== '' ? user.email : '';
    const roles = new Array(2);
    roles[0] = user.role !== undefined && user.role === 'ADMIN' ? 'selected' : '';
    roles[1] = user.role !== undefined && user.role === 'CLIENT' ? 'selected' : '';
    return `
    <input id="name" value="${defaultName}" class="swal2-input" placeholder="nombre" required>
    <input id="lastname" value="${defaultLastname}" class="swal2-input" placeholder="apellido" required>
    <input id="email" value="${defaultEmail}" class="swal2-input" placeholder="correo" required>
    <select id="role" class="swal2-input">
      <option value="ADMIN" ${roles[0]}>Administrador</option>
      <option value="CLIENT" ${roles[1]}>Cliente</option>
    </select>

    `;
  }

  async takeAction($event) {
    const action = $event[0];
    const user = $event[1];
    const html = this.inicializeForm(user);
    switch (action) {
      case 'add':
       this.addForm(html);
       break;
      case 'edit':
        this.updateForm(html, user);
        break;
      case 'info':
        const result = await infoDetailBasic(
          'Detalles',
          `${user.name} ${user.lastname}<br/>
          <i class="fas fa-envelope-open-text"></i>&nbsp;&nbsp;${user.email}`,
          420
        );
        if (result) {
         this.updateForm(html, user);
        } else if (result === false) {
          this.blockForm(user);
        }
        break;
      case 'block':
        this.blockForm(user);
        break;
      default:
        break;
    }


  }
  private async addForm(html: string) {
    const result = await userformBasicDialog('Añadir usuario', html);
    console.log(result);
    this.addUser(result);
  }
  private addUser(result){
    if (result.value) {
      const user: IRegisterForm = result.value;
      user.password = '123456';
      user.active = false;
      this.service.register(user).subscribe((res: any) => {
        console.log(res);
        if (res.status) {
          basicAlert(TYPE_ALERT.SUCCESS, res.message);
          return;
        }
        basicAlert(TYPE_ALERT.WARNING, res.message);
      });
    }
  }

  private async updateForm(html: string, user: any){
    const result = await userformBasicDialog('Modificar usuario', html);
    console.log(result);
    this.updateUser(result, user.id);
  }

  private updateUser(result, id: string){
    if (result.value) {
      const user = result.value;
      user.id = id;
      this.service.update(result.value).subscribe((res: any) => {
        console.log(res);
        if (res.status) {
          basicAlert(TYPE_ALERT.SUCCESS, res.message);
          return;
        }
        basicAlert(TYPE_ALERT.WARNING, res.message);
      });
    }
  }

  private async blockForm(user: any) {
    const result = await infoDetailBasic(
      '¿Estas seguro que deseas bloquear?',
      'Si bloqueas el usuario seleccionado, no se mostrara mas',
      500,
      'No, no bloquear',
      'Si, si bloquear'
    );
    if (result === false) {
      this.blockUser(user.id);
    }
  }

  blockUser(id: string) {
    this.service.block(id).subscribe((res: any) => {
      console.log(res);
      if (res.status) {
        basicAlert(TYPE_ALERT.SUCCESS, res.message);
        return;
      }
      basicAlert(TYPE_ALERT.WARNING, res.message);
    });
  }

}
