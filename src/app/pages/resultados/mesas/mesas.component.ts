import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Mesa } from '../../../models/mesa.model';
import { MesaService } from '../../../services/mesa.service';
import Swal from 'sweetalert2';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-mesas',
  templateUrl: './mesas.component.html',
  styleUrls: ['./mesas.component.scss']
})

export class MesasComponent implements OnInit {

  mesas: Mesa[] = [];
  mesa: Mesa = new Mesa;
  datam: any;
  datad: any;
  tableForm! : FormGroup;

  displayModal: boolean = false;
  actionButton : string = "";
  actionButton2 : string = "";
  intentoEnvio: boolean = false;
    
  constructor(private formBuilder: FormBuilder, public miServicioMesas: MesaService, public router: Router) { }

  ngOnInit(): void { 
    this.listar(); 
    this.tableForm = this.formBuilder.group({
      mesa : ['', Validators.required],
      cedulas_inscritas : ['', Validators.required]
    })
  } 

  showModalDialog() {
    this.actionButton2 = 'Agregar Mesa';
    this.actionButton = 'Save';
    this.displayModal = true;
  }

  listar():void{ 
    this.miServicioMesas.listar().subscribe(data =>{
      this.mesas=data
      //console.log(data);
    })
  } 

  agregar(): void { 
    if (this.validarDatos() && this.actionButton == 'Save') { 
      this.intentoEnvio = true; 
      this.miServicioMesas.Crear(this.mesa).subscribe({ 
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
        this.miServicioMesas.Update(this.datam._id.$oid, this.mesa).subscribe({ 
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
    this.actionButton2 = 'Editar Mesa';
    this.actionButton = 'Update';
    this.displayModal = true;
    this.datam = row;
    //console.log(this.datam._id.$oid);
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
          this.miServicioMesas.Delete(rowe._id.$oid).subscribe(data => { 
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
    if(this.mesa.mesa=="" || this.mesa.cedulas_inscritas==""){ 
      return false; 
    }else{ 
    return true; 
    } 
  } 
}
