import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  constructor(private router: Router) {}

  isAdminRoute(): boolean {
    // Check if the current route is from the home module
    return this.router.url.startsWith('/admin');
  }
}
