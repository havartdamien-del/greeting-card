import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ImageDataService } from '../../../services/data_class/image-data.service';

@Component({
    selector: 'app-upload-image',
    templateUrl: './upload-image.component.html',
    styleUrls: ['./upload-image.component.scss'],
    standalone: false
})
export class UploadImageComponent implements OnInit {
  form!: FormGroup;
  selectedFile: File | null = null;
  previewUrl: string | ArrayBuffer | null = null;
  uploading = false;
  uploadSuccess = false;
  uploadError: string | null = null;
  uploadedImageId: number | null = null;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly imageDataService: ImageDataService,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.form = this.formBuilder.group({
      file: ['', Validators.required]
    });
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      console.log('File selected:', {
        name: file.name,
        size: file.size,
        type: file.type,
        lastModified: file.lastModified
      });
      
      this.selectedFile = file;
      
      // Afficher l'aperçu
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.previewUrl = e.target.result;
      };
      reader.readAsDataURL(file);

      // Mettre à jour le formulaire
      this.form.patchValue({ file: file.name });
      this.uploadError = null;
    }
  }

  onUpload(): void {
    if (!this.selectedFile) {
      this.uploadError = 'Veuillez sélectionner une image';
      console.error('Upload cancelled: No file selected');
      return;
    }

    console.log('Starting upload...');
    this.uploading = true;
    this.uploadError = null;

    this.imageDataService.uploadImage(this.selectedFile).subscribe({
      next: (response: any) => {
        this.uploading = false;
        this.uploadSuccess = true;
        this.uploadedImageId = response.picture?.id;
        console.log('Image uploadée avec succès:', response);
        
        // Rediriger vers la page des images après 2 secondes
        setTimeout(() => {
          this.router.navigate(['/images']);
        }, 2000);
      },
      error: (err) => {
        this.uploading = false;
        console.error('Erreur lors de l\'upload:', {
          status: err.status,
          statusText: err.statusText,
          error: err.error,
          message: err.message
        });
        this.uploadError = err.error?.message || 'Erreur lors de l\'upload. Veuillez réessayer.';
      }
    });
  }

  cancel(): void {
    this.router.navigate(['/images']);
  }

  onFileInputClick(): void {
    const fileInput = document.getElementById('fileInput') as HTMLInputElement;
    fileInput?.click();
  }
}
