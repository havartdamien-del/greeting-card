import { Component } from '@angular/core';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.scss']
})
export class TagsComponent {
  onTagClick(id: number): void {
    // À implémenter selon les besoins
    console.log('Tag cliqué:', id);
  }
}
