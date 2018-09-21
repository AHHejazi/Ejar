import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegionComponent } from './region/region.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RegionDetailComponent } from './region/region-detail.component';
import { RegionEditComponent } from './region/region-edit.component';
import { RegionCreateComponent } from './region/region-create.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { RegistrationFormComponent } from './registration-form/registration-form.component';
import { AuthGuard } from './auth.guard';
import { FacebookLoginComponent } from './facebook-login/facebook-login.component';

const routes: Routes = [
  { path: 'region', component: RegionComponent },
  { path: 'regioncreate', component: RegionCreateComponent },
  { path: 'regiondetail/:id', component: RegionDetailComponent },
  { path: 'regionedit/:id', component: RegionEditComponent },
  { path: 'dashboard', canActivate: [AuthGuard],  component: DashboardComponent },
  { path: 'registration', component: RegistrationFormComponent },
  { path: 'facebook-login', component: FacebookLoginComponent },
  { path: 'login', component: LoginFormComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'facebook-auth', redirectTo: '/facebook-auth.html', pathMatch: 'full' }
];

@NgModule({
  exports: [ RouterModule ],
  imports:[RouterModule.forRoot(routes)]

})
export class AppRoutingModule {}