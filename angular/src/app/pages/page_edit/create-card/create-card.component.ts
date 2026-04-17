import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { CardDataService } from '../../../services/data_class/card-data.service';
import { TagDataService } from '../../../services/data_class/tag-data.service';
import { ImageDataService } from '../../../services/data_class/image-data.service';
import { Card, Tag, Image } from '../../../models/card.model';

@Component({
    selector: 'app-create-card',
    templateUrl: './create-card.component.html',
    styleUrls: ['./create-card.component.scss'],
    standalone: false
})
export class CreateCardComponent implements OnInit {
  cardForm!: FormGroup;
  loading = false;
  submitted = false;
  errorMessage = '';
  successMessage = '';
  availableTags: Tag[] = [];
  availableImages: Image[] = [];
  isEditMode = false;
  editingCardId: number | null = null;
  pageTitle = 'Ajouter une nouvelle Card';

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly cardDataService: CardDataService,
    private readonly tagDataService: TagDataService,
    private readonly imageDataService: ImageDataService,
    private readonly router: Router,
    private readonly route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.loadTags();
    this.loadImages();
    
    // Vérifier si on est en mode édition
    this.route.params.subscribe(params => {
      const id = params['id'];
      if (id) {
        this.isEditMode = true;
        this.editingCardId = id;
        this.pageTitle = 'Éditer une Card';
        this.loadCardForEditing(id);
      }
    });
  }

  initForm(): void {
    this.cardForm = this.formBuilder.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      description: [''],
      pictureType: ['', Validators.required],
      pictureValue: ['', Validators.required],
      tags: this.formBuilder.array([])
    });
  }

  loadTags(): void {
    this.tagDataService.loadTags().subscribe({
      next: (tags) => {
        this.availableTags = tags;
      },
      error: (error) => {
        console.error('Erreur lors du chargement des tags:', error);
      }
    });
  }

  loadImages(): void {
    // Charger toutes les images disponibles
    this.imageDataService.loadImages().subscribe({
      next: (images) => {
        this.availableImages = images;
      },
      error: (error) => {
        console.error('Erreur lors du chargement des images:', error);
      }
    });
  }

  loadCardForEditing(id: number): void {
    this.loading = true;
    this.cardDataService.getCardById(id).subscribe({
      next: (card) => {
        // Remplir le formulaire avec les données de la card
        this.cardForm.patchValue({
          title: card.title,
          description: card.description || '',
          pictureType: card.picture?.type || '',
          pictureValue: card.picture?.value || ''
        });

        // Sélectionner les tags de la card
        if (card.tags && card.tags.length > 0) {
          card.tags.forEach(tag => {
            this.tagsFormArray.push(this.formBuilder.control(tag));
          });
        }

        this.loading = false;
        console.log('✅ Card chargée pour édition:', card);
      },
      error: (error) => {
        this.loading = false;
        this.errorMessage = 'Erreur lors du chargement de la card.';
        console.error('Erreur:', error);
      }
    });
  }

  get tagsFormArray(): FormArray {
    return this.cardForm.get('tags') as FormArray;
  }

  toggleTag(tag: Tag): void {
    const tagsArray = this.tagsFormArray;
    const index = tagsArray.value.findIndex((t: Tag) => t.id === tag.id);

    if (index === -1) {
      tagsArray.push(this.formBuilder.control(tag));
    } else {
      tagsArray.removeAt(index);
    }
  }

  isTagSelected(tag: Tag): boolean {
    return this.tagsFormArray.value.some((t: Tag) => t.id === tag.id);
  }

  onSubmit(): void {
    this.submitted = true;
    this.errorMessage = '';
    this.successMessage = '';

    if (this.cardForm.invalid) {
      this.errorMessage = 'Veuillez remplir tous les champs correctement.';
      return;
    }

    this.loading = true;

    const formValue = this.cardForm.value;
    const cardData: Card = {
      title: formValue.title,
      description: formValue.description,
      picture: {
        type: formValue.pictureType,
        value: formValue.pictureValue
      },
      tags: formValue.tags
    };

    if (this.isEditMode && this.editingCardId) {
      // Mode édition
      this.cardDataService.updateCard(this.editingCardId, cardData).subscribe({
        next: (response) => {
          this.loading = false;
          this.successMessage = 'Card modifiée avec succès!';
          setTimeout(() => {
            this.router.navigate(['/card', this.editingCardId]);
          }, 1500);
        },
        error: (error) => {
          this.loading = false;
          this.errorMessage = 'Erreur lors de la modification de la card. Veuillez réessayer.';
          console.error('Erreur:', error);
        }
      });
    } else {
      // Mode création
      this.cardDataService.createCard(cardData).subscribe({
        next: (response) => {
          this.loading = false;
          this.successMessage = 'Card créée avec succès!';
          setTimeout(() => {
            this.router.navigate(['/cards']);
          }, 1500);
        },
        error: (error) => {
          this.loading = false;
          this.errorMessage = 'Erreur lors de la création de la card. Veuillez réessayer.';
          console.error('Erreur:', error);
        }
      });
    }
  }

  resetForm(): void {
    this.cardForm.reset();
    this.submitted = false;
    this.tagsFormArray.clear();
  }

  onCancel(): void {
    this.router.navigate(['/cards']);
  }
}
