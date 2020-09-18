import { GENRE_LIST_QUERY } from '@graphql/operations/query/genre';
import { Component, OnInit } from '@angular/core';
import { DocumentNode } from 'graphql';
import { IResultData } from '@core/interfaces/result-data.interface';
import { ITableColums } from '@core/interfaces/table-colums.interface';
import { formBasicDialog } from '@shared/alert/alerts';
import { GenresService } from './genres.service';
import { basicAlert } from '@shared/alert/toasts';
import { TYPE_ALERT } from '@shared/alert/values.config';
import { infoDetailBasic } from '@shared/alert/alerts';
@Component({
  selector: 'app-genres',
  templateUrl: './genres.component.html',
  styleUrls: ['./genres.component.scss'],
})
export class GenresComponent implements OnInit {
  query: DocumentNode = GENRE_LIST_QUERY;
  context: object;
  itemsPage: number;
  resultData: IResultData;
  include: boolean;
  columns: Array<ITableColums>;

  constructor(private service: GenresService) {}

  ngOnInit(): void {
    this.context = {};
    this.itemsPage = 10;
    this.resultData = {
      listKey: 'genres',
      definitionKey: 'genres',
    };
    this.include = false;
    this.columns = [
      {
        property: 'id',
        label: '#',
      },
      {
        property: 'name',
        label: 'Nombre del genero',
      },
      {
        property: 'slug',
        label: 'Slug',
      },
    ];
  }

  async takeAction($event) {
    const action = $event[0];
    const genre = $event[1];
    const defaultValue =
      genre.name !== undefined && genre.name !== '' ? genre.name : '';
    const html = `<input id="name" value="${defaultValue}" class="swal2-input" required>`;
    switch (action) {
      case 'add':
        this.addForm(html);
        break;
      case 'edit':
        this.updateForm(html, genre);
        break;
      case 'info':
        const result = await infoDetailBasic(
          'Detalles',
          `${genre.name} (${genre.slug})`,
          420
        );
        if (result) {
          this.updateForm(html, genre);
        } else if (result === false) {
          this.blockForm(genre);
        }
        break;
      case 'block':
        this.blockForm(genre);
        break;
      default:
        break;
    }


  }

  private async addForm(html: string) {
    const result = await formBasicDialog('Añadir genero', html, 'name');
    console.log(result);
    this.addGenre(result);
  }
  private async blockForm(genre: any) {
    const result = await infoDetailBasic(
      '¿Estas seguro que deseas bloquear?',
      'Si bloqueas el item seleccionado, no se mostrara mas',
      500,
      'No, no bloquear',
      'Si, si bloquear'
    );
    if (result === false) {
      this.blockGenre(genre.id);
    }
  }

  private async updateForm(html: string, genre: any) {
    const result = await formBasicDialog('Modificar genero', html, 'name');
    console.log(result);
    this.updateGenre(genre.id, result);
  }

  addGenre(result) {
    if (result.value) {
      this.service.add(result.value).subscribe((res: any) => {
        console.log(res);
        if (res.status) {
          basicAlert(TYPE_ALERT.SUCCESS, res.message);
          return;
        }
        basicAlert(TYPE_ALERT.WARNING, res.message);
      });
    }
  }
  updateGenre(id: string, result) {
    if (result.value) {
      this.service.update(id, result.value).subscribe((res: any) => {
        console.log(res);
        if (res.status) {
          basicAlert(TYPE_ALERT.SUCCESS, res.message);
          return;
        }
        basicAlert(TYPE_ALERT.WARNING, res.message);
      });
    }
  }
  blockGenre(id: string) {
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
