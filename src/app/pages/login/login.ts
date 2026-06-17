import { Component } from '@angular/core';
import { Router } from '@angular/router';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {

  constructor(private router: Router) {}

  iniciarSesion() {

    Swal.fire({
      title: 'Bienvenido',
      text: 'Inicio de sesión exitoso',
      icon: 'success',
      confirmButtonText: 'Continuar',
      background: '#1e293b',
      color: '#ffffff',
      confirmButtonColor: '#2563eb'
    }).then(() => {

      this.router.navigate(['/dashboard-admin']);

    });

  }

}