import { Component, OnInit } from '@angular/core';

import { contacts } from 'src/app/contacts';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
})
export class FooterComponent {
  todayDate: number = new Date().getFullYear();
  contact = contacts;
}
