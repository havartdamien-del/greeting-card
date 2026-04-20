import { Component } from '@angular/core';
import { DataApiDetailComponent } from '../data-api-detail/data-api-detail.component';

/**
 * TagDetailComponent - Page de détail d'un tag
 * Utilise le composant générique data-api-detail pour afficher les détails
 */
@Component({
    selector: 'app-tag-detail',
    templateUrl: './tag-detail.component.html',
    standalone: true,
    imports: [DataApiDetailComponent]
})
export class TagDetailComponent {
}
