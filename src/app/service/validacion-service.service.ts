import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ValidacionServiceService {
  constructor() { }

  validarTexto(texto: string): boolean {
    // Validar que el texto no esté vacío
    return texto.trim() !== '';
  }

  validarEdad(edad: string): boolean {
    // Validar que la edad sea un número positivo
    const edadNumero = parseInt(edad, 10);
    return !isNaN(edadNumero) && edadNumero > 0;
  }

  validarDNI(dni: string): boolean {
    // Validar que el DNI sea un número positivo y tenga una longitud específica
    const dniNumero = parseInt(dni, 10);
    return !isNaN(dniNumero) && dni.length === 8;
  }

  validarCorreo(correo: string): boolean {
    // Validar que el correo tenga un formato básico
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(correo);
  }

  validarContraseña(contraseña: string): boolean {
    // Validar que la contraseña tenga una longitud mínima
    return contraseña.length >= 6;
  }
}
