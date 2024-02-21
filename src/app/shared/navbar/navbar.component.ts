import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  showAboutSubMenu: boolean = false;

  showMediaSubMenu: boolean = false;
  showServicesSubMenu: boolean = false;

  showMobileMenu: boolean = false;

  constructor() {}

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
