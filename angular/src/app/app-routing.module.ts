import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { CardsComponent } from './pages/page_listing/cards/cards.component';
import { CardDetailComponent } from './pages/page_detail/card-detail/card-detail.component';
import { TagsComponent } from './pages/page_listing/tags/tags.component';
import { TagDetailComponent } from './pages/page_detail/tag-detail/tag-detail.component';
import { CreateCardComponent } from './pages/page_edit/create-card/create-card.component';
import { CreateTagComponent } from './pages/page_edit/create-tag/create-tag.component';
import { ImagesComponent } from './pages/page_listing/images/images.component';
import { UploadImageComponent } from './pages/page_edit/upload-image/upload-image.component';
import { PageSettingsComponent } from './pages/page_settings/page-settings.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'cards', component: CardsComponent },
  { path: 'card/:id', component: CardDetailComponent },
  { path: 'create-card', component: CreateCardComponent },
  { path: 'create-card/:id', component: CreateCardComponent },
  { path: 'tags', component: TagsComponent },
  { path: 'tag/:id', component: TagDetailComponent },
  { path: 'create-tag', component: CreateTagComponent },
  { path: 'create-tag/:id', component: CreateTagComponent },
  { path: 'images', component: ImagesComponent },
  { path: 'upload-image', component: UploadImageComponent },
  { path: 'settings', component: PageSettingsComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
