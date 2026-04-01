import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { environment } from '../../../environments/environment';
import { LoginRequest, LoginResponse } from '../../models/auth.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private authTokenKey = 'authToken';
  private isLoggedInSubject = new BehaviorSubject<boolean>(false);
  public isLoggedIn$ = this.isLoggedInSubject.asObservable();

  constructor(private http: HttpClient) {}

  /**
   * Initialise l'état d'authentification en vérifiant si un token existe en sessionStorage
   */
  initializeAuth(): void {
    const token = this.getToken();
    this.isLoggedInSubject.next(!!token);
  }

  /**
   * Envoie les credentials à l'API d'authentification
   * @param email - Email de l'utilisateur
   * @param password - Mot de passe de l'utilisateur
   * @returns Observable<LoginResponse> contenant le token
   */
  login(email: string, password: string): Observable<LoginResponse> {
    const loginRequest: LoginRequest = { email, password };
    // Utilise l'URL de base Symfony (sans /api car /auth est à la racine)
    const authUrl = `${environment.apiUrl.replace('/api', '')}/auth`;
    
    return this.http.post<LoginResponse>(authUrl, loginRequest).pipe(
      tap(response => {
        // Stocke le token dans sessionStorage
        sessionStorage.setItem(this.authTokenKey, response.token);
        this.isLoggedInSubject.next(true);
      }),
      catchError(error => {
        console.error('Login failed:', error);
        throw error;
      })
    );
    //return throwError(() => Error)
  }

  /**
   * Effectue une déconnexion en supprimant le token
   */
  logout(): void {
    sessionStorage.removeItem(this.authTokenKey);
    this.isLoggedInSubject.next(false);
  }

  /**
   * Récupère le token du sessionStorage
   * @returns Le token ou null s'il n'existe pas
   */
  getToken(): string | null {
    return sessionStorage.getItem(this.authTokenKey);
  }

  /**
   * Getter synchrone pour vérifier l'état de connexion
   */
  get isLoggedIn(): boolean {
    return !!this.getToken();
  }
}
