import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ResultadosRoutingModule } from './resultados-routing.module';
import { ReportesComponent } from './reportes/reportes.component';
import { MesasComponent } from './mesas/mesas.component';
import { PartidosComponent } from './partidos/partidos.component';
import { CandidatosComponent } from './candidatos/candidatos.component';
import { ResultadosComponent } from './resultados/resultados.component';


@NgModule({
  declarations: [
    ReportesComponent,
    MesasComponent,
    PartidosComponent,
    CandidatosComponent,
    ResultadosComponent
  ],
  imports: [
    CommonModule,
    ResultadosRoutingModule
  ]
})
export class ResultadosModule { }
