import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

export interface FechaEvento {

  fecha: string;

  horario: string;

  idEvento: number;

}

@Injectable({
  providedIn: 'root'
})
export class FechaEventoService {

  private base =
    `${environment.apiBaseUrl}/fechas-evento`;

  constructor(
    private http: HttpClient
  ) {}

  create(payload: FechaEvento) {

    return this.http.post(
      this.base,
      payload
    );

  }

}