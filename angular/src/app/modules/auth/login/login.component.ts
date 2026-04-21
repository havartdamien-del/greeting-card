import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth/auth.service';
import { AuthGuard } from '../../../services/auth/auth.guard';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  imports: [ReactiveFormsModule, CommonModule],
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  isLoading = false;
  errorMessage = '';

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly authService: AuthService,
    private readonly authGuard: AuthGuard,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  /**
   * Initialise le formulaire réactif avec validation
   */
  private initializeForm(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(1)]]
    });
  }

  /**
   * Soumet le formulaire de connexion
   */
  onSubmit(): void {
    if (this.loginForm.invalid) {
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    const { email, password } = this.loginForm.value;

    this.authService.login(email, password).subscribe({
      next: () =>  {
        this.isLoading = false;
        // Récupère l'URL de redirection ou redirige vers la page d'accueil
        const redirectUrl = this.authGuard.getRedirectUrl();
        this.authGuard.clearRedirectUrl();

        if (redirectUrl && redirectUrl !== '/login') {
          this.router.navigateByUrl(redirectUrl);
        } else {
          this.router.navigate(['/']);
        }
      },
      error: (error) => {
        this.isLoading = false;
        // Affiche un message d'erreur
        if (error.status === 401) {
          this.errorMessage = 'Email ou mot de passe incorrect';
        } else if (error.error?.message) {
          this.errorMessage = error.error.message;
        } else {
          this.errorMessage = 'Une erreur s\'est produite lors de la connexion';
        }
      }
    });
  }

  /**
   * Getter pour vérifier si le formulaire est invalide
   */
  get isFormInvalid(): boolean {
    return this.loginForm.invalid || this.isLoading;
  }
}
