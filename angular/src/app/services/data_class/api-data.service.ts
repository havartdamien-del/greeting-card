import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiConnectionService } from './api-connection.service';
import { Card, Tag, Image } from '../../models/card.model';

export type DataType = 'card' | 'tag' | 'images';

@Injectable()
export class ApiDataService {
  private tableName: string;

  constructor(
    private apiConnectionService: ApiConnectionService,
    dataType: DataType
  ) {
    this.tableName = this.mapDataTypeToTable(dataType);
  }

  /**
   * Mappe le type de données au nom de la table API
   * @param dataType - Type de données ('card', 'tag', 'images')
   * @returns Nom de la table correspondante
   */
  private mapDataTypeToTable(dataType: DataType): string {
    const mapping: Record<DataType, string> = {
      'card': 'cards',
      'tag': 'tags',
      'images': 'images'
    };
    return mapping[dataType];
  }

  /**
   * Récupère un élément par son ID et le convertit au type approprié
   * @param id - ID de l'élément
   * @param dataType - Type de données ('card', 'tag', 'images')
   */
  getDataById<T>(id: number, dataType: DataType): Observable<T> {
    return this.apiConnectionService.getDataById<T>(this.tableName, id).pipe(
      map(data => this.convertirData<T>(data, dataType))
    );
  }

  /**
   * Récupère un élément par son ID
   * @param id - ID de l'élément
   */
  getDataByIdRaw<T>(id: number): Observable<T> {
    return this.apiConnectionService.getDataById<T>(this.tableName, id);
  }

  /**
   * Convertit les données brutes de l'API en objets typés
   * @param data - Données brutes de l'API
   * @param dataType - Type de données ('card', 'tag', 'images')
   */
  convertirData<T>(data: any, dataType: DataType): T {
    switch (dataType) {
      case 'card':
        return this.convertToCard(data) as T;
      case 'tag':
        return this.convertToTag(data) as T;
      case 'images':
        return this.convertToImage(data) as T;
      default:
        return data as T;
    }
  }

  /**
   * Convertit les données en objet Card
   */
  private convertToCard(data: any): Card {
    return {
      id: data.id,
      title: data.title,
      description: data.description,
      picture: data.picture,
      tags: data.tags || []
    } as Card;
  }

  /**
   * Convertit les données en objet Tag
   */
  private convertToTag(data: any): Tag {
    return {
      id: data.id,
      name: data.name
    } as Tag;
  }

  /**
   * Convertit les données en objet Image
   */
  private convertToImage(data: any): Image {
    return {
      id: data.id,
      type: data.type,
      value: data.value
    } as Image;
  }

  /**
   * Met à jour un élément existant
   * @param id - ID de l'élément
   * @param data - Données à mettre à jour
   */
  updateData<T>(id: number, data: T): Observable<T> {
    return this.apiConnectionService.updateData<T>(this.tableName, id, data);
  }

  /**
   * Supprime un élément
   * @param id - ID de l'élément
   */
  deleteData(id: number): Observable<void> {
    return this.apiConnectionService.deleteData(this.tableName, id);
  }
}
