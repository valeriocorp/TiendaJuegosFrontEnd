import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContacModule } from './@public/pages/contac/contac.module';

const routes: Routes = [
  {
    path: '', redirectTo: 'home', pathMatch: 'full'
  },

  {
    path: '**', redirectTo: 'home', pathMatch: 'full'
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes,
    {useHash: true,
     scrollPositionRestoration: 'enabled'
    }
    )],
  exports: [RouterModule]
})
export class AppRoutingModule { }
