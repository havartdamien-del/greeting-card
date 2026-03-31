import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-images',
    templateUrl: './images.component.html',
    styleUrls: ['./images.component.scss'],
    standalone: false
})
export class ImagesComponent {
  constructor(private router: Router) {}

  onAddImage(): void {
    this.router.navigate(['/upload-image']);
  }

  onImageClick(id: number): void {
    this.router.navigate(['/image', id]);
  }
}
