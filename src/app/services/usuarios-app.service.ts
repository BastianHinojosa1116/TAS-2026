import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface UsuarioApp {
  idUsuarioApp?: number;
  nombre?: string;
  correo?: string;
  estado?: string | boolean;
}

@Injectable({ providedIn: 'root' })
export class UsuariosAppService {
  private base = `${environment.apiBaseUrl}/usuarios-app`;
  constructor(private http: HttpClient) {}

  getAll(): Observable<UsuarioApp[]> {
    return this.http.get<UsuarioApp[]>(this.base);
  }
}
