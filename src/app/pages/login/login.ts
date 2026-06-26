import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

import Swal from 'sweetalert2';

import { AuthService } from '../../services/auth.service';
import { UsuarioMunicipioService } from '../../services/usuario-municipio.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {

  correo = '';
  password = '';

  constructor(
    private router: Router,
    private authService: AuthService,
    private usuarioMunicipioService: UsuarioMunicipioService
  ) { }

  async recuperarPassword() {

  const { value: correo } =
    await Swal.fire({
      title: 'Recuperar contraseña',
      input: 'email',
      inputLabel: 'Correo electrónico',
      inputPlaceholder: 'Ingrese su correo',
      confirmButtonText: 'Enviar',
      showCancelButton: true
    });

  if (!correo) {
    return;
  }

  try {

    await this.authService
      .resetPassword(correo);

    Swal.fire({
      icon: 'success',
      title: 'Correo enviado',
      text:
        'Revisa tu correo para restablecer tu contraseña.'
    });

  } catch (error: any) {

    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: error.message
    });

  }

}

  async iniciarSesion() {

    try {

      const credenciales =
        await this.authService.login(
          this.correo,
          this.password
        );

      const usuario = credenciales.user;

      console.log('UID:', usuario.uid);
      console.log('EMAIL:', usuario.email);

      localStorage.setItem(
        'uid',
        usuario.uid
      );

      localStorage.setItem(
        'correo',
        usuario.email ?? ''
      );

      this.usuarioMunicipioService
        .getByFirebaseUid(usuario.uid)
        .subscribe({

          next: (resp) => {

            console.log('DATOS SQL');
            console.log(resp);

            localStorage.setItem(
              'idRol',
              String(resp.rol.idRol)
            );

            localStorage.setItem(
              'rol',
              resp.rol.codigo
            );

            localStorage.setItem(
              'idMunicipio',
              String(resp.municipio.idMunicipio)
            );

            Swal.fire({
              title: 'Bienvenido',
              text: 'Inicio de sesión exitoso',
              icon: 'success',
              confirmButtonText: 'Continuar',
              background: '#1e293b',
              color: '#ffffff',
              confirmButtonColor: '#2563eb'
            }).then(() => {

              if (resp.rol.codigo === 'ADMIN') {

                this.router.navigate([
                  '/dashboard-admin'
                ]);

              } else if (resp.rol.codigo === 'MUNICIPIO') {

                this.router.navigate([
                  '/dashboard-municipio'
                ]);

              } else {

                Swal.fire({
                  title: 'Error',
                  text: 'Rol no reconocido.',
                  icon: 'error'
                });

              }

            });

          },

          error: (err) => {

            console.error(err);

            Swal.fire({
              title: 'Error',
              text: 'No se pudo obtener el perfil del usuario.',
              icon: 'error',
              background: '#1e293b',
              color: '#ffffff'
            });

          }

        });

    } catch (error: any) {

      console.log('ERROR FIREBASE');
      console.log(error);

      Swal.fire({
        title: 'Error',
        text: error.message,
        icon: 'error',
        background: '#1e293b',
        color: '#ffffff'
      });

    }

  }

}