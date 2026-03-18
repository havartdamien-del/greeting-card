import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { CardsComponent } from './pages/page_listing/cards/cards.component';
import { CardDetailComponent } from './pages/page_detail/card-detail/card-detail.component';
import { TagsComponent } from './pages/page_listing/tags/tags.component';
import { CreateCardComponent } from './pages/page_edit/create-card/create-card.component';
import { ImagesComponent } from './pages/page_listing/images/images.component';
import { UploadImageComponent } from './pages/page_edit/upload-image/upload-image.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'cards', component: CardsComponent },
  { path: 'card/:id', component: CardDetailComponent },
  { path: 'create-card', component: CreateCardComponent },
  { path: 'create-card/:id', component: CreateCardComponent },
  { path: 'tags', component: TagsComponent },
  { path: 'images', component: ImagesComponent },
  { path: 'upload-image', component: UploadImageComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
