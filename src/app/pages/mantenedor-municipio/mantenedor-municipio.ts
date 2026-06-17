import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-mantenedor-municipio',
  standalone: true,
  imports: [RouterLink,CommonModule,],
  templateUrl: './mantenedor-municipio.html',
  styleUrl: './mantenedor-municipio.css'
})
export class MantenedorMunicipio {

  provincias: string[] = [
  'Santiago',
  'Cordillera',
  'Chacabuco',
  'Maipo',
  'Melipilla',
  'Talagante'
];

comunas: string[] = [];

municipalidad = '';

datosComunas: any = {

  Santiago: [
    'Cerrillos',
    'Cerro Navia',
    'Conchalí',
    'El Bosque',
    'Estación Central',
    'Huechuraba',
    'Independencia',
    'La Cisterna',
    'La Florida',
    'La Granja',
    'La Pintana',
    'La Reina',
    'Las Condes',
    'Lo Barnechea',
    'Lo Espejo',
    'Lo Prado',
    'Macul',
    'Maipú',
    'Ñuñoa',
    'Pedro Aguirre Cerda',
    'Peñalolén',
    'Providencia',
    'Pudahuel',
    'Quilicura',
    'Quinta Normal',
    'Recoleta',
    'Renca',
    'San Joaquín',
    'San Miguel',
    'San Ramón',
    'Santiago',
    'Vitacura'
  ],

  Cordillera: [
    'Puente Alto',
    'Pirque',
    'San José de Maipo'
  ],

  Chacabuco: [
    'Colina',
    'Lampa',
    'Tiltil'
  ],

  Maipo: [
    'San Bernardo',
    'Buin',
    'Paine',
    'Calera de Tango'
  ],

  Melipilla: [
    'Melipilla',
    'Curacaví',
    'María Pinto',
    'San Pedro',
    'Alhué'
  ],

  Talagante: [
    'Talagante',
    'Peñaflor',
    'El Monte',
    'Isla de Maipo',
    'Padre Hurtado'
  ]

};

seleccionarProvincia(event: any) {

  const provincia = event.target.value;

  this.comunas = this.datosComunas[provincia] || [];

  this.municipalidad = '';

}

seleccionarComuna(event: any) {

  const comuna = event.target.value;

  this.municipalidad =
    `Municipalidad de ${comuna}`;

}

}