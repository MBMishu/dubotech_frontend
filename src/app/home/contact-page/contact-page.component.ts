import { Component } from '@angular/core';
import { contacts } from 'src/app/contacts';
@Component({
  selector: 'app-contact-page',
  templateUrl: './contact-page.component.html',
  styleUrls: ['./contact-page.component.css'],
})
export class ContactPageComponent {
  contact = contacts;
}
