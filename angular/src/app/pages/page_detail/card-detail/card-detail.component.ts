import { Component } from '@angular/core';
import { DataApiDetailComponent } from '../data-api-detail/data-api-detail.component';

/**
 * CardDetailComponent - Page de détail d'une card
 * Utilise le composant générique data-api-detail pour afficher les détails
 */
@Component({
    selector: 'app-card-detail',
    templateUrl: './card-detail.component.html',
    standalone: true,
    imports: [DataApiDetailComponent]
})
export class CardDetailComponent {
}