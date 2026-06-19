import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface Evento {
  idEvento?: number;
  nombreEvento?: string;
  estado?: string;
  municipio?: any;
}

@Injectable({ providedIn: 'root' })
export class EventoService {
  private base = `${environment.apiBaseUrl}/eventos`;
  constructor(private http: HttpClient) {}

  getAll(): Observable<Evento[]> {
    return this.http.get<Evento[]>(this.base);
  }
}
