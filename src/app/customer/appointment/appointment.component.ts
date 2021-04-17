import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from  './../../services/restservices/auth.service';
import { first } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from  '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.less']
})
export class AppointmentComponent implements OnInit {
  public appointments : any;
  public agents : any;
  public clients : any;
  public checkNotes : any;
  public currentServices : any;
  public currentNotes : any;
  public selectedServices : any;
  public currentAppointment : any;
  public completedServices : any;
  public currentCarer : any;
  public currentClient : any;
  public userForm: FormGroup;
  public isSubmitted : Boolean = false;
  public isDisabled : Boolean  =  false;
  public modalRef: BsModalRef;
  public role = JSON.parse( sessionStorage.getItem('role'));
  @ViewChild('modaltemplate',{static: false}) modaltemplate;
  @ViewChild('serviceDetails',{static: false}) serviceDetails;
  @ViewChild('checkoutDetails',{static: false}) checkoutDetails;

  orders = [
    {id: 1, name: "MONDAY",checked : false},
    {id: 2, name: "TUESDAY",checked : false},
    {id: 3, name: "WEDNESDAY",checked : false},
    {id: 4, name: "THURSDAY",checked : false},
    {id: 5, name: "FRIDAY",checked : false},
    {id: 6, name: "SATURDAY",checked : false},
    {id: 0, name: "SUNDAY",checked : false}
  ];
  constructor(public modalService: BsModalService,private formBuilder: FormBuilder,private spinner: NgxSpinnerService,private toastr: ToastrService,private authService: AuthService) { }
  get formControls() { return this.userForm.controls; }
 
  ngOnInit() {
      const controlArray = this.orders.map(c => new FormControl(false));
    controlArray[0].setValue(true);
    this.userForm  =  this.formBuilder.group({
          agent: ['', Validators.required],
          client: ['', Validators.required],
          start: ['', Validators.required],
          end: ['', Validators.required],
          notes: ['', Validators.required],
          reoccur: [false],
          orders: new FormArray([]),
        });
    if(this.role =='carer'){
      this.getCarerAppointments();
    }else{
      this.getAppointments();  
    }
    
    this.getClients();
    this.getAgents();

     const formArray = this.userForm.get('orders') as FormArray;
    // loop each existing value 
    this.orders.forEach(order => {
      formArray.push(new FormGroup({
        id: new FormControl(order.id),
        checked: new FormControl(order.checked)
      }))
    })
  }

  checkIn(appointment){
    this.spinner.show();
    let params = {
    "appointment": {
        "agent_appointments_attributes": {
            "id": appointment.status[0].id, // id must
            "agent_id": appointment.agents[0].id,
            "status": 1
        }
    }
  };
    this.authService.checkIn(appointment.id,params).pipe(first())
    .subscribe(
      response => {
        this.spinner.hide();
        this.getCarerAppointments();
        //this.appointments = response.appointments;
        
        // this.router.navigateByUrl('/customer');
      },
      error => {
        this.spinner.hide();
      });

  }

  chooseservice(event,val){
    if(event.target.checked){
      this.selectedServices.push(val)
    }else{
      let index =  this.selectedServices.indexOf(val);
      this.selectedServices.splice(index, 1);
    }

  }

  completedservice(event,val){
    if(event.target.checked){
      this.completedServices.push(val)
    }else{
      let index =  this.completedServices.indexOf(val);
      this.completedServices.splice(index, 1);
    }

  }


  onselectClient(val){

    
    for(let i =0;i<this.clients.length;i++){
      
        if(this.clients[i].id==val){
          console.log(this.clients[i]);
          this.currentServices = this.clients[i].services;
        }
    }

  }

  getCarerAppointments(){  
   this.spinner.show();
    this.authService.getCarerAppointments().pipe(first())
    .subscribe(
      response => {
        this.spinner.hide();
        this.appointments = response.appointments;
        
        // this.router.navigateByUrl('/customer');
      },
      error => {
        this.spinner.hide();
      });
 }

  getAppointments(){  
   this.spinner.show();
    this.authService.getAppointments().pipe(first())
    .subscribe(
      response => {
        this.spinner.hide();
        this.appointments = response.appointments;
        
        // this.router.navigateByUrl('/customer');
      },
      error => {
        this.spinner.hide();
      });
 }

