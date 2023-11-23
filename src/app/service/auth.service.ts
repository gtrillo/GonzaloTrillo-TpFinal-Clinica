import { Injectable } from '@angular/core';

import { collectionData, getDoc } from '@angular/fire/firestore';

import { Auth, User } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { RolUser } from '../interfaces/rol-user';
import { Firestore, collection, query, where, getDocs, addDoc, DocumentReference } from '@angular/fire/firestore';
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword } from '@angular/fire/auth';
import { doc, setDoc } from 'firebase/firestore';
import { getAuth, sendEmailVerification } from "firebase/auth";

import { UserService } from './user/user-service.service';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {


  constructor(private auth: Auth, private router: Router, private firestore: Firestore, private user: UserService) { }
  usuarioLogueado: boolean = false;

  login(credentials: { email: string, password: string }) {
    console.log("email" + credentials.email);

    console.log("contraseña" + credentials.password);
    return signInWithEmailAndPassword(this.auth, credentials.email, credentials.password)
      .then((userCredential) => {
        const user = userCredential.user;

        if (user.email) {
          console.log("entre 2");

          this.verificarSesion(user.email);
        }

        return user;
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error(`Error: ${errorCode} - ${errorMessage}`);
        throw error;
      });
  }



    register({ credentials }: any) {
    console.log("credenciales"+credentials.correo);
    return createUserWithEmailAndPassword(this.auth, credentials.correo, credentials.contrasena)
      .then(() => {
        switch (credentials.tipo) {
          case 'paciente':
            this.auth = getAuth();
            if (this.auth.currentUser !== null) {
              return sendEmailVerification(this.auth.currentUser)
                .then(() => {
                  return "Valide su casilla de correo antes de ingresar al sistema";
                })
                .catch((error) => {
                  const errorCode = error.code;
                  const errorMessage = error.message;
                  console.error(`Error al enviar la verificación por correo electrónico: ${errorCode} - ${errorMessage}`);
                  throw error;
                })
                .finally(() => {
                  // Independientemente de si se envió la verificación o no, guardar la información del usuario
                  console.log("nombre" + credentials.nombre)
                  this.user.guardarUsuario(credentials);
                });
            } else {
              console.error('Instancia de autenticación es nula');
              throw new Error('Instancia de autenticación es nula');
            }
          case 'especialista':
            this.auth = getAuth();
            if (this.auth.currentUser !== null) {
              return sendEmailVerification(this.auth.currentUser)
                .then(() => {
                  return "Valide su casilla de correo antes de ingresar al sistema";
                })
                .catch((error) => {
                  const errorCode = error.code;
                  const errorMessage = error.message;
                  console.error(`Error al enviar la verificación por correo electrónico: ${errorCode} - ${errorMessage}`);
                  throw error;
                })
                .finally(() => {
                  console.log("nombre" + credentials.nombre)
                  this.user.guardarUsuario(credentials);
                });
            } else {
              console.error('Instancia de autenticación es nula');
              throw new Error('Instancia de autenticación es nula');
            }
          default:
            this.auth = getAuth();
            if (this.auth.currentUser !== null) {
              return sendEmailVerification(this.auth.currentUser)
                .then(() => {
                  return "Valide su casilla de correo antes de ingresar al sistema";
                })
                .catch((error) => {
                  const errorCode = error.code;
                  const errorMessage = error.message;
                  console.error(`Error al enviar la verificación por correo electrónico: ${errorCode} - ${errorMessage}`);
                  throw error;
                })
                .finally(() => {
                  // Independientemente de si se envió la verificación o no, guardar la información del usuario
                  console.log("nombre" + credentials.nombre)
                  credentials.activo = false
                  this.user.guardarUsuario(credentials);
                });
            } else {
              console.error('Instancia de autenticación es nula');
              throw new Error('Instancia de autenticación es nula');
            }
        }
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error(`Error al crear el usuario: ${errorCode} - ${errorMessage}`);
        throw error;
      });
  }



  verificarSesion(user: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      const auth = getAuth();
      onAuthStateChanged(auth, (authUser) => {
        if (authUser) {
          // El usuario está autenticado
  
          if (authUser.emailVerified) {
            // El correo electrónico del usuario ha sido verificado
            console.log('Usuario autenticado y correo electrónico verificado.');
            resolve(true); // Resuelve la promesa con true
          } else {
            // El correo electrónico del usuario aún no ha sido verificado
            console.warn('El correo electrónico del usuario aún no ha sido verificado.');
            resolve(false); // Resuelve la promesa con false
          }
        } else {
          // No hay usuario autenticado
          console.log('No hay usuario autenticado.');
          resolve(false); // Resuelve la promesa con false
        }
      });
    });
  }

  logout() {
    return this.auth.signOut()
      .then(() => {
        this.router.navigate(['/login']);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error(`Error: ${errorCode} - ${errorMessage}`);
        throw error;
      });
  }

  async devolverUsuario() {
    return new Promise((resolve, reject) => {
      onAuthStateChanged(this.auth, (user) => {
        if (user) {
          resolve(user.email);
          console.log(user.email)
        } else {
          reject(new Error("El usuario no esta logueado"));
        }
      });
    });
  }

  async usuarioActivo(correoUsuario: string): Promise<boolean | null> {
    try {
      const usersCollection = collection(this.firestore, 'users');
      const q = query(usersCollection, where('correo', '==', correoUsuario));
      const querySnapshot = await getDocs(q);
  
      if (!querySnapshot.empty) {
        const userDoc = querySnapshot.docs[0];
        const userInfo = userDoc.data() as { activo: boolean };
  
        const estaActivo = userInfo.activo;
  
        return estaActivo;
      } else {
        console.log('Usuario no encontrado en la base de datos.');
        return null;
      }
    } catch (error) {
      console.error('Error al obtener el estado del usuario:', error);
      throw error;
    }
  }

  async devolverRolUsuario() {
    return new Promise(async (resolve, reject) => {
      onAuthStateChanged(this.auth, async (user) => {
        if (user) {
          try {
            const correo = await this.devolverUsuario();
            console.log(correo)
            if (typeof correo === 'string') {
              const rolUsuario = await this.user.devolverRolUsuarioPorCorreo(correo);
              console.log("rol"+rolUsuario);
              resolve(rolUsuario);
            } else {
              reject(new Error("El correo no es de tipo string"));
            }
          } catch (error) {
            reject(error);
          }
        } else {
          reject(new Error("El usuario no está logueado"));
        }
      });
    });
  }
  

}
