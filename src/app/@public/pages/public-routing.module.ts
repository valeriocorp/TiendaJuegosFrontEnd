import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PublicComponent } from './public.component';

const routes: Routes = [
  {
    path: '',
    component: PublicComponent,
    children: [
      {path: '',
      loadChildren: () => import('./home/home.module').then(m => m.HomeModule),
     },
     {path: 'contact',
      loadChildren: () => import('./contac/contac.module').then(m => m.ContacModule),
     },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PublicRoutingModule { }
