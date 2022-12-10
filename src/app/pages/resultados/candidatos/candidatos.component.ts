import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Candidato } from '../../../models/candidato.model';
import { CandidatosService } from '../../../services/candidatos.service';
import Swal from 'sweetalert2';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-candidatos',
  templateUrl: './candidatos.component.html',
  styleUrls: ['./candidatos.component.scss']
})
export class CandidatosComponent implements OnInit {

  candidatos: Candidato[] = [];
  candidato: Candidato = new Candidato;
  datam: any;
  datad: any;
  candidatoForm! : FormGroup;

  displayModal: boolean = false;
  actionButton : string = "";
  intentoEnvio: boolean = false;
  
  constructor(private formBuilder: FormBuilder, public miServicioCandidatos: CandidatosService, public router: Router) { }

  ngOnInit(): void { 
    this.listar(); 
    this.candidatoForm = this.formBuilder.group({
      numero : ['', Validators.required],
      cedula : ['', Validators.required],
      nombre : ['', Validators.required],
      apellido : ['', Validators.required],
      partido : ['', Validators.required]
    })
  } 

  showModalDialog() {
    this.actionButton = 'Save';
    this.displayModal = true;
  }

  listar():void{ 
    this.miServicioCandidatos.listar().subscribe(data =>{
      this.candidatos=data
      //console.log(data);
    })
  } 

  agregar(): void { 
    if (this.validarDatos() && this.actionButton == 'Save') { 
      this.intentoEnvio = true; 
      this.miServicioCandidatos.Crear(this.candidato).subscribe({ 
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
        this.miServicioCandidatos.Update(this.datam._id.$oid, this.candidato).subscribe({ 
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
          this.miServicioCandidatos.Delete(rowe._id.$oid).subscribe(data => { 
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
    if(this.candidato.numero=="" || this.candidato.cedula=="" || this.candidato.nombre=="" || this.candidato.apellido==""
        || this.candidato.partido==""){ 
      return false; 
    }else{ 
    return true; 
    } 
  } 
}
