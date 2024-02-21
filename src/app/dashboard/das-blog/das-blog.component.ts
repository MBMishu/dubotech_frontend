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
  selector: 'app-das-blog',
  templateUrl: './das-blog.component.html',
  styleUrls: ['./das-blog.component.css'],
})
export class DasBlogComponent implements OnInit {
  itemList: any[] = [];
  loading: boolean = true;
  Media: string;

  addForm!: FormGroup;
  isLoggedIn: boolean = false;

  title: string = 'Add Blog';

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

    this.addForm = this.formbuilder.group({
      name: ['', [Validators.required]],
      description: [''],
      blogImage: ['https://bracu-duburi.com/assets/img/v4.png'],
      isFeature: [false],
      blogId: [null],
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

    this.service.getBlog().subscribe({
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

  onImageChange(event: any) {
    const file = event.target.files[0];
    this.addForm.patchValue({ blogImage: file });
    this.addForm.get('blogImage')!.updateValueAndValidity();
  }

  deleteBlog(blogId: string) {
    if (confirm('Are you sure you want to delete this blog?')) {
      this.spinner.show();

      this.service.deleteBlog(blogId).subscribe({
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

  onSubmit() {
    if (this.addForm.valid) {
      this.spinner.show();

      const formData = new FormData();

      formData.append('name', this.addForm.value.name);
      formData.append('description', this.addForm.value.description);
      formData.append('isFeature', this.addForm.value.isFeature);
      formData.append('blogImage', this.addForm.value.blogImage);

      // Check if there is a blog ID in the form
      const blogId = this.addForm.value.blogId;

      if (blogId) {
        // Updating existing blog
        this.service.updateBlog(blogId, formData).subscribe({
          next: (res) => {
            this.spinner.hide();

            alert(res['message']);
            this.addForm.reset();
            this.addForm.patchValue({ isFeature: false });
            this.refreshList();
            this.title = 'Add Blog';
          },
          error: (err) => {
            this.spinner.hide();

            alert(err.error.message);
          },
        });
      } else {
        // Adding a new blog
        this.service.addBlog(formData).subscribe({
          next: (res) => {
            this.spinner.hide();

            alert(res['message']);
            this.addForm.reset();
            this.addForm.patchValue({ isFeature: false });
            this.refreshList();
          },
          error: (err) => {
            this.spinner.hide();

            alert(err.error.message);
          },
        });
      }
    }
  }

  populateFormForUpdate(slide: any) {
    this.title = 'Edit Blog';
    // Assuming 'addForm' has a 'blogId' control
    this.addForm.patchValue({
      blogId: slide._id,
      name: slide.name,
      description: slide.description,
      isFeature: slide.isFeature,
    });
    // Scroll to the top of the page
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    // Scroll to the top of the page using Renderer2
    // const scrollToOptions: ScrollToOptions = { top: 0, behavior: 'smooth' };
    // const documentBody = this.renderer.selectRootElement('body');
    // this.renderer.setProperty(documentBody, 'scrollTop', scrollToOptions.top);
  }
}
