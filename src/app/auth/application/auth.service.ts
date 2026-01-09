import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { AuthResponse, LoginRequest, User } from '../domain/auth.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = '/api/auth';
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient, private router: Router) {
    this.loadUserFromToken();
  }

  login(credentials: LoginRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/login`, credentials).pipe(
      tap(response => {
        localStorage.setItem('token', response.token);
        this.setUserFromToken(response.token);
      })
    );
  }

  logout() {
    localStorage.removeItem('token');
    this.currentUserSubject.next(null);
    this.router.navigate(['/login']);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  private loadUserFromToken() {
    const token = this.getToken();
    if (token) {
      this.setUserFromToken(token);
    }
  }

  private setUserFromToken(token: string) {
    try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        const user: User = {
            sub: payload.sub,
            role: payload.role,
            id: 0
        };
        this.currentUserSubject.next(user);
    } catch (e) {
        console.error('Invalid token');
        this.logout();
    }
  }
  
  isAuthenticated(): boolean {
      return !!this.getToken();
  }
  
  hasRole(role: string): boolean {
      return this.currentUserSubject.value?.role === role;
  }
}
