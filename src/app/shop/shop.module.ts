import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShopRoutingModule } from './shop-routing.module';
import { ShopHomePageComponent } from './shop-home-page/shop-home-page.component';
import { ShopCategoryPageComponent } from './shop-category-page/shop-category-page.component';
import { ShopProductDetailsPageComponent } from './shop-product-details-page/shop-product-details-page.component';
import { ShopCartPageComponent } from './shop-cart-page/shop-cart-page.component';
import { ShopOrderPageComponent } from './shop-order-page/shop-order-page.component';
import { ShopOrderSuccessPageComponent } from './shop-order-success-page/shop-order-success-page.component';
import { SharedModule } from '../shared/shared.module';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { NgxSpinnerModule } from 'ngx-spinner';
import { MatDividerModule } from '@angular/material/divider';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ProductCardComponent } from './shop-home-page/product-card/product-card.component';
import { QuickviewComponent } from './shop-home-page/quickview/quickview.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { ShareCartComponent } from './shop-cart-page/share-cart/share-cart.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { AddonProductCardComponent } from './shop-home-page/addon-product-card/addon-product-card.component';
@NgModule({
  declarations: [
    ShopHomePageComponent,
    ShopCategoryPageComponent,
    ShopProductDetailsPageComponent,
    ShopCartPageComponent,
    ShopOrderPageComponent,
    ShopOrderSuccessPageComponent,
    ProductCardComponent,
    QuickviewComponent,
    ShareCartComponent,
    AddonProductCardComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    ShopRoutingModule,
    LazyLoadImageModule,
    NgxSpinnerModule,
    MatDividerModule,
    MatTooltipModule,
    MatExpansionModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
  ],
})
export class ShopModule {}
