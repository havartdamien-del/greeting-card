import { Component, Input } from '@angular/core';
import { Image } from '../../../models/card.model';
import { ImageDataService } from '../../../services/data_class/image-data.service';

/**
 * ImageDetailContentComponent - Affiche le contenu spécifique d'une image
 */
@Component({
    selector: 'app-image-detail-content',
    templateUrl: './image-detail-content.component.html',
    styleUrls: ['./image-detail-content.component.scss'],
    standalone: false
})
export class ImageDetailContentComponent {
  @Input() image: Image | null = null;

  constructor(private imageDataService: ImageDataService) {}

  getSrcImage(): string {
    if (!this.image) return '';
    return this.imageDataService.getSrcImage(this.image);
  }
}
