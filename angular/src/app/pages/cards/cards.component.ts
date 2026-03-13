import { Component, OnInit, OnDestroy } from '@angular/core';
import { ConnectionApiService } from '../../services/connection-api.service';
import { Card } from '../../models/card.model';
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

  constructor(private connectionApiService: ConnectionApiService) {}

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
    
    // Debug: appel direct au service pour voir la réponse brute
    this.connectionApiService.getCards().subscribe({
      next: (response: any) => {
        console.log('🔍 RESPONSE BRUTE DE L\'API:', response);
        console.log('🔍 Type de response:', typeof response);
        console.log('🔍 Response keys:', Object.keys(response));
        
        this.connectionApiService.loadCards()
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
      },
      error: (err) => {
        console.error('❌ ERREUR LORS DE L\'APPEL BRUT:', err);
        this.error = 'Erreur lors du chargement des cards. Veuillez réessayer.';
        this.loading = false;
      }
    });
  }
}
