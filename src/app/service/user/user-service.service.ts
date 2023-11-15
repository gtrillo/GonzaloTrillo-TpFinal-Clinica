
import { Injectable } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { addDoc } from '@angular/fire/firestore';
import { Firestore, collection, doc, getDoc, setDoc } from '@firebase/firestore';
import { RolUser } from 'src/app/interfaces/rol-user';

@Injectable({
  providedIn: 'root',
})
export class UserService  {
  constructor(private auth: Auth, private firestore: Firestore) {}

  async guardarUsario(users : any){
    const col = collection (this.firestore, 'users') 
    addDoc(col,users)
  }

  // Obtener información de un usuario por su UID
  async getUserInfo(uid: string) {
    const userDocRef = doc(this.firestore, 'users', uid);
    const userDoc = await getDoc(userDocRef);
    return userDoc.exists() ? userDoc.data() : null;
  }

  // Asignar roles a un usuario por su UID
  async asignarRoles(uid: string, roles: RolUser) {
    const userDocRef = doc(this.firestore, 'users', uid);
    return setDoc(userDocRef, { roles }, { merge: true });
  }

  // Obtener el UID del usuario actualmente autenticado
  getCurrentUserUid() {
    const user = this.auth.currentUser;
    return user ? user.uid : null;
  }
}