 getClients(){  
   this.spinner.show();
    this.authService.getClients().pipe(first())
    .subscribe(
      response => {
        this.spinner.hide();
        this.clients = response.clients;
        
        // this.router.navigateByUrl('/customer');
      },
      error => {
        this.spinner.hide();
      });
 }

 getAgents(){  
   this.spinner.show();
    this.authService.getUsers().pipe(first())
    .subscribe(
      response => {
        this.spinner.hide();
        this.agents = response.agents;
        
        // this.router.navigateByUrl('/customer');
      },
      error => {
        this.spinner.hide();
      });
 }


 openModel() {
    this.selectedServices = [];
    //this.currentServices = ['Sleeping','Feeding','Physiotherapy','Walking'];
    this.modalRef = this.modalService.show(this.modaltemplate,{backdrop : 'static',class:'modal-right'});

  } 

  openService(appointment) {
    this.currentServices = appointment.services;
    this.currentNotes = appointment.notes;
    this.currentCarer = appointment.agents[0].name;
    this.currentClient = appointment.client.name;
    this.modalRef = this.modalService.show(this.serviceDetails,{backdrop : 'static',class:'modal-right'});

  } 

  openCheckOut(appointment) {
    this.completedServices = [];
    this.currentServices = appointment.services;
    this.currentAppointment = appointment;
    this.currentNotes = appointment.notes;
    this.currentCarer = appointment.agents[0].name;
    this.currentClient = appointment.client.name;
    console.log(this.currentAppointment);
    this.modalRef = this.modalService.show(this.checkoutDetails,{backdrop : 'static',class:'modal-right'});

  } 

  Checkout(app_id){    
    let params = {
    "appointment": {
        "feedbacks_attributes":  [{
            "agent_id": this.currentAppointment.status[0].agent_id,
            "note_type": "general",
            "client_id": this.currentAppointment.client_id,
            "services": this.completedServices,
            "description": this.checkNotes
        }]
    }
}
    this.authService.checkout(params,app_id).pipe(first())
    .subscribe(
      response => {
        this.getCarerAppointments();
        this.spinner.hide();
        this.closeModel();

        
        // this.router.navigateByUrl('/customer');
      },
      error => {
        this.spinner.hide();
      });
  }

  closeModel(){
    this.modalRef.hide();
  }
  filterchecked(weekdays){
    let arr = [];
    for(let i=0;i<weekdays.length;i++){
      if(weekdays[i].checked){
        arr.push(weekdays[i].id);
      }
    }
    return arr;
  }
  createUser(){

    this.isSubmitted = true;
    this.isDisabled = true;
    //console.log(this.userForm);
    if(this.userForm.invalid){
      this.isDisabled = false;
      return;
    }
    this.spinner.show();

    let selected_arr = this.filterchecked(this.userForm.value.orders);

    if(this.userForm.value.reoccur){

       let user = {
        "agent_appointments_attributes": [
            {
                "agent_id": this.userForm.value.agent
            }
        ],
        "client_id": parseInt(this.userForm.value.client),
        "start_time": this.userForm.value.start,
        "end_time": this.userForm.value.end,
        "services": this.selectedServices,
        "notes": this.userForm.value.notes,
        "scheduled_days": selected_arr,
        "reoccur": this.userForm.value.reoccur
    };

    console.log(user);
    this.authService.createAppointmentReoccur(user).pipe(first())
    .subscribe(
      response => {
        this.spinner.hide();
        this.closeModel();
        this.getAppointments();
      },
      error => {
          this.spinner.hide();  
          this.toastr.error(error.error.error);
          this.isSubmitted = false;
          this.isDisabled = false; 
      });

    }else{
    let user = {
        "agent_appointments_attributes": [
            {
                "agent_id": this.userForm.value.agent
            }
        ],
        "client_id": parseInt(this.userForm.value.client),
        "start_time": this.userForm.value.start,
        "end_time": this.userForm.value.end,
        "services": this.selectedServices,
        "notes": this.userForm.value.notes,
        "reoccur": this.userForm.value.reoccur
    };
    this.authService.createAppointments(user).pipe(first())
    .subscribe(
      response => {
        this.spinner.hide();
        this.closeModel();
        this.getAppointments();
      },
      error => {
          this.spinner.hide();  
          this.toastr.error(error.error.error);
          this.isSubmitted = false;
          this.isDisabled = false; 
      });

    }
 } 

}
