import { Component, OnInit } from '@angular/core';

import { Title, Meta } from '@angular/platform-browser';

import { CanonicalService } from 'src/app/services/canonical.service';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Location } from '@angular/common';
import { NgxSpinnerService } from 'ngx-spinner';

import { SharedService } from 'src/app/services/shared.service';

import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-share-cart',
  templateUrl: './share-cart.component.html',
  styleUrls: ['./share-cart.component.css'],
})
export class ShareCartComponent implements OnInit {
  List: any = [];
  slug: string | null = null;
  button_text: string = 'Click to copy My Cart Link To Share';

  constructor(
    private service: SharedService,
    private route: ActivatedRoute,
    private canonicalService: CanonicalService,
    private title: Title,
    private metaTagService: Meta,
    private location: Location,
    private spinner: NgxSpinnerService,
    private router: Router,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit() {
    this.title.setTitle('Dubotech Shared Cart');

    const currentUrl = this.location.path(true);
    const completeUrl = currentUrl;
    this.canonicalService.setCanonicalURL();

    this.metaTagService.updateTag({
      property: 'og:url',
      content: completeUrl,
    });

    this.route.paramMap.subscribe((params) => {
      this.slug = params.get('slug');
      if (this.slug) {
        this.fetchCartDetails(this.slug);
      }
    });
  }

  fetchCartDetails(slug: string) {
    this.spinner.show();
    this.service.getCartById(slug).subscribe({
      next: (data) => {
        this.spinner.hide();
        this.List = data;
      },
      error: (error) => {
        this.spinner.hide();
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
