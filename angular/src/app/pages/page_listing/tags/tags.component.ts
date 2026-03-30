import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-tags',
    templateUrl: './tags.component.html',
    styleUrls: ['./tags.component.scss'],
    standalone: false
})
export class TagsComponent {
  constructor(private router: Router) {}

  onAddTag(): void {
    this.router.navigate(['/create-tag']);
  }

  onTagClick(id: number): void {
    this.router.navigate(['/tag', id]);
  }
}
