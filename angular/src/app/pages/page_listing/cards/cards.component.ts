import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../services/auth/auth.service';
import { CardsListComponent } from './cards-list.component';
import { PageContainerListingComponent } from '../page-container-listing/page-container-listing.component';

@Component({
    selector: 'app-cards',
    templateUrl: './cards.component.html',
    styleUrls: ['./cards.component.scss'],
    standalone: true,
    imports: [CommonModule, RouterModule, CardsListComponent, PageContainerListingComponent]
})
export class CardsComponent {
  isLoggedIn$ = this.authService.isLoggedIn$;

  constructor(private readonly router: Router, private readonly authService: AuthService) {}

  onAddCard(): void {
    this.router.navigate(['/create-card']);
  }

  onCardClick(id: number): void {
    this.router.navigate(['/card', id]);
  }
}
