import { Component, OnInit } from '@angular/core';

declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
    { path: '/customer/dashboard', title: 'Dashboard',  icon: 'dashboard', class: '' },
    { path: '/customer/usermanagement', title: 'Carer Management',  icon:'person', class: '' },
    { path: '/customer/clientmanagement', title: 'Client Management',  icon:'person', class: '' },
    { path: '/customer/appointment', title: 'Appointment Management',  icon:'person', class: '' }
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.less']
})
export class SidebarComponent implements OnInit {
  menuItems: any[];
  public role = JSON.parse( sessionStorage.getItem('role'));

  constructor() { }

  ngOnInit() {
    if(this.role=='carer'){
      this.menuItems = [
        { path: '/customer/appointment', title: 'Appointment',  icon:'person', class: '' },
      ];

    }else{
    this.menuItems = [
      { path: '/customer/dashboard', title: 'Dashboard',  icon: 'dashboard', class: '' },
      { path: '/customer/usermanagement', title: 'Carer',  icon:'person', class: '' },
      { path: '/customer/clientmanagement', title: 'Client',  icon:'person', class: '' },
      { path: '/customer/appointment', title: 'Appointment',  icon:'person', class: '' },
      { path: '/customer/dairy', title: 'Dairy',  icon:'person', class: '' },
      { path: '/customer/groups', title: 'Groups',  icon:'person', class: '' },
      { path: '/customer/regions', title: 'Regions',  icon:'person', class: '' }
    ];
    }

  }
  isMobileMenu() {
      if ($(window).width() > 991) {
          return false;
      }
      return true;
  };
}
