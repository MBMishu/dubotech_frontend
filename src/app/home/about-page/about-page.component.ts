import { Component, OnInit } from '@angular/core';

import { Title, Meta } from '@angular/platform-browser';

import { CanonicalService } from 'src/app/services/canonical.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { team } from 'src/app/team';

import { NgxSpinnerService } from 'ngx-spinner';

import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-about-page',
  templateUrl: './about-page.component.html',
  styleUrls: ['./about-page.component.css'],
})
export class AboutPageComponent implements OnInit {
  teamList = team;
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

    this.title.setTitle('Dubotech | About Us');

    const currentUrl = this.location.path(true);
    const completeUrl = currentUrl;
    this.canonicalService.setCanonicalURL();

    this.metaTagService.updateTag({
      property: 'og:url',
      content: completeUrl,
    });
  }

  imageLoaded(slide: any) {
    slide.loading = false; // Set loading to false for the individual image when it is loaded
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
    this.service.getTeam().subscribe((data) => {
      this.spinner.hide();
      this.List = data['data'].filter((team) => team.isFounder === true);
    });
  }
}
