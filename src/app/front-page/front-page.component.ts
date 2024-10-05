import { Component, OnInit, AfterViewInit } from '@angular/core';

import { Title, Meta } from '@angular/platform-browser';

import { CanonicalService } from 'src/app/services/canonical.service';

import { Location } from '@angular/common';
declare var $: any;

import { filter } from 'rxjs/operators';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-front-page',
  templateUrl: './front-page.component.html',
  styleUrls: ['./front-page.component.css'],
})
export class FrontPageComponent implements OnInit {
  List: any[] = [];
  featureList: any[] = [];
  Media: string;

  constructor(
    private service: SharedService,
    private route: ActivatedRoute,
    private canonicalService: CanonicalService,
    private title: Title,
    private metaTagService: Meta,
    private location: Location,
    private router: Router
  ) {}

  ngOnInit() {
    this.title.setTitle('Dubotech Digital Ltd.');

    const currentUrl = this.location.path(true);
    const completeUrl = currentUrl;
    this.canonicalService.setCanonicalURL();
  }

  private initVenobox() {
    $(document).ready(() => {
      $('.venobox').venobox();
    });
  }
}
