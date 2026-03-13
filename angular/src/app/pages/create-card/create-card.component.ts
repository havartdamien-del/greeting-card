import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { Router } from '@angular/router';
import { ConnectionApiService } from '../../services/connection-api.service';
import { Card, Tag } from '../../models/card.model';

@Component({
  selector: 'app-create-card',
  templateUrl: './create-card.component.html',
  styleUrls: ['./create-card.component.scss']
})
export class CreateCardComponent implements OnInit {
  cardForm!: FormGroup;
  loading = false;
  submitted = false;
  errorMessage = '';
  successMessage = '';
  availableTags: Tag[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private apiService: ConnectionApiService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.loadTags();
  }

  initForm(): void {
    this.cardForm = this.formBuilder.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required, Validators.minLength(10)]],
      pictureType: ['', Validators.required],
      pictureValue: ['', Validators.required],
      tags: this.formBuilder.array([])
    });
  }

  loadTags(): void {
    this.apiService.loadTags().subscribe({
      next: (tags) => {
        this.availableTags = tags;
      },
      error: (error) => {
        console.error('Erreur lors du chargement des tags:', error);
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
    const newCard: Card = {
      title: formValue.title,
      description: formValue.description,
      picture: {
        type: formValue.pictureType,
        value: formValue.pictureValue
      },
      tags: formValue.tags
    };

    this.apiService.createCard(newCard).subscribe({
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

  resetForm(): void {
    this.cardForm.reset();
    this.submitted = false;
    this.tagsFormArray.clear();
  }

  onCancel(): void {
    this.router.navigate(['/cards']);
  }
}
