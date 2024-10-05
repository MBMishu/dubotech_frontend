import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { Title, Meta } from '@angular/platform-browser';

import { CanonicalService } from 'src/app/services/canonical.service';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Location } from '@angular/common';
import { NgxSpinnerService } from 'ngx-spinner';

import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-quickview',
  templateUrl: './quickview.component.html',
  styleUrls: ['./quickview.component.css'],
})
export class QuickviewComponent implements OnInit {
  @Input() item: any;
  @Output() messageEvent = new EventEmitter<string>();

  quantity: number = 0;
  button_text: string = 'Add to Cart';
  success_message: string = '';
  error_message: string = '';

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
    this.updateButtonText();
  }

  // Update button text based on quantity
  updateButtonText() {
    this.button_text = this.quantity > 1 ? 'Update Cart' : 'Add to Cart';
  }

  // Method to handle quantity changes
  onQuantityChange(newQuantity: number) {
    this.quantity = newQuantity;
    this.updateButtonText();
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
