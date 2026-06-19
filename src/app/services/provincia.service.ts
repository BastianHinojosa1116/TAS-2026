import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface Provincia {
  idProvincia?: number;
  nombre: string;
}

@Injectable({ providedIn: 'root' })
export class ProvinciaService {
  private base = `${environment.apiBaseUrl}/provincias`;
  constructor(private http: HttpClient) {}

  getAll(): Observable<Provincia[]> {
    return this.http.get<Provincia[]>(this.base);
  }
}
