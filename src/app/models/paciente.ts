import { RolUser } from "../interfaces/rol-user";
import { Persona } from "./persona";

export class Paciente extends Persona {
  obraSocial?: string;
  fotoPerfil1?: string;
  fotoPerfil2?: string;

  constructor(
    id?: string,
    nombre?: string,
    correo?: string,
    contraseña?: string,
    edad?: number,
    roles?: RolUser,
    obraSocial?: string,
    fotoPerfil1?: string,
    fotoPerfil2?: string
  ) {
    super(id, nombre, correo, contraseña, edad, roles);
    this.obraSocial = obraSocial;
    this.fotoPerfil1 = fotoPerfil1;
    this.fotoPerfil2 = fotoPerfil2;
  }

  mostrarPaciente(): void {
    super.mostrarPersona();
    console.log("Obra Social:", this.obraSocial);
    console.log("Foto de Perfil 1:", this.fotoPerfil1);
    console.log("Foto de Perfil 2:", this.fotoPerfil2);
  }
}

