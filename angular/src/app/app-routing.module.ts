import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { CardsComponent } from './pages/cards/cards.component';
import { CardDetailComponent } from './pages/card-detail/card-detail.component';
import { TagsComponent } from './pages/tags/tags.component';
import { CreateCardComponent } from './pages/create-card/create-card.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'cards', component: CardsComponent },
  { path: 'card/:id', component: CardDetailComponent },
  { path: 'create-card', component: CreateCardComponent },
  { path: 'create-card/:id', component: CreateCardComponent },
  { path: 'tags', component: TagsComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
