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
  selector: 'app-das-team',
  templateUrl: './das-team.component.html',
  styleUrls: ['./das-team.component.css'],
})
export class DasTeamComponent implements OnInit {
  itemList: any[] = [];
  loading: boolean = true;
  Media: string;

  addForm!: FormGroup;
  isLoggedIn: boolean = false;

  title: string = 'Add Team';

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
      name: ['', Validators.required],
      position: [''],
      profileImage: ['https://bracu-duburi.com/assets/img/v4.png'],
      isFounder: [false],
      email: [''],
      linkedin: [''],
      serial: [''],
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

    this.service.getTeam().subscribe({
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
    this.addForm.patchValue({ profileImage: file });
    this.addForm.get('profileImage')!.updateValueAndValidity();
  }

  deleteBlog(blogId: string) {
    if (confirm('Are you sure you want to delete this team info?')) {
      this.spinner.show();

      this.service.deleteTeam(blogId).subscribe({
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
      formData.append('position', this.addForm.value.position);
      formData.append('isFounder', this.addForm.value.isFounder);
      formData.append('email', this.addForm.value.email);
      formData.append('linkedin', this.addForm.value.linkedin);
      formData.append('serial', this.addForm.value.serial);
      formData.append('profileImage', this.addForm.value.profileImage);

      // Check if there is a blog ID in the form
      const blogId = this.addForm.value.blogId;

      if (blogId) {
        // Updating existing blog
        this.service.updateTeam(blogId, formData).subscribe({
          next: (res) => {
            this.spinner.hide();

            alert(res['message']);
            this.addForm.reset();
            this.addForm.patchValue({ isFounder: false });
            this.refreshList();
            this.title = 'Add Team';
          },
          error: (err) => {
            this.spinner.hide();

            alert(err.error.message);
          },
        });
      } else {
        // Adding a new blog
        this.service.addTeam(formData).subscribe({
          next: (res) => {
            this.spinner.hide();

            alert(res['message']);
            this.addForm.reset();
            this.addForm.patchValue({ isFounder: false });
            this.refreshList();
          },
          error: (err) => {
            this.spinner.hide();

            alert(err.error.message);
            console.log(err);
          },
        });
      }
    }
  }

  populateFormForUpdate(slide: any) {
    this.title = 'Edit Team list';
    // Assuming 'addForm' has a 'blogId' control
    this.addForm.patchValue({
      blogId: slide._id,
      name: slide.name,
      position: slide.position,
      isFounder: slide.isFounder,
      email: slide.email,
      linkedin: slide.linkedin,
      serial: slide.serial,
    });
    // Scroll to the top of the page
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }
}
