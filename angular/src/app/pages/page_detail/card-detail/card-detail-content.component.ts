import { Component, Input } from '@angular/core';
import { Card, Image } from '../../../models/card.model';
import { ImageDataService } from '../../../services/data_class/image-data.service';
import { CommonModule } from '@angular/common';

/**
 * CardDetailContentComponent - Affiche le contenu spécifique d'une card
 */
@Component({
    selector: 'app-card-detail-content',
    templateUrl: './card-detail-content.component.html',
    styleUrls: ['./card-detail-content.component.scss'],
    standalone: true,
    imports: [CommonModule]
})
export class CardDetailContentComponent {
  @Input() card: Card | null = null;

  constructor(private readonly imageDataService: ImageDataService) {}

  getSrcImage(image?: Image): string {
    return this.imageDataService.getSrcImage(image);
  }
}
