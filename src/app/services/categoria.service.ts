import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface Categoria {

  idCategoria: number;

  nombre: string;

}

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  private base =
    `${environment.apiBaseUrl}/categorias`;

  constructor(
    private http: HttpClient
  ) {}

  getAll(): Observable<Categoria[]> {

    return this.http.get<Categoria[]>(
      this.base
    );

  }

}