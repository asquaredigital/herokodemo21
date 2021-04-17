import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FlatpickrModule } from 'angularx-flatpickr';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common'
import { HttpClientModule } from '@angular/common/http';
// import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { ChildComponent } from '../shared-components/child/child.component';
import { CalendarComponent } from '../shared-components/calender/calendar.component';
import { ProfileComponent } from '../shared-components/profile/profile.component';

@NgModule({
    imports: [
      CommonModule,
      FormsModule,
      ReactiveFormsModule,
      HttpClientModule,
      // MDBBootstrapModule.forRoot(),
      NgbModule,
      NgbModalModule,
      FlatpickrModule.forRoot(),
      CalendarModule.forRoot({
        provide: DateAdapter,
        useFactory: adapterFactory,
      }),
    ],
    declarations: [ 
      ChildComponent,
      CalendarComponent,
      ProfileComponent
    ],
    providers: [DatePipe],
    exports: [
      FormsModule,
      ReactiveFormsModule,
      ChildComponent,
      CalendarComponent,
      ProfileComponent
    ]
    

 })
 export class SharedModule { }
