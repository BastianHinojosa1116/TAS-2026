import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { EventoService } from '../../services/evento.service';
import { MunicipioService } from '../../services/municipio.service';
import { UsuariosAppService } from '../../services/usuarios-app.service';

@Component({
  selector: 'app-dashboard-admin',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './dashboard-admin.html',
  styleUrl: './dashboard-admin.css'
})
export class DashboardAdmin {

  totalMunicipios: number = 0;
  totalEventos: number = 0;
  totalUsuariosActivos: number = 0;
  municipiosList: any[] = [];

  constructor(
    private municipioSvc: MunicipioService,
    private eventoSvc: EventoService,
    private usuariosSvc: UsuariosAppService
  ) {}

  ngOnInit() {
    this.loadMetrics();
    this.loadMunicipiosTable();
  }

  loadMetrics() {
    this.municipioSvc.getAll().subscribe({ next: (m) => this.totalMunicipios = (m||[]).length, error: (e) => console.error(e) });
    this.eventoSvc.getAll().subscribe({ next: (e) => this.totalEventos = (e||[]).length, error: (e) => console.error(e) });
    this.usuariosSvc.getAll().subscribe({ next: (u) => this.totalUsuariosActivos = (u||[]).filter(x=> x.estado === 'activo' || x.estado === true).length, error: (e) => console.error(e) });
  }

  loadMunicipiosTable() {
    this.municipioSvc.getAll().subscribe({ next: (m) => this.municipiosList = m || [], error: (e) => console.error(e) });
  }

}
