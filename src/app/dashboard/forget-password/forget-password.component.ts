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
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css'],
})
export class ForgetPasswordComponent implements OnInit {
  forgetForm!: FormGroup;
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
    this.forgetForm = this.formbuilder.group({
      email: [
        '',
        [Validators.compose([Validators.required, Validators.email])],
      ],
    });
  }
  onSubmit() {
    if (this.forgetForm.valid) {
      this.spinner.show();

      this.authService.forgetPasswordService(this.forgetForm.value).subscribe({
        next: (res) => {
          this.spinner.hide();

          alert(res['message']);

          this.forgetForm.reset();
        },
        error: (err) => {
          this.spinner.hide();

          alert(err.error.message);
        },
      });
    }
  }
}
