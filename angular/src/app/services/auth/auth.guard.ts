import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  private redirectUrl: string | null = null;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if (this.authService.isLoggedIn) {
      return true;
    } else {
      // Enregistre l'URL demandée pour redirection post-login
      this.redirectUrl = state.url;
      sessionStorage.setItem('redirectUrl', state.url);
      // Redirige vers la page de login
      this.router.navigate(['/login']);
      return false;
    }
  }

  /**
   * Récupère l'URL enregistrée pour redirection après login
   */
  getRedirectUrl(): string | null {
    const url = sessionStorage.getItem('redirectUrl');
    return url || null;
  }

  /**
   * Nettoie l'URL de redirection après l'avoir utilisée
   */
  clearRedirectUrl(): void {
    sessionStorage.removeItem('redirectUrl');
  }
}
