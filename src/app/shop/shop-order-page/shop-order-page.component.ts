import { Component, OnInit } from '@angular/core';

import { Title, Meta } from '@angular/platform-browser';

import { CanonicalService } from 'src/app/services/canonical.service';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Location } from '@angular/common';
import { NgxSpinnerService } from 'ngx-spinner';

import { SharedService } from 'src/app/services/shared.service';

import { COUNTRIES } from './country-list';

import {
  FormGroup,
  FormBuilder,
  Validators,
  AbstractControl,
} from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-shop-order-page',
  templateUrl: './shop-order-page.component.html',
  styleUrls: ['./shop-order-page.component.css'],
})
export class ShopOrderPageComponent implements OnInit {
  List: any = [];
  addForm!: FormGroup;
  countries = COUNTRIES;

  constructor(
    private service: SharedService,
    private route: ActivatedRoute,
    private canonicalService: CanonicalService,
    private title: Title,
    private metaTagService: Meta,
    private location: Location,
    private spinner: NgxSpinnerService,
    private router: Router,
    private formbuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.addForm = this.formbuilder.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      company: [''],
      email: ['', Validators.required],
      phone: ['', Validators.required],
      address: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      zipcode: [''],
      country: ['', Validators.required],
    });

    this.title.setTitle('Dubotech Checkout');

    const currentUrl = this.location.path(true);
    const completeUrl = currentUrl;
    this.canonicalService.setCanonicalURL();

    this.metaTagService.updateTag({
      property: 'og:url',
      content: completeUrl,
    });

    this.refreshList();
  }

  refreshList() {
    this.spinner.show();
    this.service.getUserCart().subscribe((data) => {
      this.List = data;
      this.spinner.hide();
    });
  }

  onSubmit() {
    if (this.addForm.valid) {
      this.spinner.show();

      const formData = new FormData();
      formData.append('first_name', this.addForm.value.first_name);
      formData.append('last_name', this.addForm.value.last_name);
      formData.append('company', this.addForm.value.company);
      formData.append('email', this.addForm.value.email);
      formData.append('phone', this.addForm.value.phone);
      formData.append('address', this.addForm.value.address);
      formData.append('city', this.addForm.value.city);
      formData.append('state', this.addForm.value.state);
      formData.append('zipcode', this.addForm.value.zipcode);
      formData.append('country', this.addForm.value.country);

      this.service.placeOrder(formData).subscribe((data) => {
        this.spinner.hide();
        Swal.fire({
          title: 'Order Placed',
          text: 'Your order has been placed successfully and You will receive an email with order details and payment instructions.',
          icon: 'success',
          confirmButtonText: 'OK',
        }).then(() => {
          this.router.navigate(['/shop/order-placed', data['order_slug']]);
        });
      });
    }
  }
}
