import { Component, OnInit } from '@angular/core';

import { Title, Meta } from '@angular/platform-browser';

import { CanonicalService } from 'src/app/services/canonical.service';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Location } from '@angular/common';
import { NgxSpinnerService } from 'ngx-spinner';

import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-shop-cart-page',
  templateUrl: './shop-cart-page.component.html',
  styleUrls: ['./shop-cart-page.component.css'],
})
export class ShopCartPageComponent implements OnInit {
  List: any = [];
  quantity: number = 0;

  button_text: string = 'Click to copy My Cart Link To Share';

  constructor(
    private service: SharedService,
    private route: ActivatedRoute,
    private canonicalService: CanonicalService,
    private title: Title,
    private metaTagService: Meta,
    private location: Location,
    private spinner: NgxSpinnerService,
    private router: Router
  ) {}

  ngOnInit() {
    this.refreshList();
    this.title.setTitle('Dubotech Cart');

    const currentUrl = this.location.path(true);
    const completeUrl = currentUrl;
    this.canonicalService.setCanonicalURL();

    this.metaTagService.updateTag({
      property: 'og:url',
      content: completeUrl,
    });
  }

  // Method to handle quantity changes
  onQuantityChange(arg0: any, item: any) {
    this.spinner.show();
    const formData = new FormData();
    formData.append('quantity', item.quantity.toString());

    this.service.addToCart(arg0, formData).subscribe({
      next: (data) => {
        this.spinner.hide();
        this.refreshList();
      },
      error: (error) => {
        this.spinner.hide();
        this.refreshList();
      },
    });
  }
  refreshList() {
    this.spinner.show();
    this.service.getUserCart().subscribe((data) => {
      this.List = data;
      this.spinner.hide();
    });
  }

  removeCartItem(arg0: any) {
    this.spinner.show();
    this.service.removeCartItems(arg0).subscribe({
      next: (data) => {
        this.spinner.hide();
        this.refreshList();
      },
      error: (error) => {
        this.spinner.hide();
        this.refreshList();
      },
    });
  }

  shareCart(arg0: string) {
    const cartUrl = `${window.location.origin}/shop/cart/${arg0}`;
    navigator.clipboard
      .writeText(cartUrl)
      .then(() => {
        this.button_text = 'Copied My Cart Link!';
        setTimeout(() => {
          this.button_text = 'Click to copy My Cart Link To Share';
        }, 3000);
      })
      .catch((err) => {
        console.error('Could not copy text: ', err);
      });
  }
}
