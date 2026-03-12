import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuModule } from './modules/menu/menu.module';
import { HomeComponent } from './pages/home/home.component';
import { CardsComponent } from './pages/cards/cards.component';
import { TagsComponent } from './pages/tags/tags.component';
import { CorsInterceptor } from './interceptors/cors.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CardsComponent,
    TagsComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
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
