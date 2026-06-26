import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ProvinciaService, Provincia } from '../../services/provincia.service';
import { ComunaService } from '../../services/comuna.service';
import Swal from 'sweetalert2';
import { MunicipioService } from '../../services/municipio.service';
import { UsuarioMunicipioService } from '../../services/usuario-municipio.service';
import { SidebarAdmin } from '../../components/sidebar-admin/sidebar-admin';


@Component({
  selector: 'app-mantenedor-municipio',
  standalone: true,
  imports: [RouterLink, CommonModule, FormsModule,SidebarAdmin],
  templateUrl: './mantenedor-municipio.html',
  styleUrl: './mantenedor-municipio.css',

})
export class MantenedorMunicipio {

  provincias: Provincia[] = [];
  comunas: any[] = [];
  allComunas: any[] = [];
  municipios: any[] = [];

  selectedProvinciaId: number | null = null;
  selectedComunaId: number | null = null;

  municipalidad = '';

  nombreResponsable = '';
  correo = '';
  telefono = '';



 constructor(
  private router: Router,
  private authService: AuthService,
  private provinciaSvc: ProvinciaService,
  private comunaSvc: ComunaService,
  private municipioSvc: MunicipioService,
  private usuarioMunicipioSvc: UsuarioMunicipioService
) { }




  loadMunicipios(): void {

    this.municipioSvc.getAll().subscribe({

      next: (data) => {

        this.municipios = data || [];

        console.log('MUNICIPIOS', this.municipios);

      },

      error: (err) => {

        console.error(err);

      }

    });

  }

  ngOnInit(): void {

    this.loadProvincias();
    this.loadComunas();
    this.loadMunicipios();

  }



  loadProvincias(): void {



    this.provinciaSvc.getAll().subscribe({

      next: (prov) => {

        console.log('PROVINCIAS =>', prov);

        this.provincias = prov || [];

      },

      error: (err) => {

        console.error(err);

      }

    });

  }

  loadComunas(): void {

    this.comunaSvc.getAll().subscribe({

      next: (com) => {

        this.allComunas = com || [];

      },

      error: (err) => {

        console.error(err);

      }

    });

  }

  seleccionarProvincia(event: any): void {

    this.selectedProvinciaId =
      Number(event.target.value);

    this.selectedComunaId = null;

    this.municipalidad = '';

    this.comunas = this.allComunas.filter((c) => {

      const provinciaId =
        c.idProvincia ??
        c.provincia?.idProvincia;

      const perteneceProvincia =
        Number(provinciaId) ===
        Number(this.selectedProvinciaId);

      const municipioExiste =
        this.municipios.some(
          (m) => m.comuna?.idComuna === c.idComuna
        );

      return perteneceProvincia && !municipioExiste;

    });

  }
  seleccionarComuna(event: any): void {

    this.selectedComunaId =
      Number(event.target.value);

    const comuna = this.comunas.find((c) =>

      (c.idComuna === this.selectedComunaId) ||
      (c.id === this.selectedComunaId)

    );

    const nombreComuna =
      comuna?.nombre ||
      comuna?.nombreComuna ||
      '';

    this.municipalidad =
      `Municipalidad de ${nombreComuna}`;

  }

  limpiarFormulario(): void {

    this.selectedProvinciaId = null;
    this.selectedComunaId = null;

    this.comunas = [];

    this.municipalidad = '';

    this.nombreResponsable = '';
    this.correo = '';
    this.telefono = '';

  }


