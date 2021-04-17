import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from  './../../services/restservices/auth.service';
import { first } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { FormBuilder, FormGroup, Validators } from  '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

@Component({
  selector: 'app-dairy',
  templateUrl: './dairy.component.html',
  styleUrls: ['./dairy.component.less']
})
export class DairyComponent implements OnInit {
  public dairy : any;
  public agents : any;
  public clients : any;
  public categories : any;
  public currentServices : any;
  public currentNotes : any;
  public selectedServices : any;
  public currentCarer : any;
  public currentClient : any;
  public userForm: FormGroup;
  public isSubmitted : Boolean = false;
  public isDisabled : Boolean  =  false;
  public modalRef: BsModalRef;
  public role = JSON.parse( sessionStorage.getItem('role'));
  @ViewChild('modaltemplate',{static: false}) modaltemplate;
  @ViewChild('serviceDetails',{static: false}) serviceDetails;
  constructor(public modalService: BsModalService,private formBuilder: FormBuilder,private spinner: NgxSpinnerService,private toastr: ToastrService,private authService: AuthService) { }
  get formControls() { return this.userForm.controls; }
  ngOnInit() {
    this.userForm  =  this.formBuilder.group({
          agent: ['', Validators.required],
          client: ['', Validators.required],
          category: ['', Validators.required],
          notes: ['', Validators.required]
        });
    this.getDairy();
    this.getClients();
    this.getAgents();
    this.getCategory()
  }

  getCategory(){
    this.categories = [
    {id:'accident',name:'Accident'},
    {id:'compliment',name:'Compliment'},
    {id:'notes',name:'Notes'},
    {id:'complaint',name:'Complaint'},
    {id:'general',name:'General'}
    ]
    
  }
 
  getDairy(){  
   this.spinner.show();
    this.authService.getDairy().pipe(first())
    .subscribe(
      response => {
        this.spinner.hide();
        this.dairy = response.feedbacks;
        
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
   
    //this.selectedServices = [];
    //this.currentServices = ['Sleeping','Feeding','Physiotherapy','Walking'];
    this.modalRef = this.modalService.show(this.modaltemplate,{backdrop : 'static',class:'modal-right'});

  } 

  openService(appointment) {
    this.currentServices = appointment.services;
    this.currentNotes = appointment.notes;
    this.currentCarer = appointment.agent.name;
    this.currentClient = appointment.client.name;
    this.modalRef = this.modalService.show(this.serviceDetails,{backdrop : 'static',class:'modal-right'});

  } 
  closeModel(){
    this.modalRef.hide();
  }

  createDairy(){

    this.isSubmitted = true;
    this.isDisabled = true;
    
    if(this.userForm.invalid){
      this.isDisabled = false;
      return;
    }
    this.spinner.show();

    let user = {
        "agent_id": parseInt(this.userForm.value.agent),
        "client_id": parseInt(this.userForm.value.client),
        "note_type": this.userForm.value.category,
        "description": this.userForm.value.notes
    };
    this.authService.createDairy(user).pipe(first())
    .subscribe(
      response => {
        this.spinner.hide();
        this.closeModel();
        this.getDairy();
      },
      error => {
          this.spinner.hide();  
          this.toastr.error(error.error.error);
          this.isSubmitted = false;
          this.isDisabled = false; 
      });
 } 

}
