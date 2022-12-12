import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MesaService } from 'src/app/services/mesa.service';
import { Reporte } from '../../../models/reporte.model';
import { ReportesService } from '../../../services/reportes.service';

@Component({
  selector: 'app-graficas',
  templateUrl: './graficas.component.html',
  styleUrls: ['./graficas.component.scss']
})
export class GraficasComponent implements OnInit {

  reportes: Reporte[] = [];
  reporte: Reporte = new Reporte;
  data: any;
  multiAxisData: any;

  cantMesas : Array<number> = [];
  cedulas: number = 0;
 
  votosPetro: number = 0;
  votosRodolfo : number = 0;
  votosBlanco : number = 0;
  total : number = 0;
  porcentajePetro: number = 0;
  porcentajeRodolfo: number = 0;
  porcentajeBlanco: number = 0;
  name: string = 'Gustavo Petro';
  name2: string = 'Rodolfo Hernández';
  name3: string = 'Voto en blanco';

  cand1 : Array<number> = [];
  cand2 : Array<number> = [];
  cand3 : Array<number> = [];
  mesas : Array<string> = [];
  
  constructor(public router : Router, public miServicioReportes: ReportesService, public miServicioMesas : MesaService) { }

  ngOnInit(): void {
    this.miServicioMesas.listar().subscribe(data =>{
      this.reportes=data
      data.forEach(mesa =>{
        this.cantMesas.push(Number(mesa.cedulas_inscritas)*1000)
      })
      this.miServicioReportes.listar().subscribe(data =>{
        this.reportes=data
        data.forEach(report =>{
          this.votosPetro = this.votosPetro + Number(report.votos)*1000
          this.votosRodolfo = this.votosRodolfo + Number(report.votos2)*1000

          this.cand1.push(Number(report.votos)*1000)
          this.cand2.push(Number(report.votos2)*1000)
          this.mesas.push(String(report.mesa))
        })

        for (let i = 0; i < this.cantMesas.length; i++) {
          this.cedulas = this.cantMesas[i] - (this.cand1[i] + this.cand2[i])
          this.votosBlanco = this.votosBlanco + this.cedulas
          this.cand3.push(this.cedulas)
        }
      
        this.total = this.votosPetro + this.votosRodolfo + this.votosBlanco
        this.porcentajePetro = (this.votosPetro * 100)/this.total
        this.porcentajeRodolfo = (this.votosRodolfo * 100)/this.total
        this.porcentajeBlanco = (this.votosBlanco * 100)/this.total
        
        this.data = {
          labels: [this.name +' '+'('+ this.porcentajePetro.toPrecision(6)+'%)', 
                  this.name2 +' '+'('+ this.porcentajeRodolfo.toPrecision(6)+'%)',
                  this.name3 +' '+'('+ this.porcentajeBlanco.toPrecision(6)+'%)'],

          datasets: [
              {
                  data: [this.votosPetro, this.votosRodolfo, this.votosBlanco],
                  
                  backgroundColor: [
                      "#66BB6A",  
                      "#42A5F5",
                      "#FFA726"
                  ],
                  hoverBackgroundColor: [
                      "#81C784",
                      "#64B5F6",
                      "#FFA726"
                  ]
              }
          ]
        };

        this.multiAxisData = {
          labels: this.mesas,
          datasets: [{
              label: 'Petro',
              backgroundColor: [
                  '#66BB6A',
              ],
              candidato: 'y',
              data: this.cand1
          }, {
              label: 'Rodolfo',
              backgroundColor: '#42A5F5',
              candidato: 'y1',
              data: this.cand2
          },{
            label: 'Voto en blanco',
            backgroundColor: '#FFA726',
            candidato: 'y2',
            data: this.cand3
          }]
        };
      })
    })
  }

}
