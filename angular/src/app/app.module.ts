import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuModule } from './modules/menu/menu.module';
import { HomeComponent } from './pages/home/home.component';
import { CardsComponent } from './pages/page_listing/cards/cards.component';
import { CardsListComponent } from './pages/page_listing/cards/cards-list.component';
import { PageContainerListingComponent } from './pages/page_listing/page-container-listing/page-container-listing.component';
import { CardDetailComponent } from './pages/page_detail/card-detail/card-detail.component';
import { CardDetailContentComponent } from './pages/page_detail/card-detail/card-detail-content.component';
import { TagDetailContentComponent } from './pages/page_detail/card-detail/tag-detail-content.component';
import { ImageDetailContentComponent } from './pages/page_detail/card-detail/image-detail-content.component';
import { DataApiDetailComponent } from './pages/page_detail/data-api-detail/data-api-detail.component';
import { TagDetailComponent } from './pages/page_detail/tag-detail/tag-detail.component';
import { TagsComponent } from './pages/page_listing/tags/tags.component';
import { TagsListComponent } from './pages/page_listing/tags/tags-list.component';
import { CreateCardComponent } from './pages/page_edit/create-card/create-card.component';
import { CreateTagComponent } from './pages/page_edit/create-tag/create-tag.component';
import { ImagesComponent } from './pages/page_listing/images/images.component';
import { ImagesListComponent } from './pages/page_listing/images/images-list.component';
import { UploadImageComponent } from './pages/page_edit/upload-image/upload-image.component';
import { ImageDetailComponent } from './pages/page_detail/image-detail/image-detail.component';
import { PageSettingsComponent } from './pages/page_settings/page-settings.component';
import { CorsInterceptor } from './interceptors/cors.interceptor';

@NgModule({ declarations: [
        AppComponent,
        HomeComponent,
        CardsComponent,
        CardsListComponent,
        PageContainerListingComponent,
        CardDetailComponent,
        CardDetailContentComponent,
        TagDetailContentComponent,
        ImageDetailContentComponent,
        DataApiDetailComponent,
        TagDetailComponent,
        TagsComponent,
        TagsListComponent,
        CreateCardComponent,
        CreateTagComponent,
        ImagesComponent,
        ImagesListComponent,
        UploadImageComponent,
        ImageDetailComponent,
        PageSettingsComponent
    ],
    bootstrap: [AppComponent], imports: [BrowserModule,
        BrowserAnimationsModule,
        ReactiveFormsModule,
        MenuModule,
        AppRoutingModule], providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: CorsInterceptor,
            multi: true
        },
        provideHttpClient(withInterceptorsFromDi())
    ] })
export class AppModule { }
