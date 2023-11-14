import { Component } from '@angular/core';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss']
})
export class RegistroComponent {
  tipoUsuario: string = 'especialista'; // Por defecto, seleccionado como Especialista
  especialidades: string[] = ['Especialidad1', 'Especialidad2', 'Especialidad3']; // Puedes llenar esto con tus especialidades

  // Puedes agregar más propiedades según sea necesario (usuario, contrasena, etc.)

  Registrar() {
    // Lógica para el registro, puedes acceder a las propiedades como this.usuario, this.contrasena, etc.
    console.log('Registrando...');
  }
}
