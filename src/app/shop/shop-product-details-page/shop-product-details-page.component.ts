import { Component, OnInit } from '@angular/core';

import { Title, Meta } from '@angular/platform-browser';

import { CanonicalService } from 'src/app/services/canonical.service';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Location } from '@angular/common';
import { NgxSpinnerService } from 'ngx-spinner';

import { SharedService } from 'src/app/services/shared.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
declare var $: any;
@Component({
  selector: 'app-shop-product-details-page',
  templateUrl: './shop-product-details-page.component.html',
  styleUrls: ['./shop-product-details-page.component.css'],
})
export class ShopProductDetailsPageComponent implements OnInit {
  List: any = [];
  Related_List: any = [];

  slug: string | null = null;
  productDescription: SafeHtml = '';
  content: SafeHtml = '';
  technical_details: SafeHtml = '';
  guide: SafeHtml = '';

  quantity: number = 0;
  success_message: string = '';
  error_message: string = '';
  Media: string;

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
    this.Media = this.service.getMediaUrl();
    // Get the slug from the route parameters
    this.route.paramMap.subscribe((params) => {
      this.slug = params.get('slug');
      if (this.slug) {
        this.quantity = 1;
        this.success_message = '';
        this.error_message = '';
        this.fetchProductDetails(this.slug);
      }
    });
  }

  private initVenobox() {
    $(document).ready(() => {
      $('.venobox').venobox();
      console.log('Venobox initialized');
    });
  }

  fetchProductDetails(slug: string) {
    this.spinner.show();
    this.service.getProductsById(slug).subscribe((data) => {
      // Handle the product data
      this.List = data;
      console.log(this.List['child_products']);

      // seo
      this.title.setTitle(data['name']);
      this.metaTagService.updateTag({
        name: 'description',
        content: data['about_product'],
      });
      this.metaTagService.updateTag({
        property: 'og:title',
        content: data['name'],
      });
      this.metaTagService.updateTag({
        property: 'og:description',
        content: data['about_product'],
      });

      this.metaTagService.updateTag({
        property: 'og:image',
        content: data['image'],
      });

      this.productDescription = this.sanitizer.bypassSecurityTrustHtml(
        this.List['product_description']
      );
      this.content = this.sanitizer.bypassSecurityTrustHtml(
        this.List['content']
      );
      this.technical_details = this.sanitizer.bypassSecurityTrustHtml(
        this.List['technical_details']
      );
      this.guide = this.sanitizer.bypassSecurityTrustHtml(this.List['guide']);

      // this.refreshList(data['category']['slug']);
      this.refreshList(data['category'].slug);
      this.spinner.hide();
      this.initVenobox();
    });
  }
  refreshList(arg0: any) {
    this.spinner.show();
    let combinedList: any[] = [];
    this.service.getCategoryProductsById(arg0).subscribe((data) => {
      const filteredProductsByCategory = data.filter(
        (x) => x.slug != this.slug && x['category']?.slug === arg0
      );
      combinedList = combinedList.concat(filteredProductsByCategory);

      // Remove duplicates if necessary (based on a unique property, e.g., id)
      this.Related_List = Array.from(
        new Set(combinedList.map((item) => item.id))
      ).map((id) => {
        return combinedList.find((item) => item.id === id);
      });
    });
    this.spinner.hide();
  }

  addToCart(arg0: any) {
    const formData = new FormData();
    formData.append('quantity', this.quantity.toString());

    this.service.addToCart(arg0, formData).subscribe({
      next: (data) => {
        this.error_message = '';
        this.success_message = data['message'];
      },
      error: (error) => {
        this.success_message = '';
        this.error_message = error.error.message;
      },
    });
  }
}
