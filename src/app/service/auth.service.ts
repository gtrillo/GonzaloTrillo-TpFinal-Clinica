import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword } from '@angular/fire/auth';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {


  constructor(private auth: Auth, private router: Router) { }
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
  register({ email, password }: any) {
    return createUserWithEmailAndPassword(this.auth, email, password)
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

}
