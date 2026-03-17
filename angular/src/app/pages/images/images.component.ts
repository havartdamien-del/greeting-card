import { Component, OnInit, OnDestroy } from '@angular/core';
import { ImageDataService } from '../../services/image-data.service';
import { Image } from '../../models/card.model';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-images',
  templateUrl: './images.component.html',
  styleUrls: ['./images.component.scss']
})
export class ImagesComponent implements OnInit, OnDestroy {
  images: Image[] = [];
  loading = true;
  error: string | null = null;
  private destroy$ = new Subject<void>();

  constructor(private imageDataService: ImageDataService) {}

  ngOnInit(): void {
    this.loadImages();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  loadImages(): void {
    this.loading = true;
    this.error = null;
    
    this.imageDataService.loadImages()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (images: Image[]) => {
          this.images = images;
          this.loading = false;
          console.log('Images chargées:', images);
        },
        error: (err) => {
          console.error('Erreur lors du chargement des images:', err);
          this.error = 'Erreur lors du chargement des images. Veuillez réessayer.';
          this.loading = false;
        }
      });
  }
}
