import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ModalModule } from 'ngx-bootstrap/modal';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ToastrModule } from 'ngx-toastr';

import { AppRoutingModule } from './app-routing.module';
import { MaterialModule } from './core/material-module';
import { SharedModule } from './core/shared.module';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { CustomerComponent } from './customer/customer.component';
import { HeaderComponent } from './customer/layouts/header/header.component';
import { FooterComponent } from './customer/layouts/footer/footer.component';
import { SidebarComponent } from './customer/layouts/sidebar/sidebar.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';




@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CustomerComponent,
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    ForgotPasswordComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    BrowserAnimationsModule,
    BsDatepickerModule.forRoot(),
    NgxSpinnerModule,
    ModalModule.forRoot(),
    ToastrModule.forRoot({maxOpened:1}),
    SharedModule,
    CalendarModule.forRoot({ provide: DateAdapter, useFactory: adapterFactory }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
