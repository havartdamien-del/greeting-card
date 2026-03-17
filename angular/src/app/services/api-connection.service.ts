import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiConnectionService {
  private apiUrl = 'http://localhost:8080/api';

  // Headers pour accepter le format JSON-LD d'API Platform
  private headers = new HttpHeaders({
    'Accept': 'application/ld+json'
  });

  constructor(private http: HttpClient) {}

  /**
   * Récupère toutes les données depuis une table de l'API
   * @param tableName - Nom de la table (ex: 'cards', 'tags')
   */
  getData<T>(tableName: string): Observable<T[]> {
    return this.http.get<any>(`${this.apiUrl}/${tableName}`, { 
      headers: this.headers 
    }).pipe(
      map(response => this.extractData(response))
    );
  }

  /**
   * Récupère les données actives (isActif = true) depuis une table
   * @param tableName - Nom de la table (ex: 'cards_active')
   */
  getActiveData<T>(tableName: string): Observable<T[]> {
    return this.http.get<any>(`${this.apiUrl}/${tableName}`, { 
      headers: this.headers 
    }).pipe(
      map(response => this.extractData(response))
    );
  }

  /**
   * Récupère un élément spécifique par son ID
   * @param tableName - Nom de la table
   * @param id - ID de l'élément
   */
  getDataById<T>(tableName: string, id: number): Observable<T> {
    return this.http.get<T>(`${this.apiUrl}/${tableName}/${id}`, { 
      headers: this.headers 
    });
  }

  /**
   * Crée un nouvel élément
   * @param tableName - Nom de la table
   * @param data - Données à créer
   */
  createData<T>(tableName: string, data: T): Observable<T> {
    const headersWithContent = this.headers.set('Content-Type', 'application/ld+json');
    return this.http.post<T>(`${this.apiUrl}/${tableName}`, data, { 
      headers: headersWithContent 
    });
  }

  /**
   * Met à jour un élément existant
   * @param tableName - Nom de la table
   * @param id - ID de l'élément
   * @param data - Données à mettre à jour
   */
  updateData<T>(tableName: string, id: number, data: T): Observable<T> {
    const headersWithContent = this.headers.set('Content-Type', 'application/ld+json');
    return this.http.put<T>(`${this.apiUrl}/${tableName}/${id}`, data, { 
      headers: headersWithContent 
    });
  }

  /**
   * Supprime un élément
   * @param tableName - Nom de la table
   * @param id - ID de l'élément
   */
  deleteData(tableName: string, id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${tableName}/${id}`, { 
      headers: this.headers 
    });
  }

  /**
   * Upload un fichier image
   * @param formData - FormData contenant le fichier
   */
  uploadFile(formData: FormData): Observable<any> {
    console.log('=== UPLOAD FILE DEBUG ===');
    console.log('FormData entries:');
    formData.forEach((value, key) => {
      console.log(`  ${key}:`, value);
    });
    
    return this.http.post<any>(`${this.apiUrl}/pictures/upload`, formData).pipe(
      map(response => {
        console.log('Upload success response:', response);
        return response;
      })
    );
  }

  uploadFile2(file: File): Observable<any> {
        console.log('=== UPLOAD FILE DEBUG ** 2 ===');
    console.log('FormData entries:');
    
const formData = new FormData();
    formData.append('file', file);

    return this.http.post<any>(`${this.apiUrl}/pictures/upload`, formData).pipe(
      map(response => {
        console.log('Upload success response:', response);
        return response;
      })
    );
  }

  /**
   * Extrait les données du format de réponse API Platform
   * @param response - Réponse de l'API
   */
  private extractData<T>(response: any): T[] {
    if (Array.isArray(response['member'])) {
      return response['member'];
    } else if (Array.isArray(response['hydra:member'])) {
      return response['hydra:member'];
    } else if (Array.isArray(response)) {
      return response;
    }
    return [];
  }
}
