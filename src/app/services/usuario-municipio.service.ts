import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface UsuarioMunicipio {
  idUsuarioMunicipio?: number;
  nombreResponsable: string;
  correo: string;
  telefono?: string;
  estado?: number;
  idRol?: number;
  idMunicipio?: number;
  rol?: any;
  municipio?: any;
}

@Injectable({ providedIn: 'root' })
export class UsuarioMunicipioService {
  private base = `${environment.apiBaseUrl}/usuarios-municipio`;
  constructor(private http: HttpClient) { }

  getAll(): Observable<UsuarioMunicipio[]> {
    return this.http.get<UsuarioMunicipio[]>(this.base);
  }

  getById(id: number) {
    return this.http.get<any>(
      `${this.base}/${id}`
    );
  }

  getByFirebaseUid(uid: string) {

    return this.http.get<UsuarioMunicipio>(
      `${this.base}/firebase/${uid}`
    );

  }

  create(payload: Partial<UsuarioMunicipio>) {
    return this.http.post<UsuarioMunicipio>(this.base, payload);
  }


}
