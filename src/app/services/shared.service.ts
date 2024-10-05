import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { CookieService } from 'ngx-cookie-service';
import { CookieServiceService } from './cookie-service.service';
import { v4 as uuidv4 } from 'uuid'; // Import UUID

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  readonly DuburiAPIUrl = 'https://admin.bracu-duburi.com/api';
  readonly DuburiMediaUrl = 'https://admin.bracu-duburi.com';

  readonly ShopAPIUrl = 'https://admin.dubotech.com/api';
  readonly BackendAPIUrl = 'https://admin.dubotech.com/api';
  readonly MediaAPIUrl = 'https://admin.dubotech.com';
  // readonly ShopAPIUrl = 'http://127.0.0.1:8000/api';
  // readonly BackendAPIUrl = 'http://127.0.0.1:8000/api';
  // readonly MediaAPIUrl = 'http://127.0.0.1:8000';

  private sessionCookieKey = 'sessionid';
  private cartCountSubject = new BehaviorSubject<number>(0); // Initialize with 0
  cartCount$ = this.cartCountSubject.asObservable();

  constructor(
    private http: HttpClient,
    private cookieService: CookieService,
    private cookieService_doc: CookieServiceService
  ) {
    this.checkAndCreateSession(); // Ensure session is created
    this.refreshCartCount();
  }

  // Ensure session ID is created and stored in cookies
  private checkAndCreateSession() {
    if (!this.cookieService.check(this.sessionCookieKey)) {
      const sessionId = uuidv4(); // Generate a UUID as session ID
      this.cookieService.set(this.sessionCookieKey, sessionId, 30); // Store session ID in cookie, valid for 30 days
    }
  }

  // Fetch session ID from cookies
  private getSessionId(): string | null {
    return this.cookieService.get(this.sessionCookieKey);
  }

  // Method to refresh the cart count and emit updates
  private refreshCartCount() {
    this.getUserCart().subscribe((data) => {
      const count = data['total_items'];
      this.cartCountSubject.next(count); // Emit new cart count
    });
  }

  getDuburiMediaUrl() {
    return this.DuburiMediaUrl;
  }

  getMediaUrl() {
    return this.MediaAPIUrl;
  }
  getDuburiNews(): Observable<any[]> {
    return this.http.get<any[]>(this.DuburiAPIUrl + '/InNewsList/');
  }

  getNews(): Observable<any[]> {
    return this.http.get<any[]>(this.BackendAPIUrl + '/news/');
  }

  getTeam(): Observable<any[]> {
    return this.http.get<any[]>(this.BackendAPIUrl + '/all-team/');
  }
  getBodTeam(): Observable<any[]> {
    return this.http.get<any[]>(this.BackendAPIUrl + '/bod-team/');
  }

  getAllProducts(): Observable<any[]> {
    return this.http.get<any[]>(this.ShopAPIUrl + '/products/');
  }
  getProductsById(slug: string): Observable<any[]> {
    return this.http.get<any[]>(this.ShopAPIUrl + `/products/${slug}`);
  }
  getCategoryProductsById(slug: string): Observable<any[]> {
    return this.http.get<any[]>(this.ShopAPIUrl + `/category/${slug}`);
  }
  getCategory(): Observable<any[]> {
    return this.http.get<any[]>(this.ShopAPIUrl + `/category/`);
  }

  addToCart(slug: string, item: FormData): Observable<any[]> {
    // Fetch session ID from cookies
    const sessionId = this.getSessionId();

    if (sessionId) {
      // Include session ID in the request header
      const headers = new HttpHeaders({
        'X-Session-ID': sessionId,
      });
      return this.http
        .post<any[]>(`${this.ShopAPIUrl}/add-cart/${slug}`, item, { headers })
        .pipe(
          tap(() => this.refreshCartCount()) // Refresh cart count after adding item
        );
    }
    return this.http.post<any[]>(this.ShopAPIUrl + `/add-cart/${slug}`, item);
  }
  getUserCart(): Observable<any[]> {
    const sessionId = this.getSessionId();

    if (sessionId) {
      // Include session ID in the request header
      const headers = new HttpHeaders({
        'X-Session-ID': sessionId,
      });
      return this.http.get<any[]>(this.ShopAPIUrl + '/cart/', { headers });
    }

    return this.http.get<any[]>(this.ShopAPIUrl + '/cart/');
  }
  getCartById(slug: string): Observable<any[]> {
    return this.http.get<any[]>(this.ShopAPIUrl + `/cart/${slug}`);
  }
  removeCartItems(slug: string): Observable<any[]> {
    const sessionId = this.getSessionId();

    if (sessionId) {
      // Include session ID in the request header
      const headers = new HttpHeaders({
        'X-Session-ID': sessionId,
      });
      return this.http
        .delete<any[]>(this.ShopAPIUrl + `/remove-cart/${slug}`, {
          headers,
        })
        .pipe(
          tap(() => this.refreshCartCount()) // Refresh cart count after adding item
        );
    }
    return this.http.delete<any[]>(this.ShopAPIUrl + `/remove-cart/${slug}`);
  }
  placeOrder(item: FormData): Observable<any[]> {
    const sessionId = this.getSessionId();

    if (sessionId) {
      // Include session ID in the request header
      const headers = new HttpHeaders({
        'X-Session-ID': sessionId,
      });
      return this.http
        .post<any[]>(this.ShopAPIUrl + '/place-orders/', item, {
          headers,
        })
        .pipe(
          tap(() => this.refreshCartCount()) // Refresh cart count after adding item
        );
    }

    return this.http.post<any[]>(this.ShopAPIUrl + '/place-orders/', item);
  }
  getUserOrders(): Observable<any[]> {
    const sessionId = this.getSessionId();

    if (sessionId) {
      // Include session ID in the request header
      const headers = new HttpHeaders({
        'X-Session-ID': sessionId,
      });
      return this.http.get<any[]>(this.ShopAPIUrl + '/user-orders/', {
        headers,
      });
    }
    return this.http.get<any[]>(this.ShopAPIUrl + '/user-orders/');
  }
  getOrderById(slug: string): Observable<any[]> {
    return this.http.get<any[]>(this.ShopAPIUrl + `/user-orders/${slug}`);
  }
}
