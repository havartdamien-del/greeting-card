import { Component, Input } from '@angular/core';
import { Image } from '../../../models/card.model';
import { ImageDataService } from '../../../services/data_class/image-data.service';
import { CommonModule } from '@angular/common';

/**
 * ImageDetailContentComponent - Affiche le contenu spécifique d'une image
 */
@Component({
    selector: 'app-image-detail-content',
    templateUrl: './image-detail-content.component.html',
    styleUrls: ['./image-detail-content.component.scss'],
    standalone: true,
    imports: [CommonModule]
})
export class ImageDetailContentComponent {
  @Input() image: Image | null = null;

  constructor(private readonly imageDataService: ImageDataService) {}

  getSrcImage(): string {
    if (!this.image) return '';
    return this.imageDataService.getSrcImage(this.image);
  }

  getAltImage(): string {
    if (!this.image) return '';
    return this.imageDataService.getAltImage(this.image);
  }
}
