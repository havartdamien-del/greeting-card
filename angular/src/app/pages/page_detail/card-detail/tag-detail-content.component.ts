import { Component, Input } from '@angular/core';
import { Tag } from '../../../models/card.model';

/**
 * TagDetailContentComponent - Affiche le contenu spécifique d'un tag
 */
@Component({
    selector: 'app-tag-detail-content',
    templateUrl: './tag-detail-content.component.html',
    styleUrls: ['./tag-detail-content.component.scss'],
    standalone: false
})
export class TagDetailContentComponent {
  @Input() tag: Tag | null = null;
}
