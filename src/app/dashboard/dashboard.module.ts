import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ResetComponent } from './reset/reset.component';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { DasBlogComponent } from './das-blog/das-blog.component';
import { DasTeamComponent } from './das-team/das-team.component';
import { DasGalleryComponent } from './das-gallery/das-gallery.component';
import { DasPageComponent } from './das-page.component';
import { DasUsersComponent } from './das-users/das-users.component';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { QuillModule } from 'ngx-quill';
import { NgxSpinnerModule } from 'ngx-spinner';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    ResetComponent,
    ForgetPasswordComponent,
    SidebarComponent,
    DasBlogComponent,
    DasTeamComponent,
    DasGalleryComponent,
    DasPageComponent,
    DasUsersComponent,
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    LazyLoadImageModule,
    FormsModule,
    ReactiveFormsModule,
    QuillModule.forRoot(),
    NgxSpinnerModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTooltipModule,
    RouterModule,
    MatCardModule,
  ],
})
export class DashboardModule {}
