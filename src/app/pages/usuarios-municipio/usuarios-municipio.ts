import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsuarioMunicipioService } from '../../services/usuario-municipio.service';

@Component({
  selector: 'app-usuarios-municipio',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './usuarios-municipio.html',
  styleUrl: './usuarios-municipio.css'
})
export class UsuariosMunicipio {
  

  usuarios: any[] = [];

  constructor(private usrSvc: UsuarioMunicipioService) {}

  ngOnInit() {
    this.load();
  }

  load() {
    this.usrSvc.getAll().subscribe({
      next: (r) => (this.usuarios = r || []),
      error: (e) => console.error('Error cargando usuarios municipio', e)
    });
  }

  

}
