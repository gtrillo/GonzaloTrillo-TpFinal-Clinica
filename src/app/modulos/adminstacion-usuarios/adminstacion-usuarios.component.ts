import { Component, OnInit } from '@angular/core';
import { Paciente } from 'src/app/models/especialista';
import { Especialista } from 'src/app/models/paciente';
import { Persona } from 'src/app/models/persona';
import { AuthServiceService } from 'src/app/service/auth.service';
import { UserService } from 'src/app/service/user/user-service.service';
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
  edad: number = 0;
  dni: string = '';
  correo: string = '';
  contrasena: string = '';
  repetirContrasena: string = '';
  fotoPerfil: string = '';
  activo: boolean = true;
  paciente?: Paciente;
  especialista?: Especialista;
  userList: Persona[] = [];

  ngOnInit() {
    this.cargarUsuarios();
  }

  constructor(private userService: UserService, private authService: AuthServiceService) {}

  eliminarUsuario(correoUsuario?: string) {
    if (correoUsuario) {
      this.userService.desactivarUsuario(correoUsuario);
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
      activo: this.activo
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
            persona.activo
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
            persona.activo
          );
          if (especialista.activo) {
            this.listaEspecialistas.push(especialista);
          }
          this.userList.push(especialista);
        }
      });
    });
  }
}
