import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShopHomePageComponent } from './shop-home-page/shop-home-page.component';
import { ShopCategoryPageComponent } from './shop-category-page/shop-category-page.component';
import { ShopProductDetailsPageComponent } from './shop-product-details-page/shop-product-details-page.component';
import { ShopCartPageComponent } from './shop-cart-page/shop-cart-page.component';
import { ShopOrderPageComponent } from './shop-order-page/shop-order-page.component';
import { ShopOrderSuccessPageComponent } from './shop-order-success-page/shop-order-success-page.component';
import { ShareCartComponent } from './shop-cart-page/share-cart/share-cart.component';

const routes: Routes = [
  { path: '', component: ShopHomePageComponent, pathMatch: 'full' },
  {
    path: 'category/:slug',
    component: ShopCategoryPageComponent,
    pathMatch: 'full',
  },
  {
    path: 'product/:slug',
    component: ShopProductDetailsPageComponent,
    pathMatch: 'full',
  },
  { path: 'cart', component: ShopCartPageComponent, pathMatch: 'full' },
  { path: 'cart/:slug', component: ShareCartComponent, pathMatch: 'full' },
  { path: 'order', component: ShopOrderPageComponent, pathMatch: 'full' },
  {
    path: 'order-placed/:slug',
    component: ShopOrderSuccessPageComponent,
    pathMatch: 'full',
  },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ShopRoutingModule {}
