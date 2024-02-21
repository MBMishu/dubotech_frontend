import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { ResetComponent } from './reset/reset.component';
import { DasBlogComponent } from './das-blog/das-blog.component';
import { DasGalleryComponent } from './das-gallery/das-gallery.component';
import { DasTeamComponent } from './das-team/das-team.component';
import { DasUsersComponent } from './das-users/das-users.component';
import { DasPageComponent } from './das-page.component';
import { AuthGuardService } from '../services/auth-guard.service';

const routes: Routes = [
  {
    path: '',
    component: DasPageComponent,
    children: [
      {
        path: '',
        component: LoginComponent,
        pathMatch: 'full',
      },
      {
        path: 'register',
        component: RegisterComponent,
        pathMatch: 'full',
      },

      {
        path: 'forget-password',
        component: ForgetPasswordComponent,
        pathMatch: 'full',
      },

      {
        path: 'reset/:token',
        component: ResetComponent,
        pathMatch: 'full',
      },

      {
        path: 'dashboard',
        canActivate: [AuthGuardService],
        children: [
          {
            path: '',
            component: DasBlogComponent,
            pathMatch: 'full',
          },
          {
            path: 'gallery',
            component: DasGalleryComponent,
            pathMatch: 'full',
          },
          {
            path: 'team',
            component: DasTeamComponent,
            pathMatch: 'full',
          },
          {
            path: 'users',
            component: DasUsersComponent,
            pathMatch: 'full',
          },
        ],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
