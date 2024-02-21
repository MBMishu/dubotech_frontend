import { Component, OnInit } from '@angular/core';

import { Title, Meta } from '@angular/platform-browser';

import { CanonicalService } from 'src/app/services/canonical.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { team } from 'src/app/team';

import { NgxSpinnerService } from 'ngx-spinner';

import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-blog-page',
  templateUrl: './blog-page.component.html',
  styleUrls: ['./blog-page.component.css'],
})
export class BlogPageComponent implements OnInit {
  List: any[] = [];
  Media: string;

  constructor(
    private service: SharedService,
    private route: ActivatedRoute,
    private canonicalService: CanonicalService,
    private title: Title,
    private metaTagService: Meta,
    private location: Location,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit() {
    this.Media = this.service.getMediaUrl();
    this.refreshList();

    this.title.setTitle('Dubotech||Blog');

    const currentUrl = this.location.path(true);
    const completeUrl = currentUrl;
    this.canonicalService.setCanonicalURL();

    this.metaTagService.updateTag({
      property: 'og:url',
      content: completeUrl,
    });
  }

  getLazyLoadImagePath(picPath: string): string {
    if (picPath === 'https://bracu-duburi.com/assets/img/v4.png') {
      return picPath;
    } else {
      const baseUrl = this.Media; // Replace with your actual base URL
      return `${baseUrl}/${picPath}`;
    }
  }

  refreshList() {
    this.spinner.show();

    this.service.getBlog().subscribe((data) => {
      this.spinner.hide();
      this.List = data['data'];
    });
  }
}
