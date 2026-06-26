import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RouterLink } from '@angular/router';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-sidebar-admin',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './sidebar-admin.html',
  styleUrl: './sidebar-admin.css'
})
export class SidebarAdmin {

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  async cerrarSesion() {

    await this.authService.logout();

    localStorage.clear();

    this.router.navigate(['/login']);

  }

}