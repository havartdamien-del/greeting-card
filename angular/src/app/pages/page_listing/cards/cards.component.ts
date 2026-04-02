import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth/auth.service';

@Component({
    selector: 'app-cards',
    templateUrl: './cards.component.html',
    styleUrls: ['./cards.component.scss'],
    standalone: false
})
export class CardsComponent {
  isLoggedIn$ = this.authService.isLoggedIn$;

  constructor(private router: Router, private authService: AuthService) {}

  onAddCard(): void {
    this.router.navigate(['/create-card']);
  }

  onCardClick(id: number): void {
    this.router.navigate(['/card', id]);
  }
}
