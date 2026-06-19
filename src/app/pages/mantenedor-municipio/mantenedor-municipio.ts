import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProvinciaService, Provincia } from '../../services/provincia.service';
import { ComunaService } from '../../services/comuna.service';

@Component({
  selector: 'app-mantenedor-municipio',
  standalone: true,
  imports: [RouterLink, CommonModule, FormsModule],
  templateUrl: './mantenedor-municipio.html',
  styleUrl: './mantenedor-municipio.css'
})
export class MantenedorMunicipio {

  provincias: Provincia[] = [];
  comunas: Array<any> = [];
  allComunas: Array<any> = [];
  selectedProvinciaId: number | null = null;
  selectedComunaId: number | null = null;
  municipalidad = '';

  constructor(
    private provinciaSvc: ProvinciaService,
    private comunaSvc: ComunaService
  ) {}

  ngOnInit() {
    this.loadProvincias();
    this.loadComunas();
  }

  loadProvincias() {
    this.provinciaSvc.getAll().subscribe({
      next: (prov) => (this.provincias = prov || []),
      error: (err) => console.error('Error cargando provincias', err)
    });
  }

  loadComunas() {
    this.comunaSvc.getAll().subscribe({
      next: (com) => {
        this.allComunas = com || [];
        console.debug('Comunas cargadas', this.allComunas.slice(0,20));
        this.filterComunas();
      },
      error: (err) => console.error('Error cargando comunas', err)
    });
  }

  seleccionarProvincia(event: any) {
    this.selectedProvinciaId = Number(event.target.value) || null;
    this.filterComunas();
    this.selectedComunaId = null;
    this.municipalidad = '';
  }

  seleccionarComuna(event: any) {
    this.selectedComunaId = Number(event.target.value) || null;
    const comuna = this.comunas.find((c) => {
      // comuna id may be in different properties depending on backend
      return (c.idComuna && c.idComuna === this.selectedComunaId) || (c.id && c.id === this.selectedComunaId);
    });
    const nombre = comuna?.nombreProvicia || comuna?.nombre || comuna?.nombreComuna || '';
    this.municipalidad = nombre ? `Municipalidad de ${nombre}` : '';
  }

  private filterComunas() {
    if (!this.selectedProvinciaId) {
      this.comunas = [];
      return;
    }
    this.comunas = this.allComunas.filter((comuna) => {
      // provincia may be an object { idProvincia } or just an id number
      const prov = comuna.provincia;
      const provId = prov && typeof prov === 'object' ? prov.idProvincia : prov;
      // some APIs return idProvincia directly on comuna
      const directProvId = (comuna.idProvincia !== undefined) ? comuna.idProvincia : null;
      return Number(provId) === Number(this.selectedProvinciaId) || Number(directProvId) === Number(this.selectedProvinciaId);
    });
  }

}
