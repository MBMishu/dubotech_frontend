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
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  isLoggedIn: boolean = false;
  constructor(
    private formbuilder: FormBuilder,
    private authService: SharedService,
    private router: Router,
    private cookieService: CookieService,
    private cookieService_doc: CookieServiceService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    this.authService.isLoggedIn$.subscribe((res) => {
      this.isLoggedIn = this.authService.isLoggedIn();
    });
    if (this.isLoggedIn) {
      this.router.navigate(['/admin/dashboard']);
    }

    this.loginForm = this.formbuilder.group({
      email: [
        '',
        [Validators.compose([Validators.required, Validators.email])],
      ],
      password: ['', [Validators.required]],
    });
  }
  onSubmit() {
    if (this.loginForm.valid) {
      this.spinner.show();
      this.authService.loginService(this.loginForm.value).subscribe({
        next: (res) => {
          this.spinner.hide();
          Swal.fire({
            title: res['message'],
            text: '',
            icon: 'success',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'ok',
          }).then((result) => {
            this.loginForm.reset();
            this.router.navigate(['/admin/dashboard']);
          });
        },
        error: (err) => {
          this.spinner.hide();
          alert(err.error.message);
        },
      });
    }
  }
}
