import { Routes } from '@angular/router';

import { Login } from './pages/login/login';
import { DashboardAdmin } from './pages/dashboard-admin/dashboard-admin';
import { DashboardMunicipio } from './pages/dashboard-municipio/dashboard-municipio';
import { MantenedorMunicipio } from './pages/mantenedor-municipio/mantenedor-municipio';
import { Comentarios } from './pages/comentarios/comentarios';
import { Eventos } from './pages/eventos/eventos';
import { ComentarioEvento } from './pages/comentario-evento/comentario-evento';

export const routes: Routes = [

  {
    path: '',
    component: Login
  },

  {
    path: 'dashboard-admin',
    component: DashboardAdmin
  },

  {
    path: 'dashboard-municipio',
    component: DashboardMunicipio
  },
  {
    path: 'mantenedor-municipio',
    component: MantenedorMunicipio
  },

  {
    path: 'comentarios',
    component: Comentarios
  },

  {
    path: 'eventos',
    component: Eventos
  },
  {
    path: 'comentario-evento/:id',
    component: ComentarioEvento
  }

];