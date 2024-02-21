import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class CookieServiceService {
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  setCookie(name: string, value: string): void {
    if (isPlatformBrowser(this.platformId)) {
      // Browser-specific code
      // Set the cookie on the client side without an explicit expiration date
      document.cookie = `${name}=${value};path=/`;
    }
  }
  getCookie(name: string): string | null {
    if (isPlatformBrowser(this.platformId)) {
      // Browser-specific code
      const cookies = document.cookie.split(';');
      for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();
        if (cookie.startsWith(name + '=')) {
          return cookie.substring(name.length + 1, cookie.length);
        }
      }
    }

    return null;
  }

  deleteCookie(name: string): void {
    if (isPlatformBrowser(this.platformId)) {
      // Browser-specific code
      // Delete the cookie on the client side
      document.cookie = `${name}=;expires=${new Date(0).toUTCString()};path=/`;
    }
  }

  getAll(): { [name: string]: string } {
    const allCookies: { [name: string]: string } = {};

    if (isPlatformBrowser(this.platformId)) {
      const cookies = document.cookie.split(';');
      for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();
        const [cookieName, cookieValue] = cookie.split('=');
        allCookies[cookieName] = cookieValue;
      }
    }
    return allCookies;
  }
}
