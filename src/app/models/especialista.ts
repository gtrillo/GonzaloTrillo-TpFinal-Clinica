import { Action } from "rxjs/internal/scheduler/Action";
import { RolUser } from "../interfaces/rol-user";
import { Persona, Role } from "./persona";

export class Paciente extends Persona {
  obraSocial?: string;
  fotoPerfil1?: string;
  fotoPerfil2?: string;

  constructor(
    id?: string,
    nombre?: string,
    correo?: string,
    apellido?: string,
    contraseña?: string,
    edad?: number,
    roles?: Role,
    obraSocial?: string,
    fotoPerfil1?: string,
    fotoPerfil2?: string,
    activo?: boolean
  ) {
    super(id, nombre,apellido ,correo, contraseña, edad, roles || Role.Paciente, activo);
    this.obraSocial = obraSocial;
    this.fotoPerfil1 = fotoPerfil1;
    this.fotoPerfil2 = fotoPerfil2;
    this.activo = activo;
  }

  mostrarPaciente(): void {
    super.mostrarPersona();
    console.log("Obra Social:", this.obraSocial);
    console.log("Foto de Perfil 1:", this.fotoPerfil1);
    console.log("Foto de Perfil 2:", this.fotoPerfil2);
  }
}