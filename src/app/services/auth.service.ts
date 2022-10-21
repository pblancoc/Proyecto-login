import { Injectable } from '@angular/core';
// importamos para la autorización:
import { Auth, createUserWithEmailAndPassword, sendPasswordResetEmail, signInWithEmailAndPassword, signOut } from '@angular/fire/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // complentamos el constructor
  constructor(

    private auth: Auth,
    private afAuth: AngularFireAuth


  ) { }

  // y las siguienets funciones
  async register({ email, password }) {
    try {
      const user = await createUserWithEmailAndPassword(
        this.auth,
        email,
        password
      );
      return user;
    } catch (e) {
      return null;
    }
  }

  async login({ email, password }) {
    try {
      const user = await signInWithEmailAndPassword(
        this.auth,
        email,
        password
      );
      return user;
    } catch (e) {
      return null;
    }
  }

  logout() {
    return signOut(this.auth);
  }

 async recuperarContraseña(email: string){
return await this.afAuth.sendPasswordResetEmail(email);
  }
  //  async recuperarUsuar(email: string) {
  //    return await this.afAuth.sendPasswordResetEmail(email);
  //  }
  // async recuperar({ email}) {
  //   try {
  //     const user = await sendPasswordResetEmail(
  //       this.auth,
  //       email,
        
  //     );
  //     return user;
  //   } catch (e) {
  //     return null;
  //   }
  // }
}
