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



  ingresar() {
    const credentials = { email: this.usuario, password: this.contrasena };
  
    this.user.login(credentials)
      .then(response => {
        console.log("entre");
        console.log('Inicio de sesión exitoso:', response);
        this.router.navigate(['/home']);
      })
      .catch(error => {
        Swal.fire({
          icon: 'error',
          title: 'Usuario o contraseña incorrecta...',
          text: 'Vuelva a intentarlo!',
        });
      });
  }
  
}
