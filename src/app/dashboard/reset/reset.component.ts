import { Component, OnInit } from '@angular/core';

import {
  FormGroup,
  FormBuilder,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { SharedService } from 'src/app/services/shared.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { CookieServiceService } from 'src/app/services/cookie-service.service';
import { NgxSpinnerService } from 'ngx-spinner';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.css'],
})
export class ResetComponent implements OnInit {
  resetForm!: FormGroup;
  token!: string;

  constructor(
    private formbuilder: FormBuilder,
    private authService: SharedService,
    private router: Router,
    private activateRoute: ActivatedRoute,
    private cookieService: CookieService,
    private cookieService_doc: CookieServiceService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    this.resetForm = this.formbuilder.group(
      {
        password: ['', [Validators.required]],
        confirm_password: ['', [Validators.required]],
      },
      { validator: this.passwordMatchValidator }
    );

    this.activateRoute.params.subscribe((val) => {
      this.token = val['token'];
    });
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
    if (this.resetForm.valid) {
      this.spinner.show();

      let resetObjs = {
        token: this.token,
        password: this.resetForm.value.password,
      };

      this.authService.ResetPasswordService(resetObjs).subscribe({
        next: (res) => {
          this.spinner.hide();

          alert(res['message']);
          this.resetForm.reset();
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
