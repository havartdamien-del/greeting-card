import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { CardsComponent } from './pages/cards/cards.component';
import { TagsComponent } from './pages/tags/tags.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'cards', component: CardsComponent },
  { path: 'tags', component: TagsComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
