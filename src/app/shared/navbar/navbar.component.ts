import { Component, HostListener, OnInit } from '@angular/core';

import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  showAboutSubMenu: boolean = false;

  showMediaSubMenu: boolean = false;
  showServicesSubMenu: boolean = false;

  showMobileMenu: boolean = false;

  scrolledDown: boolean = false; // Add this property

  cartCount: number = 0;

  constructor(private service: SharedService) {}

  ngOnInit() {
    this.refreshCount();
  }
  refreshCount() {
    this.service.cartCount$.subscribe((count) => {
      this.cartCount = count; // Update cart count on changes
    });
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    // Detect scroll position and change scrolledDown flag accordingly
    this.scrolledDown = window.scrollY > 0;
  }

  toggleAboutSubMenu() {
    this.closeSubmenus();
    this.showAboutSubMenu = !this.showAboutSubMenu;
  }
  toggleAboutSubMenu_(isOpen: boolean) {
    this.closeSubmenus();
    this.showAboutSubMenu = isOpen;
  }

  toggleMediaSubMenu() {
    this.closeSubmenus();
    this.showMediaSubMenu = !this.showMediaSubMenu;
  }
  toggleMediaSubMenu_(isOpen: boolean) {
    this.closeSubmenus();
    this.showMediaSubMenu = isOpen;
  }

  toggleServicesSubMenu() {
    this.closeSubmenus();
    this.showServicesSubMenu = !this.showServicesSubMenu;
  }
  toggleServicesSubMenu_(isOpen: boolean) {
    this.closeSubmenus();
    this.showServicesSubMenu = isOpen;
  }

  toggleMobileMenu() {
    this.closeSubmenus();

    this.showMobileMenu = !this.showMobileMenu;
  }

  private closeSubmenus() {
    this.showAboutSubMenu = false;
    this.showMediaSubMenu = false;
    this.showServicesSubMenu = false;
  }
}
