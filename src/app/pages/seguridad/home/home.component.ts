import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Usuario } from '../../../models/usuario.model';
import { SeguridadService } from '../../../services/seguridad.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  correo:string="";
  contrasena:string="";
  displayModal: boolean = false;
  displayModal2: boolean = false;
  
  constructor(private miServicioSeguridad : SeguridadService, public router: Router) { 

  }

  ngOnInit(): void { 
   
  } 

  //Login
  showModalDialog() {
    this.displayModal = true;
  }

  login():void{
    this.displayModal = false;
    let elUsuario:Usuario={
      correo:this.correo,
      contrasena:this.contrasena,
    }
    this.miServicioSeguridad.login(elUsuario).subscribe({
      next: () => this.displayModal = false,
      error: () => {
        Swal.fire({
          title: 'Email o contraseña incorrectos.',
          icon: 'error',
          confirmButtonText: 'Retry',
        });
        this.displayModal = true;
      },
      complete: () => this.miServicioSeguridad.guardarDatosSesion(elUsuario)
    });
  }

  //Register
  showModalDialog2() {
    this.displayModal2 = true;
  }

  register():void{
    this.displayModal2 = false;
  }

  toLogin(){
    this.displayModal2 = false;
  }
}