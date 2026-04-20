import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../services/auth/auth.service';
import { PageContainerListingComponent } from '../page-container-listing/page-container-listing.component';
import { ImagesListComponent } from './images-list.component';

@Component({
    selector: 'app-images',
    templateUrl: './images.component.html',
    styleUrls: ['./images.component.scss'],
    standalone: true,
    imports: [CommonModule, RouterModule, ImagesListComponent, PageContainerListingComponent]
})
export class ImagesComponent {
  isLoggedIn$ = this.authService.isLoggedIn$;

  constructor(private readonly router: Router, private readonly authService: AuthService) {}

  onAddImage(): void {
    this.router.navigate(['/upload-image']);
  }

  onImageClick(id: number): void {
    this.router.navigate(['/image', id]);
  }
}
