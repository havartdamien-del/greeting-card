import { Component, Input } from '@angular/core';
import { Card } from '../../../models/card.model';

/**
 * CardDetailContentComponent - Affiche le contenu spécifique d'une card
 */
@Component({
  selector: 'app-card-detail-content',
  templateUrl: './card-detail-content.component.html',
  styleUrls: ['./card-detail-content.component.scss']
})
export class CardDetailContentComponent {
  @Input() card: Card | null = null;
}
