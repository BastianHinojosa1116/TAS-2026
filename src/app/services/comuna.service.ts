import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface Comuna {
  idComuna?: number;
  nombreProvicia: string;
  provincia?: {
    idProvincia: number;
    nombre: string;
  };
}

@Injectable({ providedIn: 'root' })
export class ComunaService {
  private base = `${environment.apiBaseUrl}/comunas`;
  constructor(private http: HttpClient) {}

  getAll(): Observable<Comuna[]> {
    return this.http.get<Comuna[]>(this.base);
  }
}
