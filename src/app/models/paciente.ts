import { RolUser } from "../interfaces/rol-user";
import { Persona, Role } from "./persona";

export class Especialista extends Persona {
  especialidad?: string;
  fotoPerfil?: string;

  constructor(
    id?: string,
    nombre?: string,
    correo?: string,
    apellido? : string,
    contraseña?: string,
    edad?: number,
    roles?: Role,    
    especialidad?: string,
    fotoPerfil?: string,
    actiavo? : boolean,
    fechaInactivacion? : Date,
  ) {
    super(id, nombre,apellido, correo, contraseña,edad, roles || Role.Especialista, actiavo, fechaInactivacion); // Inicializar role en Persona
    this.especialidad = especialidad;
    this.activo = actiavo;
    this.fotoPerfil = fotoPerfil;
    this.fechaInactivacion = fechaInactivacion
  }

  mostrarEspecialista(): void {
    super.mostrarPersona();
    console.log("Especialidad:", this.especialidad);
    console.log("Foto de Perfil:", this.fotoPerfil);
  }
}