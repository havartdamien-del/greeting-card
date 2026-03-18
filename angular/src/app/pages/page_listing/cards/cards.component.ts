import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { CardDataService } from '../../../services/data_class/card-data.service';
import { Card } from '../../../models/card.model';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss']
})
export class CardsComponent implements OnInit, OnDestroy {
  cards: Card[] = [];
  loading = true;
  error: string | null = null;
  private destroy$ = new Subject<void>();

  constructor(private cardDataService: CardDataService, private router: Router) {}

  ngOnInit(): void {
    this.loadCards();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  loadCards(): void {
    this.loading = true;
    this.error = null;
    
    this.cardDataService.loadCards()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (cards: Card[]) => {
          this.cards = cards;
          this.loading = false;
          console.log('✅ Cards chargées:', cards);
          console.log('✅ Nombre de cards:', cards.length);
          console.log('✅ Structure première card:', cards[0]);
        },
        error: (err) => {
          console.error('❌ Erreur lors du chargement des cards:', err);
          this.error = 'Erreur lors du chargement des cards. Veuillez réessayer.';
          this.loading = false;
        }
      });
  }

  navigateTo(route: string): void {
    this.router.navigate([route]);
  }

  viewCardDetail(id: number): void {
    this.router.navigate(['/card', id]);
  }
}
