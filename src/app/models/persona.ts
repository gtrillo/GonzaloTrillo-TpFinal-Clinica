export enum Role {
  Especialista = 'especialista',
  Paciente = 'paciente',
  Administrador = 'administrador',
}

export class Persona {
  id?: string;
  nombre?: string;
  correo?: string;
  contraseña?: string;
  edad?: number;
  public role: Role;

  constructor(id?: string, nombre?: string, correo?: string, contraseña?: string, edad?: number, role?: Role) {
    this.id = id;
    this.nombre = nombre;
    this.correo = correo;
    this.contraseña = contraseña;
    this.edad = edad;
    this.role = role || Role.Paciente;
  }

  mostrarPersona(): void {
    console.log("ID:", this.id);
    console.log("Nombre:", this.nombre);
    console.log("Correo:", this.correo);
    console.log("Contraseña:", this.contraseña);
    console.log("Edad:", this.edad);
    console.log("Rol:", this.role);
  }
}
