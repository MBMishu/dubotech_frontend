import { Component, OnInit } from '@angular/core';

import { Title, Meta } from '@angular/platform-browser';

import { CanonicalService } from 'src/app/services/canonical.service';

import { Location } from '@angular/common';
import { NgxSpinnerService } from 'ngx-spinner';
declare var $: any;

import { filter } from 'rxjs/operators';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
})
export class HomePageComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private canonicalService: CanonicalService,
    private title: Title,
    private metaTagService: Meta,
    private location: Location,
    private spinner: NgxSpinnerService,
    private router: Router
  ) {}

  ngOnInit() {
    this.title.setTitle('Dubotech | Home');

    const currentUrl = this.location.path(true);
    const completeUrl = currentUrl;
    this.canonicalService.setCanonicalURL();
  }
}
