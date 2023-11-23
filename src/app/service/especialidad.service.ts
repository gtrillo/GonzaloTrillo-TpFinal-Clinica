import { Injectable } from '@angular/core';
import { Firestore, addDoc, collection, collectionData } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class EspecialidadService {

 
  constructor(private firestore: Firestore) { }

 
  public GuardarEspecialidad (especialidad : any){
    const col = collection (this.firestore, 'especialidades') 
    addDoc(col,especialidad)
  }
  

  traerEspecialidad() {
    const col = collection(this.firestore, 'especialidades');
    return collectionData(col); 
  }


}
