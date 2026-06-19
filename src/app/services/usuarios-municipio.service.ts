import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface UsuarioMunicipio {
  idUsuarioMunicipio?: number;
  nombreResponsable: string;
  correo: string;
  telefono?: string;
  estado?: string;
  rol?: any;
  municipio?: any;
}

@Injectable({ providedIn: 'root' })
export class UsuariosMunicipioService {
  private base = `${environment.apiBaseUrl}/usuarios-municipio`;
  constructor(private http: HttpClient) {}

  getAll(): Observable<UsuarioMunicipio[]> {
    return this.http.get<UsuarioMunicipio[]>(this.base);
  }

  create(payload: Partial<UsuarioMunicipio>) {
    return this.http.post<UsuarioMunicipio>(this.base, payload);
  }
}
