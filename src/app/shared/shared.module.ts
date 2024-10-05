import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { RouterModule } from '@angular/router';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { NgxSpinnerModule } from 'ngx-spinner';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CarouselModule } from 'ngx-owl-carousel-o';

import { MatDividerModule } from '@angular/material/divider';
import { InspectionBannerComponent } from './inspection-banner/inspection-banner.component';
import { TourismBannerComponent } from './tourism-banner/tourism-banner.component';
import { SponsorComponent } from './sponsor/sponsor.component';
import { WhyChooseUsComponent } from './why-choose-us/why-choose-us.component';
import { ContactComponent } from './contact/contact.component';

import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTooltipModule } from '@angular/material/tooltip';
import { NgxParallaxModule } from '@yoozly/ngx-parallax';
import { TunaOverviewComponent } from './tuna-overview/tuna-overview.component';
import { OctopusOverviewComponent } from './octopus-overview/octopus-overview.component';
import { RoverOverviewComponent } from './rover-overview/rover-overview.component';
import { MatTabsModule } from '@angular/material/tabs';

@NgModule({
  declarations: [
    NavbarComponent,
    FooterComponent,
    InspectionBannerComponent,
    TourismBannerComponent,
    SponsorComponent,
    WhyChooseUsComponent,
    ContactComponent,
    TunaOverviewComponent,
    OctopusOverviewComponent,
    RoverOverviewComponent,
  ],
  imports: [
    CommonModule,
    CarouselModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    LazyLoadImageModule,
    NgxSpinnerModule,
    MatDividerModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTooltipModule,
    NgxParallaxModule,
    MatTabsModule,
  ],
  exports: [
    NavbarComponent,
    FooterComponent,
    TourismBannerComponent,
    InspectionBannerComponent,
    SponsorComponent,
    WhyChooseUsComponent,
    ContactComponent,
    TunaOverviewComponent,
    OctopusOverviewComponent,
    RoverOverviewComponent,
  ],
})
export class SharedModule {}
