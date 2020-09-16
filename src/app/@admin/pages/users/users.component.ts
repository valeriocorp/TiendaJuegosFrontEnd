import { Component, OnInit } from '@angular/core';
import { DocumentNode } from 'graphql';
import { IResultData } from '../../../@core/interfaces/result-data.interface';
import { USER_LIST_QUERY } from '@graphql/operations/query/user';
import { ITableColums } from '@core/interfaces/table-colums.interface';

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

}
