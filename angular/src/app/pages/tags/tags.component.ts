import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.scss']
})
export class TagsComponent implements OnInit {
  tags: any[] = [];
  loading = true;

  constructor() {}

  ngOnInit(): void {
    this.loadTags();
  }

  loadTags(): void {
    // TODO: Appeler l'API pour charger les tags
    this.loading = false;
  }
}
