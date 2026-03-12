import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class CorsInterceptor implements HttpInterceptor {
  
  // URLs autorisées pour les requêtes CORS
  private allowedOrigins = [
    'http://localhost:8080',
    'http://localhost:8081',
    'http://127.0.0.1:8080'
  ];

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Ajouter les headers CORS pour les requêtes vers les APIs autorisées
    if (this.isAllowedOrigin(req.url)) {
      // Cloner la requête et ajouter les headers si nécessaire
      req = req.clone({
        setHeaders: {
          'Content-Type': 'application/ld+json'
        },
        withCredentials: false
      });
    }

    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        // Gérer les erreurs CORS
        if (error.status === 0) {
          console.error('Erreur CORS ou autre erreur réseau:', error);
        }
        return throwError(() => error);
      })
    );
  }

  /**
   * Vérifie si l'URL est dans la liste des origines autorisées
   */
  private isAllowedOrigin(url: string): boolean {
    return this.allowedOrigins.some(origin => url.startsWith(origin));
  }
}
