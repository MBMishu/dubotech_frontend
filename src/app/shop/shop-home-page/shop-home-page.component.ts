import { Component, OnInit } from '@angular/core';

import { Title, Meta } from '@angular/platform-browser';

import { CanonicalService } from 'src/app/services/canonical.service';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Location } from '@angular/common';
import { NgxSpinnerService } from 'ngx-spinner';

import { SharedService } from 'src/app/services/shared.service';
import { FlowbiteService } from 'src/app/services/flowbite.service';
import { MatSelectChange } from '@angular/material/select';
import { initFlowbite } from 'flowbite';

@Component({
  selector: 'app-shop-home-page',
  templateUrl: './shop-home-page.component.html',
  styleUrls: ['./shop-home-page.component.css'],
})
export class ShopHomePageComponent implements OnInit {
  AUV_List: any[] = [];
  ROV_List: any[] = [];
  Thruster_List: any[] = [];
  camera_List: any[] = [];
  lights_List: any[] = [];
  grippers_List: any[] = [];
  sonars_List: any[] = [];
  sensors_List: any[] = [];
  communication_List: any[] = [];
  enclosures_List: any[] = [];
  cables_List: any[] = [];

  category_list: any[] = [];
  filteredProductList: any[] = [];

  search_value: string = '';

  constructor(
    private service: SharedService,
    private route: ActivatedRoute,
    private canonicalService: CanonicalService,
    private title: Title,
    private metaTagService: Meta,
    private location: Location,
    private spinner: NgxSpinnerService,
    private flowbiteService: FlowbiteService,
    private router: Router
  ) {}

  ngOnInit() {
    this.flowbiteService.loadFlowbite((flowbite) => {
      // console.log('Flowbite loaded', flowbite);
      initFlowbite();
    });
    this.refreshList();

    this.title.setTitle('Dubotech Store');

    const currentUrl = this.location.path(true);
    const completeUrl = currentUrl;
    this.canonicalService.setCanonicalURL();

    this.metaTagService.updateTag({
      property: 'og:url',
      content: completeUrl,
    });
  }

  getsearchValue() {
    this.spinner.show();
    const searchTerm = this.search_value.replace(/\s+/g, '').toLowerCase();

    // Check if searchTerm is empty after removing spaces
    if (!searchTerm) {
      this.filteredProductList = [];
      this.spinner.hide();
      return; // Exit early if the search term is empty
    }

    this.service.getAllProducts().subscribe({
      next: (data) => {
        this.spinner.hide();
        // Filter products based on partial match with name, category, SKU, etc.
        this.filteredProductList = data.filter((data) => {
          // Remove spaces from product properties before comparison
          const name = data.name.replace(/\s+/g, '').toLowerCase();
          const category = data.category?.slug
            .replace(/\s+/g, '')
            .toLowerCase();
          const sku = data.sku.replace(/\s+/g, '').toLowerCase();

          return (
            name.includes(searchTerm) ||
            category.includes(searchTerm) ||
            sku.includes(searchTerm)
          );
        });
      },
      error: (error) => {
        this.spinner.hide();
      },
    });
  }
  onCategoryChange(event: MatSelectChange) {
    this.spinner.show();
    const selectedCategory = event.value;
    this.search_value = selectedCategory;
    if (selectedCategory == 'all') {
      this.filteredProductList = [];
      this.spinner.hide();
      return;
    }

    this.service.getCategoryProductsById(selectedCategory).subscribe({
      next: (data) => {
        this.spinner.hide();
        this.filteredProductList = data;
      },
      error: (error) => {
        this.spinner.hide();
      },
    });
  }
  refreshList() {
    this.spinner.show();
    this.service.getCategory().subscribe((data) => {
      this.category_list = data;
    });

    this.service.getCategoryProductsById('auv').subscribe((data) => {
      this.AUV_List = data;
    });

    this.service.getCategoryProductsById('rov').subscribe((data) => {
      this.ROV_List = data;
      this.spinner.hide();
    });
    this.service.getCategoryProductsById('thrusters').subscribe((data) => {
      this.Thruster_List = data;
    });
    this.service.getCategoryProductsById('cameras').subscribe((data) => {
      this.camera_List = data;
    });
    this.service.getCategoryProductsById('lights').subscribe((data) => {
      this.lights_List = data;
    });
    this.service.getCategoryProductsById('sonars').subscribe((data) => {
      this.sonars_List = data;
    });
    this.service.getCategoryProductsById('sensors').subscribe((data) => {
      this.sensors_List = data;
    });
    this.service
      .getCategoryProductsById('communication-control-and-power')
      .subscribe((data) => {
        this.communication_List = data;
      });
    this.service
      .getCategoryProductsById('enclosures-and-buoyancy')
      .subscribe((data) => {
        this.enclosures_List = data;
      });
    this.service
      .getCategoryProductsById('cables-penetrators-tethers-and-connectors')
      .subscribe((data) => {
        this.cables_List = data;
      });
  }
}
