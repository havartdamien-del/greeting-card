import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss']
})
export class CardsComponent implements OnInit {
  cards: any[] = [];
  loading = true;

  constructor() {}

  ngOnInit(): void {
    this.loadCards();
  }

  loadCards(): void {
    // TODO: Appeler l'API pour charger les cards
    this.loading = false;
  }
}
