import { Component } from '@angular/core';
import { RouterLink} from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import Swal from 'sweetalert2';

import {
  Categoria,
  CategoriaService
} from '../../services/categoria.service';

import {
  EventoService
} from '../../services/evento.service';

import {
  FechaEventoService
} from '../../services/fecha-evento.service';

@Component({
  selector: 'app-eventos',
  standalone: true,
  imports: [
    RouterLink,
    CommonModule,
    FormsModule
  ],
  templateUrl: './eventos.html',
  styleUrls: ['./eventos.css']
})

export class Eventos {

  fechaMinima: string;

  categorias: Categoria[] = [];

  idMunicipio!: number;

  nombreEvento = '';

  direccion = '';

  descripcionEvento = '';

  selectedCategoria: number | null = null;

  esPagado = false;

  estado = 'Disponible';

  petFriendly = false;

  accesibilidadDiscapacidad = false;

  estacionamiento = false;

  fechaSeleccionada = '';

  horaSeleccionada = '';

  fechasEvento: any[] = [];

  constructor(

    private categoriaSvc: CategoriaService,

      private router: Router,

    private eventoSvc: EventoService,

    private fechaEventoSvc: FechaEventoService

  ) {

    const hoy = new Date();

    this.fechaMinima =
      hoy.toISOString().split('T')[0];

  }

  ngOnInit(): void {

    this.idMunicipio =
      Number(localStorage.getItem('idMunicipio'));

    this.cargarCategorias();

  }

  cargarCategorias(): void {

    this.categoriaSvc
      .getAll()
      .subscribe({

        next: (resp) => {

          this.categorias = resp || [];

        },

        error: (err) => {

          console.error(err);

        }

      });

  }

  agregarFecha(): void {

    if (!this.fechaSeleccionada) {

      Swal.fire({
        icon: 'warning',
        title: 'Fecha requerida',
        text: 'Debe seleccionar una fecha.'
      });

      return;

    }

    if (!this.horaSeleccionada) {

      Swal.fire({
        icon: 'warning',
        title: 'Hora requerida',
        text: 'Debe seleccionar una hora.'
      });

      return;

    }

    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);

    const fecha = new Date(this.fechaSeleccionada);

    if (fecha < hoy) {

      Swal.fire({
        title: 'Fecha inválida',
        text: 'La fecha debe ser igual o posterior al día de hoy.',
        icon: 'warning',
        background: '#1e293b',
        color: '#ffffff',
        confirmButtonColor: '#2563eb'
      });

      return;

    }

    this.fechasEvento.push({

      fecha: this.fechaSeleccionada,

      horario: this.horaSeleccionada,

      idEvento: 0

    });

    this.fechaSeleccionada = '';

    this.horaSeleccionada = '';

  }

  eliminarFecha(index: number): void {

    this.fechasEvento.splice(index, 1);

  }

  limpiarFormulario(): void {

    this.nombreEvento = '';

    this.direccion = '';

    this.descripcionEvento = '';

    this.selectedCategoria = null;

    this.esPagado = false;

    this.estado = 'Disponible';

    this.petFriendly = false;

    this.accesibilidadDiscapacidad = false;

    this.estacionamiento = false;

    this.fechaSeleccionada = '';

    this.horaSeleccionada = '';

    this.fechasEvento = [];

  }

  guardarEvento(): void {

    if (!this.nombreEvento.trim()) {

      Swal.fire({
        title: 'Nombre requerido',
        text: 'Debe ingresar el nombre del evento.',
        icon: 'warning',
        background: '#1e293b',
        color: '#ffffff',
        confirmButtonColor: '#2563eb'
      });

      return;

    }

    if (!this.selectedCategoria) {

      Swal.fire({
        title: 'Categoría requerida',
        text: 'Debe seleccionar una categoría.',
        icon: 'warning',
        background: '#1e293b',
        color: '#ffffff',
        confirmButtonColor: '#2563eb'
      });

      return;

    }

    if (!this.direccion.trim()) {

      Swal.fire({
        title: 'Dirección requerida',
        text: 'Debe ingresar la dirección.',
        icon: 'warning',
        background: '#1e293b',
        color: '#ffffff',
        confirmButtonColor: '#2563eb'
      });

      return;

    }

    if (this.fechasEvento.length === 0) {

      Swal.fire({
        title: 'Fechas requeridas',
        text: 'Debe agregar al menos una fecha para el evento.',
        icon: 'warning',
        background: '#1e293b',
        color: '#ffffff',
        confirmButtonColor: '#2563eb'
      });

      return;

    }

    const eventoPayload = {

      nombreEvento: this.nombreEvento,

      direccion: this.direccion,

      imagen: '',

      esPagado: this.esPagado,

      descripcionEvento: this.descripcionEvento,

      petFriendly: this.petFriendly,

      accesibilidadDiscapacidad: this.accesibilidadDiscapacidad,

      estacionamiento: this.estacionamiento,

      qr: '',

      estado: this.estado,

      idMunicipio: this.idMunicipio,

      idCategorias: [

        this.selectedCategoria

      ]

    };

    console.log(eventoPayload);
    this.eventoSvc
  .create(eventoPayload)
  .subscribe({

    next: (eventoCreado: any) => {

      console.log('EVENTO CREADO');
      console.log(eventoCreado);

      // Si no existen fechas asociadas
      if (this.fechasEvento.length === 0) {

        Swal.fire({
          title: 'Evento registrado',
          text: 'El evento fue creado correctamente.',
          icon: 'success',
          background: '#1e293b',
          color: '#ffffff',
          confirmButtonColor: '#2563eb'
        }).then(() => {

          this.router.navigate([
            '/dashboard-municipio'
          ]);

        });

        return;

      }

      let registrosGuardados = 0;

      this.fechasEvento.forEach((fecha) => {

        const fechaPayload = {

          fecha: fecha.fecha,

          horario: fecha.horario,

          idEvento: eventoCreado.idEvento

        };

        console.log(fechaPayload);

        this.fechaEventoSvc
          .create(fechaPayload)
          .subscribe({

            next: () => {

              registrosGuardados++;

              if (registrosGuardados === this.fechasEvento.length) {

                Swal.fire({
                  title: 'Evento registrado',
                  text: 'El evento fue creado correctamente.',
                  icon: 'success',
                  background: '#1e293b',
                  color: '#ffffff',
                  confirmButtonColor: '#2563eb'
                }).then(() => {

                  this.limpiarFormulario();

                  this.router.navigate([
                    '/dashboard-municipio'
                  ]);

                });

              }

            },

            error: (err) => {

              console.error(err);

              Swal.fire({
                title: 'Error',
                text: 'No se pudo registrar una de las fechas del evento.',
                icon: 'error',
                background: '#1e293b',
                color: '#ffffff',
                confirmButtonColor: '#2563eb'
              });

            }

          });

      });

    },

    error: (err) => {

      console.error(err);

      Swal.fire({
        title: 'Error',
        text: 'No se pudo crear el evento.',
        icon: 'error',
        background: '#1e293b',
        color: '#ffffff',
        confirmButtonColor: '#2563eb'
      });

    }

  });

  }

}
