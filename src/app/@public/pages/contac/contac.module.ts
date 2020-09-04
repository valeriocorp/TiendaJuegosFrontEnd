import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContacRoutingModule } from './contac-routing.module';
import { ContacComponent } from './contac.component';


@NgModule({
  declarations: [ContacComponent],
  imports: [
    CommonModule,
    ContacRoutingModule
  ]
})
export class ContacModule { }
