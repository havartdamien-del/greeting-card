import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth/auth.service';

@Component({
    selector: 'app-images',
    templateUrl: './images.component.html',
    styleUrls: ['./images.component.scss'],
    standalone: false
})
export class ImagesComponent {
  isLoggedIn$ = this.authService.isLoggedIn$;

  constructor(private router: Router, private authService: AuthService) {}

  onAddImage(): void {
    this.router.navigate(['/upload-image']);
  }

  onImageClick(id: number): void {
    this.router.navigate(['/image', id]);
  }
}
