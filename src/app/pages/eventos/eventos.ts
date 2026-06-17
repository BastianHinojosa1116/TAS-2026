import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-eventos',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './eventos.html',
  styleUrls: ['./eventos.css']
})
export class Eventos {

  fechaMinima: string;

  constructor() {

    const hoy = new Date();

    this.fechaMinima = hoy.toISOString().split('T')[0];

  }

}