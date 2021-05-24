import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Caderno } from '../interfaces/caderno';
import { map } from 'rxjs/operators'

@Injectable({
    providedIn: 'root'
})
export class CadernoService {

    private cadernosCollection: AngularFirestoreCollection<Caderno>;

    constructor(private fireStore: AngularFirestore) {
        this.cadernosCollection = this.fireStore.collection<Caderno>('Cadernos');
    }

    getCadernos() {
        return this.cadernosCollection.snapshotChanges().pipe(
            map(actions => {
                return actions.map(a => {
                    const data = a.payload.doc.data();
                    const id = a.payload.doc.id;

                    return { id, ...data };
                })
            })
        );
    }

    addCaderno(caderno: Caderno) {
        return this.cadernosCollection.add(caderno);
    }

    getCadernosById(id: string) {
        return this.cadernosCollection.snapshotChanges().pipe(
            map(actions => {
                return actions.map(a => {
                    console.log(a.payload.doc.data().userId);
                    console.log(id);
                    if(a.payload.doc.data().userId == id) {
                        const data = a.payload.doc.data();
                        const id = a.payload.doc.id;
    
                        return { id, ...data };
                    }
                    return;
                })
            })
        );
    }
    
    updateCadernoById(id: string, caderno: Caderno) {
        
    }

    deleteCadernoById(id: string) {
        return this.cadernosCollection.doc(id).delete();
    }
}
