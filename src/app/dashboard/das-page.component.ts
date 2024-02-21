import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-das-page',
  templateUrl: './das-page.component.html',
  styleUrls: ['./das-page.component.css'],
})
export class DasPageComponent {
  constructor(private router: Router) {}

  isDashBoardRoute(): boolean {
    // Check if the current route is from the home module
    return this.router.url.startsWith('/admin/dashboard');
  }
}
