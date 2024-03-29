import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';
import emailjs from '@emailjs/browser';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
})
export class ContactComponent implements OnInit {
  addForm!: FormGroup;
  constructor(private formbuilder: FormBuilder) {}
  ngOnInit(): void {
    this.addForm = this.formbuilder.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      msg: ['', Validators.required],
      subject: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.addForm.valid) {
      // console.warn(this.addForm.value);
      emailjs.init('k2rr0b3ekimHmxU_N');

      emailjs.send('service_ybu3171', 'template_t2p2fua', {
        sub: this.addForm.value.subject,
        sender_name: this.addForm.value.name,
        sender_email: this.addForm.value.email,
        message: this.addForm.value.msg,
      });

      Swal.fire({
        title: 'Your Message has been sent',
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
