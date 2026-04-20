import { Component } from '@angular/core';
import { DataApiDetailComponent } from '../data-api-detail/data-api-detail.component';

/**
 * ImageDetailComponent - Page de détail d'une image
 * Utilise le composant générique data-api-detail pour afficher les détails
 */
@Component({
    selector: 'app-image-detail',
    templateUrl: './image-detail.component.html',
    standalone: true,
    imports: [DataApiDetailComponent]
})
export class ImageDetailComponent {
}
