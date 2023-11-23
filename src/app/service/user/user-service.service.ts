import { Injectable } from '@angular/core';
import { User } from '@angular/fire/auth';
import { Firestore, collection, query, where, getDocs, DocumentData, addDoc, doc, getDoc, setDoc, collectionData } from '@angular/fire/firestore';
import { RolUser } from 'src/app/interfaces/rol-user';
import { deleteDoc } from "firebase/firestore";

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private firestore: Firestore) {}

  public guardarUsuario (user : any){
    const col = collection (this.firestore, 'users') 
    addDoc(col,user)
  }

  async eliminarUsuario(correo: string) {
    try {
      const usersCollection = collection(this.firestore, 'users');
      const q = query(usersCollection, where('correo', '==', correo));
      const querySnapshot = await getDocs(q);
  
      querySnapshot.forEach(async (userDoc) => {
        const userDocRef = doc(this.firestore, 'users', userDoc.id);
        // Establece la fecha de inactivación sin eliminar el documento
        await setDoc(userDocRef, { fechaInactivacion: new Date(), activo: false }, { merge: true });
      });
      console.log('Usuario marcado como inactivo correctamente');
    } catch (error) {
      console.error('Error al marcar el usuario como inactivo:', error);
      throw error;
    }
  }

  async  desactivarUsuario(correo: string) {
    try {
      const usersCollection = collection(this.firestore, 'users');
      const q = query(usersCollection, where('correo', '==', correo));
      const querySnapshot = await getDocs(q);

      querySnapshot.forEach(async (userDoc) => {
        const userDocRef = doc(this.firestore, 'users', userDoc.id);
        await setDoc(userDocRef, { activo: false }, { merge: true });
      });

      console.log('Usuario desactivado correctamente');
    } catch (error) {
      console.error('Error al desactivar el usuario:', error);
      throw error;
    }
  }


  async  ActivarUsuario(correo: string) {
    try {
      const usersCollection = collection(this.firestore, 'users');
      const q = query(usersCollection, where('correo', '==', correo));
      const querySnapshot = await getDocs(q);

      querySnapshot.forEach(async (userDoc) => {
        const userDocRef = doc(this.firestore, 'users', userDoc.id);
        await setDoc(userDocRef, { activo: true }, { merge: true });
      });

      console.log('Usuario activado correctamente');
    } catch (error) {
      console.error('Error al activar el usuario:', error);
      throw error;
    }
  }


  public taerUsuarios() {
    const col = collection(this.firestore, 'users');
    console.log("col",col);
    return collectionData(col); 
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


  async devolverRolUsuarioPorCorreo(correoUsuario: string): Promise<RolUser | null> {
    try {
      const usersCollection = collection(this.firestore, 'users');
      const q = query(usersCollection, where('correo', '==', correoUsuario));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const userDoc = querySnapshot.docs[0];
        const userInfo = userDoc.data() as DocumentData;
        
        // Asegúrate de ajustar la estructura real de tu objeto de usuario
        const roles = userInfo['tipo'] as RolUser;

        console.log('Roles del usuario:', roles);
        return roles;
      } else {
        console.log('Usuario no encontrado en la base de datos.');
        return null;
      }
    } catch (error) {
      console.error('Error al obtener el rol del usuario:', error);
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
