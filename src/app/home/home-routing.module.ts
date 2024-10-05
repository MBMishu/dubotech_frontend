import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoverPageComponent } from './rover-page/rover-page.component';
import { ContactPageComponent } from './contact-page/contact-page.component';
import { AboutPageComponent } from './about-page/about-page.component';
import { InspectionPageComponent } from './inspection-page/inspection-page.component';
import { TourismPageComponent } from './tourism-page/tourism-page.component';
import { BlogPageComponent } from './blog-page/blog-page.component';
import { BlogDetailsPageComponent } from './blog-details-page/blog-details-page.component';
import { NewsPageComponent } from './news-page/news-page.component';

const routes: Routes = [
  { path: '', component: AboutPageComponent, pathMatch: 'full' },
  { path: 'auv', component: RoverPageComponent, pathMatch: 'full' },
  { path: 'contact-us', component: ContactPageComponent, pathMatch: 'full' },
  { path: 'about-us', component: AboutPageComponent, pathMatch: 'full' },
  { path: 'news', component: NewsPageComponent, pathMatch: 'full' },
  {
    path: 'inspection',
    component: InspectionPageComponent,
    pathMatch: 'full',
  },
  {
    path: 'tourism',
    component: TourismPageComponent,
    pathMatch: 'full',
  },
  {
    path: 'blog',
    component: BlogPageComponent,
    pathMatch: 'full',
  },
  {
    path: 'blog_details/:slug',
    component: BlogDetailsPageComponent,
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
