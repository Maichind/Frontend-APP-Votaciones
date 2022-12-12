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
  actionButton2 : string = "";
  intentoEnvio: boolean = false;
  
  constructor(private formBuilder: FormBuilder, public miServicioReportes: ReportesService, public router: Router) { }

  ngOnInit(): void { 
    this.listar(); 
    this.resultadoForm = this.formBuilder.group({
      mesa : ['', Validators.required],
      nombre : ['', Validators.required],
      votos : ['', Validators.required],
      nombre2 : ['', Validators.required],
      votos2 : ['', Validators.required],
    })
  } 

  showModalDialog() {
    this.actionButton2 = 'Agregar Reporte';
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
            'el Reporte ha sido agregado correctamente', 
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
              'el Reporte ha sido actualizado correctamente', 
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
    this.actionButton2 = 'Editar Reporte';
    this.actionButton = 'Update';
    this.displayModal = true;
    this.datam = row;
    console.log(this.datam._id.$oid);
  }

  eliminar(rowe : any): void{
    console.log(rowe._id.$oid);
    Swal.fire({ 
      title: 'Eliminar Reporte', 
      text: "Está seguro que quiere eliminar el Reporte?", 
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
            'el Reporte ha sido eliminado correctamente', 
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
    if(this.resultado.mesa=="" || this.resultado.nombre=="" || this.resultado.votos=="" || this.resultado.nombre2=="" || this.resultado.votos2==""){ 
      return false; 
    }else{ 
    return true; 
    } 
  } 
}
