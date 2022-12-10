import { Router } from '@angular/router';
import { Reporte } from '../../../models/reporte.model';
import { ReportesService } from '../../../services/reportes.service';
import Swal from 'sweetalert2';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.component.html',
  styleUrls: ['./reportes.component.scss']
})
export class ReportesComponent implements OnInit {

  resultados: Reporte[] = [];
  resultado: Reporte = new Reporte;
  datam: any;
  datad: any;
  resultadoForm! : FormGroup;

  displayModal: boolean = false;
  actionButton : string = "";
  intentoEnvio: boolean = false;
  
  
  constructor(private formBuilder: FormBuilder, public miServicioReportes: ReportesService, public router: Router) { }

  ngOnInit(): void { 
    this.listar(); 
    this.resultadoForm = this.formBuilder.group({
      mesa : ['', Validators.required],
      numeroCandidato : ['', Validators.required],
      votos : ['', Validators.required],
      partido : ['', Validators.required]
    })
  } 

  showModalDialog() {
    this.actionButton = 'Save';
    this.displayModal = true;
  }

  listar():void{ 
    this.miServicioReportes.listar().subscribe(data =>{
      this.resultados=data
      // console.log(data);
    })
  } 

  agregar(): void { 
    if (this.validarDatos() && this.actionButton == 'Save') { 
      this.intentoEnvio = true; 
      this.miServicioReportes.Crear(this.resultado).subscribe({ 
        next:()=>{
          Swal.fire( 
            'Creado', 
            'la mesa ha sido agregada correctamente', 
            'success'
          )
          this.displayModal = false;
          this.ngOnInit(); 
        },
        error:()=>{
          Swal.fire({
            title:'¡Error!'
          });
          this.displayModal = false;
        }
      }); 
    } 
    // UPDATE
    else{
      if (this.validarDatos() && this.actionButton == 'Update') { 
        this.intentoEnvio = true; 
        this.miServicioReportes.Update(this.datam._id.$oid, this.resultado).subscribe({ 
          next:()=>{
            Swal.fire( 
              'Actualizado', 
              'la mesa ha sido actualizada correctamente', 
              'success'
            )
            this.displayModal = false;
            this.ngOnInit(); 
          },
          error:()=>{
            Swal.fire({
              title:'¡Error!'
            });
            this.displayModal = false;
          }
        }); 
      }
    }
  }
  
  editar(row : any):void{
    this.actionButton = 'Update';
    this.displayModal = true;
    this.datam = row;
    console.log(this.datam._id.$oid);
  }

  eliminar(rowe : any): void{
    console.log(rowe._id.$oid);
    Swal.fire({ 
      title: 'Eliminar Mesa', 
      text: "Está seguro que quiere eliminar la mesa?", 
      icon: 'warning', 
      showCancelButton: true, 
      confirmButtonColor: '#3085d6', 
      cancelButtonColor: '#d33', 
      confirmButtonText: 'Si, eliminar'
      }).then((result) => { 
        if (result.isConfirmed) { 
          this.miServicioReportes.Delete(rowe._id.$oid).subscribe(data => { 
          Swal.fire( 
            'Eliminado!', 
            'la mesa ha sido eliminada correctamente', 
            'success'
          ) 
          this.ngOnInit(); 
        }); 
      } 
    }) 
  } 

  hideDialog() {
    this.displayModal = false;
  }

  saveMesa() {
    this.displayModal = false;
  }

  validarDatos():boolean{ 
    this.intentoEnvio=true; 
    if(this.resultado.mesa=="" || this.resultado.numeroCandidato=="" || this.resultado.partido=="" || this.resultado.votos==""){ 
      return false; 
    }else{ 
    return true; 
    } 
  } 
}
