import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';


export interface Evento {

  idEvento?: number;

  nombreEvento: string;

  direccion: string;

  imagen?: string;

  esPagado: boolean;

  descripcionEvento?: string;

  petFriendly: boolean;

  accesibilidadDiscapacidad: boolean;

  estacionamiento: boolean;

  qr?: string;

  estado: string;

  idMunicipio: number;

  idCategorias: number[];

}

@Injectable({
  providedIn: 'root'
})
export class EventoService {

  private base =
    `${environment.apiBaseUrl}/eventos`;

  constructor(
    private http: HttpClient
  ) {}

  create(payload: Evento) {

    return this.http.post<any>(
      this.base,
      payload
    );

  }

  getAll(): Observable<Evento[]> {

    return this.http.get<Evento[]>(
      this.base
    );

  }

  getByMunicipio(idMunicipio: number) {

  return this.http.get<Evento[]>(
    `${this.base}/municipio/${idMunicipio}`
  );

}

descargarQr(idEvento: number) {

  return this.http.get(

    `${environment.apiBaseUrl}/qr/${idEvento}`,

    {

      responseType: 'blob'

    }

  );

}

}