import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { TieredMenuModule } from 'primeng/tieredmenu';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    PagesRoutingModule,
    TieredMenuModule
  ]
})
export class PagesModule { }
