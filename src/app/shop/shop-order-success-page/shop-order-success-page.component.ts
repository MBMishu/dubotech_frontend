import { Component, OnInit } from '@angular/core';

import { Title, Meta } from '@angular/platform-browser';

import { CanonicalService } from 'src/app/services/canonical.service';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Location } from '@angular/common';
import { NgxSpinnerService } from 'ngx-spinner';

import { SharedService } from 'src/app/services/shared.service';

import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-shop-order-success-page',
  templateUrl: './shop-order-success-page.component.html',
  styleUrls: ['./shop-order-success-page.component.css'],
})
export class ShopOrderSuccessPageComponent implements OnInit {
  List: any = [];
  slug: string | null = null;

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
    this.title.setTitle('Order Success');

    const currentUrl = this.location.path(true);
    const completeUrl = currentUrl;
    this.canonicalService.setCanonicalURL();

    this.metaTagService.updateTag({
      property: 'og:url',
      content: completeUrl,
    });

    // Get the slug from the route parameters
    this.route.paramMap.subscribe((params) => {
      this.slug = params.get('slug');
      if (this.slug) {
        this.fetchDetails(this.slug);
      }
    });
  }
  fetchDetails(slug: string) {
    this.spinner.show();
    this.service.getOrderById(slug).subscribe((data) => {
      this.List = data;

      this.spinner.hide();
    });
  }
}
