import { RolUser } from "../interfaces/rol-user";
import { Persona } from "./persona";

export class Especialista extends Persona {
    especialidad?: string;
    fotoPerfil?: string;
  
    constructor(
      id?: string,
      nombre?: string,
      correo?: string,
      contraseña?: string,
      edad?: number,
      roles?: RolUser,
      especialidad?: string,
      fotoPerfil?: string
    ) {
      super(id, nombre, correo, contraseña, edad, roles);
      this.especialidad = especialidad;
      this.fotoPerfil = fotoPerfil;
    }
  
    mostrarEspecialista(): void {
      super.mostrarPersona();
      console.log("Especialidad:", this.especialidad);
      console.log("Foto de Perfil:", this.fotoPerfil);
    }
  }