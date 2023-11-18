import { Injectable } from '@angular/core';
import { Firestore, collection, query, where, getDocs, DocumentData, addDoc, doc, getDoc, setDoc } from '@angular/fire/firestore';
import { RolUser } from 'src/app/interfaces/rol-user';

@Injectable({
  providedIn: 'root',
})
export class UserService {

  constructor(private firestore: Firestore) {}

  public guardarUsuario (user : any){
    const col = collection (this.firestore, 'users') 
    addDoc(col,user)
  }

  async obtenerInfoUsuarioConRolesPorCorreo(correoUsuario: string) {
    try {
      const usersCollection = collection(this.firestore, 'users');
      const q = query(usersCollection, where('correo', '==', correoUsuario));
      const querySnapshot = await getDocs(q);

      querySnapshot.forEach((doc) => {
        const userInfo = doc.data() as DocumentData;
        console.log('Información del usuario:', userInfo);
        console.log('Roles del usuario:', userInfo['roles']);
      });
    } catch (error) {
      console.error('Error al obtener la información del usuario:', error);
      throw error;
    }
  }


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
  
}
