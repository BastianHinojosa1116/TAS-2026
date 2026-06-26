import { Injectable } from '@angular/core';
import {sendPasswordResetEmail, signInWithEmailAndPassword,signOut} from 'firebase/auth';


import { auth } from '../firebase.config';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  login(correo: string, password: string) {
    return signInWithEmailAndPassword(
      auth,
      correo,
      password
    );
  }

  logout() {
    return signOut(auth);
  }

  getUsuarioActual() {
    return auth.currentUser;
  }

  resetPassword(correo: string) {

  return sendPasswordResetEmail(
    auth,
    correo
  );

}
}
  
  