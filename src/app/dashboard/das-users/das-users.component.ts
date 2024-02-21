import { Component, OnInit } from '@angular/core';

import {
  FormGroup,
  FormBuilder,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { SharedService } from 'src/app/services/shared.service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { CookieServiceService } from 'src/app/services/cookie-service.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-das-users',
  templateUrl: './das-users.component.html',
  styleUrls: ['./das-users.component.css'],
})
export class DasUsersComponent implements OnInit {
  itemList: any[] = [];
  loading: boolean = true;
  Media: string;

  isLoggedIn: boolean = false;

  title: string = 'Team';

  constructor(
    private formbuilder: FormBuilder,
    private service: SharedService,
    private router: Router,
    private cookieService: CookieService,
    private cookieService_doc: CookieServiceService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    this.Media = this.service.getMediaUrl();
    this.refreshList();
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

    this.service.getUserList().subscribe({
      next: (res) => {
        this.spinner.hide();

        this.itemList = res['data'];
        this.loading = false;
      },
      error: (err) => {
        this.spinner.hide();

        alert(err.error.message);
      },
    });
  }
  deleteUser(blogId: string) {
    if (confirm('Are you sure you want to delete this user?')) {
      this.spinner.show();

      this.service.deleteUser(blogId).subscribe({
        next: (res) => {
          this.spinner.hide();

          alert(res['message']);
          this.refreshList();
        },
        error: (err) => {
          this.spinner.hide();

          alert(err.error.message);
        },
      });
    }
  }

  populateFormForUpdate(slide: string) {
    this.spinner.show();

    this.service.updateUser(slide).subscribe({
      next: (res) => {
        this.spinner.hide();

        alert(res['message']);

        this.refreshList();
      },
      error: (err) => {
        this.spinner.hide();

        alert(err.error.message);
      },
    });
  }
}
