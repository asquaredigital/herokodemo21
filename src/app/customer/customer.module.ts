import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../core/shared.module';
import { CustomerRoutingModule } from './customer-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { Menu2Component } from './menu2/menu2.component';
import { AppointmentComponent } from './appointment/appointment.component';
import { DairyComponent } from './dairy/dairy.component';
import { ClientsComponent } from './clients/clients.component';
import { GroupsComponent } from './groups/groups.component';
import { RegionsComponent } from './regions/regions.component';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { MaterialModule } from '../core/material-module';


@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    BsDatepickerModule.forRoot(),
    CustomerRoutingModule,
    MaterialModule,
  ],
  declarations: [
    DashboardComponent,
    Menu2Component,
    DairyComponent,
    ClientsComponent,
    RegionsComponent,
    AppointmentComponent,
    GroupsComponent

  ]
})
export class CustomerModule { }
