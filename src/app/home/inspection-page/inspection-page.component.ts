import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  AbstractControl,
} from '@angular/forms';
import Swal from 'sweetalert2';
import emailjs from '@emailjs/browser';
@Component({
  selector: 'app-inspection-page',
  templateUrl: './inspection-page.component.html',
  styleUrls: ['./inspection-page.component.css'],
})
export class InspectionPageComponent implements OnInit {
  addForm!: FormGroup;
  constructor(private formbuilder: FormBuilder) {}
  ngOnInit(): void {
    this.addForm = this.formbuilder.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      phone: ['', Validators.required],
      company: ['', Validators.required],
      msg: ['', Validators.required],
    });
  }
  onSubmit() {
    if (this.addForm.valid) {
      // console.warn(this.addForm.value);
      emailjs.init('k2rr0b3ekimHmxU_N');
      emailjs.send('service_ybu3171', 'template_t2p2fua', {
        sub: `Talk To Expert from: ${this.addForm.value.name}`,
        sender_name: this.addForm.value.name,
        sender_email: this.addForm.value.email,
        message: this.addForm.value.msg,
        company: this.addForm.value.company,
        sender_number: this.addForm.value.phone,
      });
      Swal.fire({
        title: 'Your Message has been sent. Wait for Reply.',
        text: '',
        icon: 'success',
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'ok',
      }).then((result) => {
        this.addForm.reset();
      });
    }
  }
}
