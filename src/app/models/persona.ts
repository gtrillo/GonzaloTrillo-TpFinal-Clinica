export enum Role {
  Especialista = 'especialista',
  Paciente = 'paciente',
  Administrador = 'administrador',
}

export class Persona {
  id?: string;
  nombre?: string;
  apellido?: string;
  correo?: string;
  contraseña?: string;
  edad?: number;
  public role: Role;
  activo? : boolean;
  fechaInactivacion? :Date;
  
  constructor(id?: string, nombre?: string, apellido? :string ,correo?: string, contraseña?: string, edad?: number, role?: Role, activo?: boolean, fechaInactivacion? : Date) {
    
    this.id = id;
    this.nombre = nombre;
    this.apellido = apellido;
    this.correo = correo;
    this.contraseña = contraseña;
    this.edad = edad;
    this.role = role || Role.Paciente;
    this.activo = activo;
    this.fechaInactivacion = fechaInactivacion;
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
