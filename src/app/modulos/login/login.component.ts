import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthServiceService } from 'src/app/service/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  usuario: string = '';
  contrasena: string = '';

  constructor(private user: AuthServiceService, private router: Router) { }

  

  async ingresar() {
    const credentials = { email: this.usuario, password: this.contrasena };
    try {
      await this.user.login(credentials);
      console.log('Inicio de sesión exitoso');
  
      const estaActivo = await this.user.usuarioActivo(credentials.email);
  
      if (estaActivo !== null) {
        if (estaActivo) {
          const rolUsuario = await this.user.devolverRolUsuario();
  
          if (rolUsuario === 'administrador') {
            this.router.navigate(['/administracion']);
          } else {
            const sesionVerificada = await this.user.verificarSesion(this.usuario);
  
            if (sesionVerificada) {
              this.router.navigate(['']);
              console.log('Usuario activo y no es administrador.');
            }
          }
        } else {
          console.log('El usuario no está activo.');
        }
      } else {
        console.log('Usuario no encontrado en la base de datos.');
      }
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      Swal.fire({
        icon: 'error',
        title: 'Usuario o contraseña incorrecta...',
        text: 'Vuelva a intentarlo!',
      });
    }
  }
  
  
  autocompletarFormulario() {
    this.usuario = 'gonzalo.trillo546455@gmail.com';
    this.contrasena = '123123';
  }
}
