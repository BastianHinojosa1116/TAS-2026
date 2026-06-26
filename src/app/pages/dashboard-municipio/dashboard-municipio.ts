import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { EventoService } from '../../services/evento.service';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-dashboard-municipio',
  standalone: true,
  imports: [RouterLink,
    CommonModule],
  templateUrl: './dashboard-municipio.html',
  styleUrl: './dashboard-municipio.css'
})
export class DashboardMunicipio {

  eventos: any[] = [];

  idMunicipio =
    Number(localStorage.getItem('idMunicipio'));


  constructor(
    private router: Router,
    private eventoService: EventoService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {

  if (!localStorage.getItem('uid')) {

    this.router.navigate(['/']);

    return;

  }

  this.cargarEventos();

}

  async cerrarSesion() {

    await this.authService.logout();

    localStorage.clear();

    this.router.navigate([
      '/'
    ]);

  }

  cargarEventos() {

    this.eventoService
      .getByMunicipio(this.idMunicipio)
      .subscribe({

        next: (resp: any[]) => {

          this.eventos = resp;

        },

        error: (err: any) => {

          console.log(err);

        }

      });

  }

  descargarQr(idEvento: number): void {

  this.eventoService
    .descargarQr(idEvento)
    .subscribe({

      next: (blob: Blob) => {

        const url = window.URL.createObjectURL(blob);

        const link = document.createElement('a');

        link.href = url;

        link.download = `evento-${idEvento}.png`;

        link.click();

        window.URL.revokeObjectURL(url);

      },

      error: (err: any) => {

        console.error(err);

      }

    });

}



}