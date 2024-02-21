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
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
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

    this.registerForm = this.formbuilder.group(
      {
        firstName: ['', [Validators.required]],
        lastName: ['', [Validators.required]],
        username: ['', [Validators.required]],
        email: [
          '',
          [Validators.compose([Validators.required, Validators.email])],
        ],
        password: ['', [Validators.required]],
        confirm_password: ['', [Validators.required]],
      },
      { validator: this.passwordMatchValidator }
    );
  }

  passwordMatchValidator(control: AbstractControl) {
    const password = control.get('password')?.value;
    const confirm_password = control.get('confirm_password')?.value;

    if (password !== confirm_password) {
      control.get('confirm_password')?.setErrors({ passwordMismatch: true });
    } else {
      control.get('confirm_password')?.setErrors(null);
    }

    return null;
  }

  onSubmit() {
    if (this.registerForm.valid) {
      this.spinner.show();

      this.authService.registerService(this.registerForm.value).subscribe({
        next: (res) => {
          this.spinner.hide();

          alert(res['message']);
          this.registerForm.reset();
          this.router.navigate(['/admin']);
        },
        error: (err) => {
          this.spinner.hide();

          alert(err.error.message);
        },
      });
    }
  }
}
