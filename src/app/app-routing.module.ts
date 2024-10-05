import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundPageComponent } from './home/not-found-page/not-found-page.component';
import { FrontPageComponent } from './front-page/front-page.component';

const routes: Routes = [
  {
    path: '',
    component: FrontPageComponent,
    pathMatch: 'full',
  },
  {
    path: 'about',
    loadChildren: () => import('./home/home.module').then((M) => M.HomeModule),
  },
  {
    path: 'shop',
    loadChildren: () => import('./shop/shop.module').then((M) => M.ShopModule),
  },
  { path: '**', component: NotFoundPageComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'enabled',
      anchorScrolling: 'enabled',
      scrollOffset: [0, 64],
      initialNavigation: 'enabledBlocking',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
