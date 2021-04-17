import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from  './../../services/restservices/auth.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.less']
})
export class ProfileComponent implements OnInit {
  @Input() userID: number; 
  @Input() userType: string; 
  @Input() groupsList:any;
  @Input() userList:any;


  userInfo:any;
  filteredUser:any;
  
  appDetails:any = [];
  calendarInfo:any[];
  constructor(private spinner: NgxSpinnerService,private authService: AuthService) { }

  ngOnInit() {
    console.log(this.userType);
    console.log(this.userList);
  	let user_id = sessionStorage.getItem('user_id')
    this.getUserDetails(user_id);
    this.getUserAppt(user_id)

    console.log(this.userType);
  }

  filterUser(id){
    this.filteredUser = this.userList.filter(user => user.group_id == id);
    console.log(this.filteredUser);

  }

  switchUser(id){
    this.getUserDetails(id);
    this.getUserAppt(id)    

  }

  getUserDetails(id){  
   this.spinner.show();
    this.authService.getUserDetails(id,this.userType).pipe(first())
    .subscribe(
      response => {
        this.spinner.hide();
        this.userInfo = response;
        console.log(this.userInfo);
        // this.router.navigateByUrl('/customer');
      },
      error => {
        this.spinner.hide();
      });
 }

 getUserAppt(id){
 this.appDetails = [];  
   this.spinner.show();
    this.authService.getUserAppt(id,this.userType).pipe(first())
    .subscribe(
      response => {
        this.spinner.hide();
        let appInfo = response.appointments;
        for(let i=0;i<appInfo.length;i++){
			let eve = {
						start: new Date(appInfo[i].appointment_start_time),
						end: new Date(appInfo[i].appointment_end_time),
						title: appInfo[i].notes,
						color: { primary: '#1e90ff', secondary: '#D1E8FF'},
						allDay: false,
					  };
					  console.log(this.appDetails);
    		this.appDetails.push(eve);
        }
        
      },
      error => {
        this.spinner.hide();
      });
 }




}
