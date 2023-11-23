import { Component, OnInit } from '@angular/core';
import { Paciente } from 'src/app/models/especialista';
import { Especialista } from 'src/app/models/paciente';
import { Persona } from 'src/app/models/persona';
import { AuthServiceService } from 'src/app/service/auth.service';
import { EspecialidadService } from 'src/app/service/especialidad.service';
import { UserService } from 'src/app/service/user/user-service.service';
import { ValidacionServiceService } from 'src/app/service/validacion-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-adminstacion-usuarios',
  templateUrl: './adminstacion-usuarios.component.html',
  styleUrls: ['./adminstacion-usuarios.component.scss']
})
export class AdminstacionUsuariosComponent implements OnInit {
  listaEspecialistas: Especialista[] = [];
  lista: Persona[] = [];
  nombre: string = '';
  apellido: string = '';
  edad: string = "";
  dni: string = '';
  correo: string = '';
  contrasena: string = '';
  repetirContrasena: string = '';
  fotoPerfil: string = '';
  activo: boolean = true;
  paciente?: Paciente;
  especialista?: Especialista;
  userList: Persona[] = [];
  fechaInactivacion? = null;

  ngOnInit() {
    this.cargarUsuarios();


  }

  constructor(private userService: UserService, private authService: AuthServiceService, private validador : ValidacionServiceService) {}

  eliminarUsuario(correoUsuario?: string) {
    if (correoUsuario) {
      this.userService.eliminarUsuario(correoUsuario);
      this.listaEspecialistas = this.listaEspecialistas.filter(usuario => usuario.correo !== correoUsuario);
    }
  }

  Registrar() {
    const credentials: any = {
      nombre: this.nombre,
      apellido: this.apellido,
      edad: this.edad,
      dni: this.dni,
      correo: this.correo,
      contrasena: this.contrasena,
      fotoPerfil: this.fotoPerfil,
      activo: this.activo,
      fechaInactivacion : this.fechaInactivacion
    };

    this.authService.register({ credentials })
      .then(response => {
        Swal.fire({
          icon: 'success',
          title: 'Registro Exitoso',
          text: 'Valide su casilla de correo antes de ingresar al sistema',
        });
        this.cargarUsuarios();
      })
      .catch(error => {
        Swal.fire({
          icon: 'error',
          title: 'Ha ocurrido un error',
          text: error,
        });
      });
  }

  cargarUsuarios() {
    this.userService.taerUsuarios().subscribe((respuesta) => {
      this.listaEspecialistas = [];
      this.userList = [];
      respuesta.forEach((persona: any) => {
        if (persona.obraSocial === "") {
          const paciente = new Paciente(
            persona.id,
            persona.nombre,
            persona.correo,
            persona.apellido,
            persona.contraseña,
            persona.edad,
            persona.roles,
            persona.obraSocial,
            persona.fotoPerfil1,
            persona.fotoPerfil2,
            persona.activo,
            persona.fechaInactivacion
          );
          this.userList.push(paciente);
        } else {
          const especialista = new Especialista(
            persona.id,
            persona.nombre,
            persona.correo,
            persona.apellido,
            persona.contraseña,
            persona.edad,
            persona.roles,
            persona.especialidad,
            persona.fotoPerfil,
            persona.activo,
            persona.fechaInactivacion
          );
          if (especialista.fechaInactivacion == null) {
            this.listaEspecialistas.push(especialista);
          }
          this.userList.push(especialista);
        }
      });
    });
  }

  activarUsuario(correo?: string){
    if (correo) {
      this.userService.ActivarUsuario(correo);
    }
  }


  desactivarUsuario(correo?: string){
    if (correo) {
      this.userService.desactivarUsuario(correo);
    }
  }

  validarCampos(){

    console.log("awdad");

    if (!this.validador.validarTexto(this.nombre)) {
      console.log('Nombre no válido');
      return;
    }

    if (!this.validador.validarTexto(this.apellido)) {
      console.log('Apellido no válido');
      return;
    }

    if (!this.validador.validarEdad(this.edad)) {
      console.log('Edad no válida');
      return;
    }

    if (!this.validador.validarDNI(this.dni)) {
      console.log('DNI no válido');
      return;
    }

    if (!this.validador.validarCorreo(this.correo)) {
      console.log('Correo no válido');
      return;
    }

    if (!this.validador.validarContraseña(this.contrasena)) {
      console.log('Contraseña no válida');
      return;
    }

    this.Registrar();
    
    console.log('Todos los campos son válidos');
  }
  


}
