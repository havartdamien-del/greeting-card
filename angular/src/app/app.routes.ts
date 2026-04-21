import { Routes } from '@angular/router';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';

// Page Components
import { HomeComponent } from './pages/home/home.component';
import { CardsComponent } from './pages/page_listing/cards/cards.component';
import { CardDetailComponent } from './pages/page_detail/card-detail/card-detail.component';
import { TagsComponent } from './pages/page_listing/tags/tags.component';
import { TagDetailComponent } from './pages/page_detail/tag-detail/tag-detail.component';
import { CreateCardComponent } from './pages/page_edit/create-card/create-card.component';
import { CreateTagComponent } from './pages/page_edit/create-tag/create-tag.component';
import { ImagesComponent } from './pages/page_listing/images/images.component';
import { ImageDetailComponent } from './pages/page_detail/image-detail/image-detail.component';
import { UploadImageComponent } from './pages/page_edit/upload-image/upload-image.component';
import { PageSettingsComponent } from './pages/page_settings/page-settings.component';
import { LoginComponent } from './modules/auth/login/login.component';

// Guards
import { AuthGuard } from './services/auth/auth.guard';

// Interceptors
import { authInterceptor } from './interceptors/auth.interceptor';
import { corsInterceptor } from './interceptors/cors.interceptor';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'cards', component: CardsComponent },
  { path: 'card/:id', component: CardDetailComponent },
  { path: 'create-card', component: CreateCardComponent, canActivate: [AuthGuard] },
  { path: 'create-card/:id', component: CreateCardComponent, canActivate: [AuthGuard] },
  { path: 'tags', component: TagsComponent, canActivate: [AuthGuard] },
  { path: 'tag/:id', component: TagDetailComponent },
  { path: 'create-tag', component: CreateTagComponent },
  { path: 'create-tag/:id', component: CreateTagComponent },
  { path: 'images', component: ImagesComponent },
  { path: 'image/:id', component: ImageDetailComponent },
  { path: 'upload-image', component: UploadImageComponent, canActivate: [AuthGuard] },
  { path: 'settings', component: PageSettingsComponent },
  { path: '**', redirectTo: '' }
];

/**
 * Application-wide providers configuration
 * Used with bootstrapApplication in main.ts
 */
export const appProviders = [
  provideRouter(routes),
  provideHttpClient(
    withInterceptors([authInterceptor, corsInterceptor])
  ),
  provideAnimations(),
  AuthGuard
];
