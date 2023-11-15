import { Injectable } from '@angular/core';

import { collectionData } from '@angular/fire/firestore';

import { Auth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { RolUser } from '../interfaces/rol-user';
import { Firestore, collection, query, where, getDocs, addDoc, DocumentReference } from '@angular/fire/firestore';
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword } from '@angular/fire/auth';
import {doc, setDoc } from 'firebase/firestore';

import { sendEmailVerification } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {


  constructor(private auth: Auth, private router: Router, private firestore: Firestore) { }
  usuarioLogueado: boolean = false;


  login({ email, password }: any) {
    return signInWithEmailAndPassword(this.auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        return user;
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error(`Error: ${errorCode} - ${errorMessage}`);
        throw error;
      });
  }

  register({ email, password, tipoUsuario }: any) {
    return createUserWithEmailAndPassword(this.auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
          if (tipoUsuario === 'paciente') {
          this.asignarRol(user, { paciente: true });
        } else if (tipoUsuario === 'especialista') {
          this.asignarRol(user, { especialista: true });
        }
          return sendEmailVerification(user)
          .then(() => {
            console.log("Correo de verificación enviado");
            return user;
          })
          .catch((error) => {
            console.error("Error al enviar el correo de verificación", error);
            throw error;
          });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error(`Error: ${errorCode} - ${errorMessage}`);
        throw error;
      });
  }
  

  verificarSesion(): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      onAuthStateChanged(this.auth, (user) => {
        if (user) {
          resolve(true); // El usuario está autenticado
        } else {
          resolve(false); // El usuario no está autenticado
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

  private asignarRol(user: any, roles: RolUser) {
    const userDocRef = doc(this.firestore, 'users', user.uid);
    setDoc(userDocRef, { roles }, { merge: true });
  }
  
  
}
