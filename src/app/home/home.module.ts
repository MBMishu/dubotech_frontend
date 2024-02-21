import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';

import { HomePageComponent } from './home-page/home-page.component';

import { AboutPageComponent } from './about-page/about-page.component';
import { RoverPageComponent } from './rover-page/rover-page.component';
import { InspectionPageComponent } from './inspection-page/inspection-page.component';
import { ContactPageComponent } from './contact-page/contact-page.component';
import { BlogPageComponent } from './blog-page/blog-page.component';
import { MediaPageComponent } from './media-page/media-page.component';
import { PartnersComponent } from './partners/partners.component';
import { NotFoundPageComponent } from './not-found-page/not-found-page.component';
import { SharedModule } from '../shared/shared.module';

import { NgxSpinnerModule } from 'ngx-spinner';
import { LazyLoadImageModule } from 'ng-lazyload-image';

import { MatDividerModule } from '@angular/material/divider';
import { MatTooltipModule } from '@angular/material/tooltip';
import { TourismPageComponent } from './tourism-page/tourism-page.component';
import { BlogDetailsPageComponent } from './blog-details-page/blog-details-page.component';

@NgModule({
  declarations: [
    HomePageComponent,

    AboutPageComponent,
    RoverPageComponent,
    InspectionPageComponent,
    ContactPageComponent,
    BlogPageComponent,
    MediaPageComponent,
    PartnersComponent,
    NotFoundPageComponent,
    TourismPageComponent,
    BlogDetailsPageComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    HomeRoutingModule,
    LazyLoadImageModule,
    NgxSpinnerModule,
    MatDividerModule,
    MatTooltipModule,
  ],
})
export class HomeModule {}
