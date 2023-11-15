import { RolUser } from "../interfaces/rol-user";

export class Persona {

    id?: string;
    nombre?: string;
    correo?: string; 
    contraseña?: string;
    edad?: number;
    roles?: RolUser;
  
    constructor(id?: string, nombre?: string, correo?: string, contraseña?: string, edad?: number, roles?: RolUser) {
      this.id = id;
      this.nombre = nombre;
      this.correo = correo;
      this.contraseña = contraseña;
      this.edad = edad;
      this.roles = roles;
    }
  
    mostrarPersona(): void {
      console.log("ID:", this.id);
      console.log("Nombre:", this.nombre);
      console.log("Correo:", this.correo);
      console.log("Contraseña:", this.contraseña);
      console.log("Edad:", this.edad);
      console.log("Roles:", this.roles);
    }
  

}
