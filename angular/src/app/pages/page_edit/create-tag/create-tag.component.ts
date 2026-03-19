import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { TagDataService } from '../../../services/data_class/tag-data.service';
import { Tag } from '../../../models/card.model';

@Component({
  selector: 'app-create-tag',
  templateUrl: './create-tag.component.html',
  styleUrls: ['./create-tag.component.scss']
})
export class CreateTagComponent implements OnInit {
  tagForm!: FormGroup;
  loading = false;
  submitted = false;
  errorMessage = '';
  successMessage = '';
  isEditMode = false;
  editingTagId: number | null = null;
  pageTitle = 'Ajouter un nouveau Tag';

  constructor(
    private formBuilder: FormBuilder,
    private tagDataService: TagDataService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.initForm();
    
    // Vérifier si on est en mode édition
    this.route.params.subscribe(params => {
      const id = params['id'];
      if (id) {
        this.isEditMode = true;
        this.editingTagId = id;
        this.pageTitle = 'Éditer un Tag';
        this.loadTagForEditing(id);
      }
    });
  }

  initForm(): void {
    this.tagForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(2)]]
    });
  }

  loadTagForEditing(id: number): void {
    this.loading = true;
    this.tagDataService.getTagById(id).subscribe({
      next: (tag) => {
        // Remplir le formulaire avec les données du tag
        this.tagForm.patchValue({
          name: tag.name
        });

        this.loading = false;
        console.log('✅ Tag chargé pour édition:', tag);
      },
      error: (error) => {
        this.loading = false;
        this.errorMessage = 'Erreur lors du chargement du tag.';
        console.error('Erreur:', error);
      }
    });
  }

  onSubmit(): void {
    this.submitted = true;
    this.errorMessage = '';
    this.successMessage = '';

    if (this.tagForm.invalid) {
      this.errorMessage = 'Veuillez remplir tous les champs correctement.';
      return;
    }

    this.loading = true;

    const formValue = this.tagForm.value;
    const tagData: Tag = {
      name: formValue.name
    };

    if (this.isEditMode && this.editingTagId) {
      // Mode édition
      this.tagDataService.updateTag(this.editingTagId, tagData).subscribe({
        next: (response) => {
          this.loading = false;
          this.successMessage = 'Tag modifié avec succès!';
          setTimeout(() => {
            this.router.navigate(['/tag', this.editingTagId]);
          }, 1500);
        },
        error: (error) => {
          this.loading = false;
          this.errorMessage = 'Erreur lors de la modification du tag. Veuillez réessayer.';
          console.error('Erreur:', error);
        }
      });
    } else {
      // Mode création
      this.tagDataService.createTag(tagData).subscribe({
        next: (response) => {
          this.loading = false;
          this.successMessage = 'Tag créé avec succès!';
          setTimeout(() => {
            this.router.navigate(['/tags']);
          }, 1500);
        },
        error: (error) => {
          this.loading = false;
          this.errorMessage = 'Erreur lors de la création du tag. Veuillez réessayer.';
          console.error('Erreur:', error);
        }
      });
    }
  }

  resetForm(): void {
    this.tagForm.reset();
    this.submitted = false;
  }

  onCancel(): void {
    this.router.navigate(['/tags']);
  }
}
