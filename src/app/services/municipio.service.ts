import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface Municipio {
  idMunicipio?: number;
  nombre: string;
  estado?: string;
  comuna?: any;
}

@Injectable({ providedIn: 'root' })
export class MunicipioService {
  private base = `${environment.apiBaseUrl}/municipios`;
  constructor(private http: HttpClient) {}

  getAll(): Observable<Municipio[]> {
    return this.http.get<Municipio[]>(this.base);
  }

  create(payload: Partial<Municipio>) {
    return this.http.post<Municipio>(this.base, payload);
  }

  // additional methods (getById, update, delete) can be added later
}
