import { Component, Input } from '@angular/core';
import { Tag } from '../../../models/card.model';
import { CommonModule } from '@angular/common';

/**
 * TagDetailContentComponent - Affiche le contenu spécifique d'un tag
 */
@Component({
    selector: 'app-tag-detail-content',
    templateUrl: './tag-detail-content.component.html',
    styleUrls: ['./tag-detail-content.component.scss'],
    standalone: true,
    imports: [CommonModule]
})
export class TagDetailContentComponent {
  @Input() tag: Tag | null = null;
}
