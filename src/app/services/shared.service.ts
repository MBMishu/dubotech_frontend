import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { CookieService } from 'ngx-cookie-service';
import { CookieServiceService } from './cookie-service.service';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  readonly APIUrl = 'https://api.dubotech.com/api';

  readonly MediaUrl = 'https://api.dubotech.com';

  constructor(
    private http: HttpClient,
    private cookieService: CookieService,
    private cookieService_doc: CookieServiceService
  ) {}

  isLoggedIn$ = new BehaviorSubject<boolean>(false);
  isAdmin$ = new BehaviorSubject<boolean>(false);
  isSuperAdmin$ = new BehaviorSubject<boolean>(false);

  getMediaUrl() {
    return this.MediaUrl;
  }

  getBlog(): Observable<any[]> {
    return this.http.get<any[]>(this.APIUrl + '/blog/');
  }

  getGallery(): Observable<any[]> {
    return this.http.get<any[]>(this.APIUrl + '/gallery/');
  }
  getTeam(): Observable<any[]> {
    return this.http.get<any[]>(this.APIUrl + '/team/');
  }

  // register part
  registerService(registerObj: any): Observable<any[]> {
    return this.http.post<any[]>(this.APIUrl + '/auth/register/', registerObj);
  }

  loginService(loginObj: any): Observable<any[]> {
    return this.http.post<any[]>(this.APIUrl + '/auth/login/', loginObj).pipe(
      tap((response) => {
        if (
          response['status'] === 200 &&
          response['data'] &&
          response['data'].roles
        ) {
          const isAdmin = this.checkAdminRole(response['data'].roles);
          const isSuperAdmin = this.checkSuperAdminRole(response['data'].roles);

          this.isLoggedIn$.next(true);

          if (isSuperAdmin) {
            // User has admin or super admin role
            this.isSuperAdmin$.next(true);
          } else {
            // User does not have admin or super admin role
            this.isSuperAdmin$.next(false);
          }

          if (!!this.cookieService_doc.getCookie('mi$hu_i$d')) {
            this.cookieService_doc.deleteCookie('mi$hu_i$d');
          }
          if (!!this.cookieService_doc.getCookie('mi$hu_tok$en')) {
            this.cookieService_doc.deleteCookie('mi$hu_tok$en');
          }

          this.cookieService_doc.setCookie('mi$hu_i$d', response['data'].id);
          this.cookieService_doc.setCookie(
            'mi$hu_tok$en',
            response['data'].token
          );
        }
      })
    );
  }

  private checkAdminRole(roles: string[]): boolean {
    return roles.some((role) => role['role'] === 'admin'); // Adjust based on your actual role naming
  }

  private checkSuperAdminRole(roles: string[]): boolean {
    return roles.some((role) => role['role'] === 'super_admin');
  }
  isLoggedIn() {
    return !!this.cookieService_doc.getCookie('mi$hu_i$d');
  }

  logoutService() {
    this.cookieService_doc.deleteCookie('mi$hu_tok$en');
    this.cookieService_doc.deleteCookie('mi$hu_i$d');
    this.isLoggedIn$.next(false);
    this.isSuperAdmin$.next(false);

    return true;
  }

  // forget pass part
  forgetPasswordService(loginObj: any): Observable<any[]> {
    return this.http.post<any[]>(this.APIUrl + '/auth/send-email/', loginObj);
  }

  // rest password part
  ResetPasswordService(loginObj: any): Observable<any[]> {
    return this.http.post<any[]>(
      this.APIUrl + '/auth/reset-password/',
      loginObj
    );
  }

  getAccessTokenFromCookie(): string {
    const cookieValue = this.cookieService_doc.getCookie('mi$hu_tok$en');

    if (cookieValue === null) {
      this.isLoggedIn$.next(false);
      throw new Error('Access token cookie not found');
    }

    return cookieValue;
  }

  // add to blog list
  addBlog(item: any): Observable<any[]> {
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${this.getAccessTokenFromCookie()}`
    );

    return this.http.post<any[]>(this.APIUrl + '/blog/', item, { headers });
  }
  // delete to blog list
  deleteBlog(blogId: string): Observable<any[]> {
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${this.getAccessTokenFromCookie()}`
    );

    return this.http.delete<any[]>(this.APIUrl + `/blog/${blogId}`, {
      headers,
    });
  }
  // update to blog list
  updateBlog(blogId: string, item: FormData): Observable<any> {
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${this.getAccessTokenFromCookie()}`
    );

    return this.http.put<any>(this.APIUrl + `/blog/${blogId}`, item, {
      headers,
    });
  }

  // add to gallery list
  addGallery(item: any): Observable<any[]> {
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${this.getAccessTokenFromCookie()}`
    );

    return this.http.post<any[]>(this.APIUrl + '/gallery/', item, { headers });
  }
  deleteGallery(blogId: string): Observable<any[]> {
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${this.getAccessTokenFromCookie()}`
    );

    return this.http.delete<any[]>(this.APIUrl + `/gallery/${blogId}`, {
      headers,
    });
  }
  // update to gallery list
  updateGallery(blogId: string, item: FormData): Observable<any> {
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${this.getAccessTokenFromCookie()}`
    );

    return this.http.put<any>(this.APIUrl + `/gallery/${blogId}`, item, {
      headers,
    });
  }

  addTeam(item: any): Observable<any[]> {
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${this.getAccessTokenFromCookie()}`
    );

    return this.http.post<any[]>(this.APIUrl + '/team/', item, { headers });
  }
  // delete to gallery list
  deleteTeam(blogId: string): Observable<any[]> {
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${this.getAccessTokenFromCookie()}`
    );

    return this.http.delete<any[]>(this.APIUrl + `/team/${blogId}`, {
      headers,
    });
  }
  // update to gallery list
  updateTeam(blogId: string, item: FormData): Observable<any> {
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${this.getAccessTokenFromCookie()}`
    );

    return this.http.put<any>(this.APIUrl + `/team/${blogId}`, item, {
      headers,
    });
  }

  // get team list
  getUserList(): Observable<any[]> {
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${this.getAccessTokenFromCookie()}`
    );

    return this.http.get<any[]>(this.APIUrl + '/user/', { headers });
  }

  // delete to user list
  deleteUser(blogId: string): Observable<any[]> {
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${this.getAccessTokenFromCookie()}`
    );

    return this.http.delete<any[]>(this.APIUrl + `/user/${blogId}`, {
      headers,
    });
  }
  // update to user list
  updateUser(blogId: string): Observable<any> {
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${this.getAccessTokenFromCookie()}`
    );

    const item = {
      isAdmin: true,
    };

    return this.http.put<any>(this.APIUrl + `/user/${blogId}`, item, {
      headers,
    });
  }
}
