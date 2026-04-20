import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TagsListComponent } from './tags-list.component';
import { PageContainerListingComponent } from '../page-container-listing/page-container-listing.component';

@Component({
    selector: 'app-tags',
    templateUrl: './tags.component.html',
    styleUrls: ['./tags.component.scss'],
    standalone: true,
    imports: [CommonModule, RouterModule, TagsListComponent, PageContainerListingComponent]
})
export class TagsComponent {
  constructor(private readonly router: Router) {}

  onAddTag(): void {
    this.router.navigate(['/create-tag']);
  }

  onTagClick(id: number): void {
    this.router.navigate(['/tag', id]);
  }
}
