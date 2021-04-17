import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { Menu2Component } from './menu2/menu2.component';
import { ClientsComponent } from './clients/clients.component';
import { DairyComponent } from './dairy/dairy.component';
import { AppointmentComponent } from './appointment/appointment.component';
import { GroupsComponent } from './groups/groups.component';
import { RegionsComponent } from './regions/regions.component';


const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'usermanagement'},
  { path: 'dashboard', component: DashboardComponent },
  { path: 'usermanagement', component: Menu2Component },
  { path: 'clientmanagement', component: ClientsComponent },
  { path: 'dairy', component: DairyComponent },
  { path: 'appointment', component: AppointmentComponent },
  { path: 'groups', component: GroupsComponent },
  { path: 'regions', component: RegionsComponent },
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class CustomerRoutingModule { }
