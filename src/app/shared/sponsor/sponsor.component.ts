import { Component } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-sponsor',
  templateUrl: './sponsor.component.html',
  styleUrls: ['./sponsor.component.css'],
})
export class SponsorComponent {
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    navSpeed: 100,
    navText: ['', ''],
    responsive: {
      0: {
        items: 2,
      },
      400: {
        items: 4,
      },
      740: {
        items: 4,
      },
      940: {
        items: 7,
      },
    },
    nav: false,
    autoplay: true, // Enable autoplay
    autoplayTimeout: 3000, // Delay between transitions (in ms)
    autoplayHoverPause: true, // Pause autoplay on hover
    autoplaySpeed: 1000,
  };
}
