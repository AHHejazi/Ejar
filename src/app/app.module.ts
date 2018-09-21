import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { RegionComponent } from './region/region.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { RegionDetailComponent } from './region/region-detail.component';
import { RegionEditComponent } from './region/region-edit.component';
import { RegionCreateComponent } from './region/region-create.component';
import { PaginationComponent } from './shared/pagination/pagination.component';
import { AlertComponent } from './shared/Notifications/alert.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { RegistrationFormComponent } from './registration-form/registration-form.component';
import { HttpModule } from '@angular/http';
import { FacebookLoginComponent } from './facebook-login/facebook-login.component';
import { LoadingSpinnerComponent } from 'src/app/shared/spinner/loading-spinner.component';
import { DatepickerComponent } from './shared/datepicker/datepicker.component';


@NgModule({
  declarations: [
    AppComponent,
    RegionComponent,
    DashboardComponent,
    RegionDetailComponent,
    RegionEditComponent,
    RegionCreateComponent,
    PaginationComponent,
    LoadingSpinnerComponent,
    AlertComponent,
    LoginFormComponent,
    RegistrationFormComponent,
    FacebookLoginComponent,
    DatepickerComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    HttpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})


export class AppModule {

  
 }
