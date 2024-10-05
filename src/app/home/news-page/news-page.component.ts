import { Component, OnInit } from '@angular/core';

import { Title, Meta } from '@angular/platform-browser';

import { CanonicalService } from 'src/app/services/canonical.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { NgxSpinnerService } from 'ngx-spinner';

import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-news-page',
  templateUrl: './news-page.component.html',
  styleUrls: ['./news-page.component.css'],
})
export class NewsPageComponent implements OnInit {
  List: any[] = [];
  news_List: any[] = [];
  MissionList: any[] = [];
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
    this.Media = this.service.getDuburiMediaUrl();
    this.refreshList();

    this.title.setTitle('Dubotech | News');

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
      // const baseUrl = this.Media; // Replace with your actual base URL
      const baseUrl = 'https://ik.imagekit.io/dubotech'; // Replace with your actual base URL
      return `${baseUrl}/${picPath}`;
    }
  }

  refreshList() {
    this.spinner.show();

    this.service.getNews().subscribe((data) => {
      this.news_List = data;
    });

    this.service.getDuburiNews().subscribe((data) => {
      this.spinner.hide();
      this.List = data.slice(2);
    });
    // this.service.getMissions().subscribe((data) => {
    //   this.MissionList = data;
    //   console.log(data);
    // });
  }
}
