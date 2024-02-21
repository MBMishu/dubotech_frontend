import { Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Component } from '@angular/core';

import { SharedService } from 'src/app/services/shared.service';

import { CookieServiceService } from 'src/app/services/cookie-service.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent {
  constructor(
    private router: Router,
    private authService: SharedService,
    private cookieService: CookieService,
    private cookieService_doc: CookieServiceService
  ) {}

  logout() {
    this.authService.logoutService();

    // Log cookie values after deletion

    this.router.navigate(['/admin']);
  }
}
