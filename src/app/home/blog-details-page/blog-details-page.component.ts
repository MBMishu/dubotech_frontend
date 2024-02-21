import { Component, OnInit } from '@angular/core';

import { Title, Meta } from '@angular/platform-browser';

import { CanonicalService } from 'src/app/services/canonical.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { team } from 'src/app/team';

import { NgxSpinnerService } from 'ngx-spinner';

import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-blog-details-page',
  templateUrl: './blog-details-page.component.html',
  styleUrls: ['./blog-details-page.component.css'],
})
export class BlogDetailsPageComponent implements OnInit {
  BlogId: number;
  BlogSlug: string;
  Media: string;
  BlogList: any[] = [];
  not_text: string;
  path: string;
  constructor(
    private service: SharedService,
    private route: ActivatedRoute,
    private canonicalService: CanonicalService,
    private title: Title,
    private metaTagService: Meta,
    private location: Location,
    private spinner: NgxSpinnerService // Inject the Location service // Inject the Location service
  ) {}

  ngOnInit() {
    const currentUrl = this.location.path(true);
    const completeUrl = currentUrl;

    this.Media = this.service.getMediaUrl();

    const slug = this.route.snapshot.paramMap.get('slug');
    if (slug != null) {
      // this.BlogId = Number(id);
      this.BlogSlug = slug;
      this.showResult(completeUrl);
    }

    this.canonicalService.setCanonicalURL();
  }

  truncateDescription(title: string, maxLength: number): string {
    if (title.length > maxLength) {
      return title.substring(0, maxLength) + '...';
    }
    return title;
  }

  getLazyLoadImagePath(picPath: string): string {
    if (picPath === 'https://bracu-duburi.com/assets/img/v4.png') {
      return picPath;
    } else {
      const baseUrl = this.Media; // Replace with your actual base URL

      return `${baseUrl}/${picPath}`;
    }
  }

  showResult(completeUrl: string) {
    this.spinner.show();
    this.service.getBlog().subscribe((data) => {
      this.spinner.hide();
      // this.BlogList = data.find((blog) => blog.slug === this.BlogSlug);
      const foundBlog = data['data'].find((blog) => blog._id === this.BlogSlug);

      if (foundBlog) {
        this.BlogList = foundBlog;

        this.path = `${this.Media}/${foundBlog.blogImage}`;

        this.title.setTitle(foundBlog.name);

        this.metaTagService.updateTag({
          property: 'description',
          content: foundBlog.name,
        });

        this.metaTagService.updateTag({
          property: 'og:description',
          content: foundBlog.name,
        });
        this.metaTagService.updateTag({
          property: 'og:image',
          content: this.Media + foundBlog.blogImage,
        });
        this.metaTagService.updateTag({
          property: 'og:url',
          content: completeUrl,
        });
      } else {
        this.not_text = 'Blog not found';
      }
    });
  }
}
