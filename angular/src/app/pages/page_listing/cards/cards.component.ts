import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss']
})
export class CardsComponent {
  constructor(private router: Router) {}

  onAddCard(): void {
    this.router.navigate(['/create-card']);
  }

  onCardClick(id: number): void {
    this.router.navigate(['/card', id]);
  }
}
