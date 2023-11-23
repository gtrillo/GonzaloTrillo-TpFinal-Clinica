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
  
      const rolUsuario = await this.user.devolverRolUsuario();
  
      if (rolUsuario === 'administrador') {
        this.router.navigate(['/administracion']);
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
