import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from 'src/app/service/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { EspecialidadService } from 'src/app/service/especialidad.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss']
})
export class RegistroComponent implements OnInit{

  constructor(private auth: AuthServiceService, private route: Router, private especialidadService: EspecialidadService) {}


  listaEspecialidades: any[] = []; 
  nuevaEspecialidad: string = '';

  tipoUsuario: string = 'especialista'; // Por defecto, seleccionado como Especialista
  especialidades: string[] = ['Especialidad1', 'Especialidad2', 'Especialidad3']; // Puedes llenar esto con tus especialidades
  nombre: string = '';
  apellido: string = '';
  edad: number | undefined;
  dni: string = '';
  correo: string = '';
  contrasena: string = '';
  repetirContrasena: string = '';
  obraSocial: string = '';
  especialidad: string = '';
  fotoPerfil: string = '';
  activo: boolean = true;
  
  ngOnInit() {
    this.cargarEspecialidades();
    
  }

  Registrar() {
    if (this.contrasena === this.repetirContrasena) {
      // Declare credentials with a broader type
      const credentials: any = {
        nombre: this.nombre,
        apellido: this.apellido,
        edad: this.edad,
        dni: this.dni,
        correo: this.correo,
        contrasena: this.contrasena,
        fotoPerfil: this.fotoPerfil,
        tipo: this.tipoUsuario,
        activo: this.activo
      };
  
      if (this.tipoUsuario === 'paciente') {
        credentials['obraSocial'] = this.obraSocial;
      } else if (this.tipoUsuario === 'especialista') {
        credentials.activo = false;
        credentials['especialidad'] = this.nuevaEspecialidad;
      }
        this.auth.register({ credentials })
        .then(response => {
          Swal.fire({
            icon: 'success',
            title: 'Registro Exitoso',
            text: 'Valide su casilla de correo antes de ingresar al sistema',
          });
        })
        .catch(error => {
          Swal.fire({
            icon: 'error',
            title: 'Ha ocurrido un error',
            text: error,
          });
        });
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Las contraseñas deben coincidir',
        text: 'Vuelve a intentarlo!',
      });
    }
  }
  async cargarEspecialidades() {
    this.especialidadService.traerEspecialidad().subscribe((especialidades) => {
      this.listaEspecialidades = especialidades;
    });
  }

  async agregarEspecialidad() {
    // Verificamos que la nueva especialidad no esté vacía
    if (this.nuevaEspecialidad.trim() !== '') {
      // Guardamos la nueva especialidad utilizando el servicio
      this.especialidadService.GuardarEspecialidad({ nombre: this.nuevaEspecialidad });

      // Actualizamos la lista de especialidades
      this.cargarEspecialidades();

      // Limpiamos el campo de nueva especialidad
      this.nuevaEspecialidad = '';
    }
  }
  
}
