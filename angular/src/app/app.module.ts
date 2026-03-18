import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuModule } from './modules/menu/menu.module';
import { HomeComponent } from './pages/home/home.component';
import { CardsComponent } from './pages/page_listing/cards/cards.component';
import { CardDetailComponent } from './pages/page_detail/card-detail/card-detail.component';
import { TagsComponent } from './pages/page_listing/tags/tags.component';
import { CreateCardComponent } from './pages/page_edit/create-card/create-card.component';
import { ImagesComponent } from './pages/page_listing/images/images.component';
import { UploadImageComponent } from './pages/page_edit/upload-image/upload-image.component';
import { CorsInterceptor } from './interceptors/cors.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CardsComponent,
    CardDetailComponent,
    TagsComponent,
    CreateCardComponent,
    ImagesComponent,
    UploadImageComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    MenuModule,
    AppRoutingModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: CorsInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
