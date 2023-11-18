import { Injectable } from '@angular/core';

import { collectionData, getDoc } from '@angular/fire/firestore';

import { Auth, User } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { RolUser } from '../interfaces/rol-user';
import { Firestore, collection, query, where, getDocs, addDoc, DocumentReference } from '@angular/fire/firestore';
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword } from '@angular/fire/auth';
import {doc, setDoc } from 'firebase/firestore';
import { getAuth, sendEmailVerification } from "firebase/auth";

import { UserService } from './user/user-service.service';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {


  constructor(private auth: Auth, private router: Router, private firestore: Firestore, private user : UserService) { }
  usuarioLogueado: boolean = false;

  login(credentials: { email: string, password: string }) {
    console.log("email" + credentials.email);
    
    console.log("contraseña" + credentials.password);
    return signInWithEmailAndPassword(this.auth, credentials.email, credentials.password)
      .then((userCredential) => {
        const user = userCredential.user;
        
        if(user.email){
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
                  this.user.guardarUsuario(credentials);
                });
            } else {
              console.error('Instancia de autenticación es nula');
              throw new Error('Instancia de autenticación es nula');
            }
          case 'especialista':
            // Código para el caso de 'especialista' si es necesario
            // Asegúrate de devolver un valor aquí si es necesario
            return "Mensaje para especialistas"; // Puedes ajustar el mensaje según tus necesidades
          default:
            // Asegúrate de devolver un valor para cualquier otro caso
            return "Mensaje para otros tipos de usuario"; // Puedes ajustar el mensaje según tus necesidades
        }
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error(`Error al crear el usuario: ${errorCode} - ${errorMessage}`);
        throw error; // Propagar el error para que pueda ser manejado externamente
      });
  }
  
  


  verificarSesion(user: string){
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // El usuario está autenticado
    
        if (user.emailVerified) {
          // El correo electrónico del usuario ha sido verificado
          console.log('Usuario autenticado y correo electrónico verificado.');
          // Puedes redirigir al usuario al área autenticada o realizar otras acciones necesarias.
        } else {
          // El correo electrónico del usuario aún no ha sido verificado
          console.warn('El correo electrónico del usuario aún no ha sido verificado.');
          // Puedes mostrar un mensaje al usuario indicándole que verifique su correo electrónico.
        }
      } else {
        // No hay usuario autenticado
        console.log('No hay usuario autenticado.');
        // Puedes redirigir al usuario al área de inicio de sesión u realizar otras acciones necesarias.
      }
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

  private asignarRol(user: any, roles: RolUser) {
    const userDocRef = doc(this.firestore, 'users', user.uid);
    setDoc(userDocRef, { roles }, { merge: true });
  }
  
  async getUserInfo(uid: string) {
    const userDocRef = doc(this.firestore, 'users', uid);
    const userDoc = await getDoc(userDocRef);
    return userDoc.exists() ? userDoc.data() : null;
  }

  async obtenerInfoUsuarioConRoles(uid: string) {
    try {
      const userInfo = await this.getUserInfo(uid);
      if (userInfo) {
        console.log('Información del usuario:', userInfo);
        console.log('Roles del usuario:', userInfo['roles']);
        return userInfo;
      } else {
        console.log('Usuario no encontrado en la base de datos.');
        return null;
      }
    } catch (error) {
      console.error('Error al obtener la información del usuario:', error);
      throw error;
    }
  }
  
}
