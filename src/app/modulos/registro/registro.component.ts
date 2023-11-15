import { Component } from '@angular/core';
import { AuthServiceService } from 'src/app/service/auth.service';
import { FormsModule } from '@angular/forms';  // Import the FormsModule

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss']
})
export class RegistroComponent {

  constructor(private auth: AuthServiceService){

  }

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
  // Puedes agregar más propiedades según sea necesario (usuario, contrasena, etc.)

  Registrar() {
    if (this.contrasena === this.repetirContrasena) {
      const credentials = { email: this.usuario, password: this.contrasena };
      this.user.register(credentials)
        .then(response => {
          console.log('Registro Exitoso:', response);
          this.user.login(credentials);
          this.router.navigate(['/home']);
        })
        .catch(error => {
          Swal.fire({
            icon: 'error',
            title: 'a ocurrido un error',
            text: error,
          })
        });
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Las contraseñas deben coincidir',
        text: 'Vuelve a intentarlo!',
      })
    }
  }
}