  permitirSoloNumeros(event: KeyboardEvent): void {

    const charCode = event.which || event.keyCode;

    if (charCode < 48 || charCode > 57) {

      event.preventDefault();

    }

  }
  guardarMunicipio(): void {

    if (!this.selectedProvinciaId) {

      Swal.fire({
        title: 'Provincia requerida',
        text: 'Debe seleccionar una provincia.',
        icon: 'warning',
        confirmButtonColor: '#2563eb',
        background: '#1e293b',
        color: '#ffffff'
      });

      return;
    }

    if (!this.selectedComunaId) {

      Swal.fire({
        title: 'Comuna requerida',
        text: 'Debe seleccionar una comuna.',
        icon: 'warning',
        confirmButtonColor: '#2563eb',
        background: '#1e293b',
        color: '#ffffff'
      });

      return;

    }

    if (!this.nombreResponsable.trim()) {

      Swal.fire({
        title: 'Responsable requerido',
        text: 'Debe ingresar el nombre del responsable municipal.',
        icon: 'warning',
        confirmButtonColor: '#2563eb',
        background: '#1e293b',
        color: '#ffffff'
      });

      return;

    }

    if (!this.correo.trim()) {

  Swal.fire({
    title: 'Correo requerido',
    text: 'Debe ingresar un correo electrónico.',
    icon: 'warning',
    confirmButtonColor: '#2563eb',
    background: '#1e293b',
    color: '#ffffff'
  });

  return;
}

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(this.correo)) {

     Swal.fire({
  title: 'Correo requerido',
  text: 'Debe ingresar un correo electrónico.',
  icon: 'warning',
  background: '#1e293b',
  color: '#ffffff',
  confirmButtonColor: '#2563eb',
  showClass: {
    popup: ''
  }
});

      return;
    }

    if (!this.telefono.trim()) {

      Swal.fire({
        title: 'Teléfono requerido',
        text: 'Debe ingresar un teléfono celular.',
        icon: 'warning',
        confirmButtonColor: '#2563eb',
        background: '#1e293b',
        color: '#ffffff'
      });

      return;
    }

    const telefonoRegex = /^[0-9]{9}$/;

    if (!telefonoRegex.test(this.telefono)) {

      Swal.fire({
        title: 'Teléfono inválido',
        text: 'El teléfono debe contener exactamente 9 dígitos.',
        icon: 'error',
        confirmButtonColor: '#2563eb',
        background: '#1e293b',
        color: '#ffffff'
      });

      return;
    }

    const municipioPayload = {

      nombre: this.municipalidad,

      estado: "Activo",

      idComuna: this.selectedComunaId

    };

    console.log('PAYLOAD MUNICIPIO');
    console.log(municipioPayload);

    this.municipioSvc.create(municipioPayload)
      .subscribe({

        next: (municipioCreado: any) => {

          console.log('MUNICIPIO CREADO');
          console.log(municipioCreado);

          const usuarioPayload = {

            nombreResponsable: this.nombreResponsable,

            correo: this.correo,

            telefono: this.telefono,

            estado: 1,

            idRol: 2,

            idMunicipio: municipioCreado.idMunicipio

          };

          console.log('PAYLOAD USUARIO');
          console.log(usuarioPayload);



          this.usuarioMunicipioSvc
            .create(usuarioPayload)
            .subscribe({

              next: (resp) => {

                console.log('USUARIO MUNICIPIO CREADO');
                console.log(resp);

                Swal.fire({
                  title: 'Registro exitoso',
                  text: 'Municipio y responsable registrados correctamente.',
                  icon: 'success',
                  confirmButtonText: 'Aceptar',
                  confirmButtonColor: '#2563eb',
                  background: '#1e293b',
                  color: '#ffffff'
                });

                this.loadMunicipios();
                this.limpiarFormulario();

                

              },

              error: (err) => {

                console.error(
                  'ERROR CREANDO RESPONSABLE'
                );

                console.log('REQUEST ENVIADO');
                console.log(usuarioPayload);

                console.log('ERROR COMPLETO');
                console.log(err);

                console.log('BODY ERROR');
                console.log(err.error);

                alert(
                  'Se creó el municipio pero falló la creación del responsable.'
                );

              }

            });

        },

        error: (err) => {

          console.error(
            'ERROR CREANDO MUNICIPIO'
          );

          console.log(err);

          alert(
            'Error al crear municipio.'
          );

        }



      });

  }

  async cerrarSesion() {

  await this.authService.logout();

  localStorage.clear();

  this.router.navigate([
    '/login'
  ]);

}


}