// admin.guard.ts
import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import { SharedService } from './shared.service';

@Injectable({
  providedIn: 'root',
})
export class AdminGuardService implements CanActivate {
  constructor(private authService: SharedService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {
    const isLoggedIn = this.authService.isLoggedIn();
    const isSuperAdmin = this.authService.isSuperAdmin$.value; // Use the BehaviorSubject value

    if (isLoggedIn && isSuperAdmin) {
      return true; // Allow access to the route for super admin users
    } else {
      this.router.navigate(['/admin/dashboard']); // Redirect to dashboard for non-super admin users
      return false;
    }
  }
}
