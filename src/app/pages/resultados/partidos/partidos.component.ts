import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Partido } from '../../../models/partido.model';
import { PartidosService } from '../../../services/partidos.service';
import Swal from 'sweetalert2';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-partidos',
  templateUrl: './partidos.component.html',
  styleUrls: ['./partidos.component.scss']
})
export class PartidosComponent implements OnInit {

  partidos: Partido[] = [];
  partido: Partido = new Partido;
  datam: any;
  datad: any;
  partidoForm! : FormGroup;

  displayModal: boolean = false;
  actionButton : string = "";
  actionButton2 : string = "";
  intentoEnvio: boolean = false;
    
  constructor(private formBuilder: FormBuilder, public miServicioPartidos: PartidosService, public router: Router) { }

  ngOnInit(): void { 
    this.listar(); 
    this.partidoForm = this.formBuilder.group({
      nombrePartido : ['', Validators.required],
      lema : ['', Validators.required]
    })
  } 

  showModalDialog() {
    this.actionButton2 = 'Agregar Partido';
    this.actionButton = 'Save';
    this.displayModal = true;
  }

  listar():void{ 
    this.miServicioPartidos.listar().subscribe(data =>{
      this.partidos=data
      //console.log(data);
    })
  } 

  agregar(): void { 
    if (this.validarDatos() && this.actionButton == 'Save') { 
      this.intentoEnvio = true; 
      this.miServicioPartidos.Crear(this.partido).subscribe({ 
        next:()=>{
          Swal.fire( 
            'Creado', 
            'El partido ha sido agregado correctamente', 
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
        this.miServicioPartidos.Update(this.datam._id.$oid, this.partido).subscribe({ 
          next:()=>{
            Swal.fire( 
              'Actualizado', 
              'El partido ha sido actualizado correctamente', 
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
    this.actionButton2 = 'Editar Partido';
    this.actionButton = 'Update';
    this.displayModal = true;
    this.datam = row;
    console.log(this.datam._id.$oid);
  }

  eliminar(rowe : any): void{
    console.log(rowe._id.$oid);
    Swal.fire({ 
      title: 'Eliminar Partido', 
      text: "Está seguro que quiere eliminar el partido?", 
      icon: 'warning', 
      showCancelButton: true, 
      confirmButtonColor: '#3085d6', 
      cancelButtonColor: '#d33', 
      confirmButtonText: 'Si, eliminar'
      }).then((result) => { 
        if (result.isConfirmed) { 
          this.miServicioPartidos.Delete(rowe._id.$oid).subscribe(data => { 
          Swal.fire( 
            'Eliminado!', 
            'El partido ha sido eliminado correctamente', 
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
    if(this.partido.nombrePartido=="" || this.partido.lema==""){ 
      return false; 
    }else{ 
    return true; 
    } 
  } 

}
