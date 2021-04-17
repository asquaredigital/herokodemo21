import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from  './../../services/restservices/auth.service';
import { first } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { FormBuilder, FormGroup, Validators } from  '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';



@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.less']
})
export class ClientsComponent implements OnInit {
  public users : any;
  public groups : any;
  public userForm: FormGroup;
  public isSubmitted : Boolean = false;
  public isDisabled : Boolean  =  false;
  public isClientDetails : Boolean  =  false;
  public modalRef: BsModalRef;
  isEdit:Boolean;
  public userType :any;
  
  @ViewChild('modaltemplate',{static: false}) modaltemplate;
  constructor(public modalService: BsModalService,private formBuilder: FormBuilder,private spinner: NgxSpinnerService,private toastr: ToastrService,private authService: AuthService) { }
  get formControls() { return this.userForm.controls; }
  ngOnInit() {
    this.userForm  =  this.formBuilder.group({
          title: ['', Validators.required],
          first_name: ['', Validators.required],
          last_name: ['', Validators.required],
          user_name: ['', Validators.required],
          postcode: ['', Validators.required],
          email: ['', Validators.required],
          keysafe: ['', Validators.required],
          mobile: ['', Validators.required],
          role: ['', Validators.required],
          landline: ['', Validators.required],
          region: ['', Validators.required],
          groups: ['', Validators.required],
          gender: ['', Validators.required],
          services: ['', Validators.required],
          dateOfBirth: ['', Validators.required]
        });
    this.getUsers();
    this.getGroups();


  }
  showClient(id=false){
    this.isClientDetails = !this.isClientDetails;
    if(id){
    sessionStorage.setItem('user_id', JSON.stringify((id)));
    this.userType = 'clients';
    }
  }
  getUsers(){  
   this.spinner.show();
    this.authService.getClients().pipe(first())
    .subscribe(
      response => {
        this.spinner.hide();
        this.users = response.clients;
        console.log(this.users );
        // this.router.navigateByUrl('/customer');
      },
      error => {
        this.spinner.hide();
      });
 }

 getGroups(){  
   this.spinner.show();
    this.authService.getGroups('client').pipe(first())
    .subscribe(
      response => {
        this.spinner.hide();
        this.groups = response.groups;
        console.log(this.groups);
        // this.router.navigateByUrl('/customer');
      },
      error => {
        this.spinner.hide();
      });
 }

 openModel() {

  

    this.modalRef = this.modalService.show(this.modaltemplate,{backdrop : 'static',class:'modal-right'});
    
   /* const myLatlng = { lat: -25.363, lng: 131.044 };
        const map = new google.maps.Map(document.getElementById("map"), {
          zoom: 4,
          center: myLatlng,
        });
        // Create the initial InfoWindow.
        let infoWindow = new google.maps.InfoWindow({
          content: "Click the map to get Lat/Lng!",
          position: myLatlng,
        });
        infoWindow.open(map);
        // Configure the click listener.
        map.addListener("click", (mapsMouseEvent) => {
          // Close the current InfoWindow.
          infoWindow.close();
          // Create a new InfoWindow.
          infoWindow = new google.maps.InfoWindow({
            position: mapsMouseEvent.latLng,
          });
          infoWindow.setContent(
            JSON.stringify(mapsMouseEvent.latLng.toJSON(), null, 2)
          );
          infoWindow.open(map);
        });*/

  } 
  openModel2(isEdit,userData) {
    this.isEdit = isEdit;
    this.modalRef = this.modalService.show(this.modaltemplate,{backdrop : 'static',class:'modal-right'});
    if(isEdit){
      this.authService.getClientsDetails(userData.id).pipe(first())
    .subscribe(
      response => {
        this.spinner.hide();
        let clientdetails = response;
        console.log(response);
        this.userForm  =  this.formBuilder.group({
          title: [clientdetails.title, Validators.required],
          first_name: [clientdetails.first_name, Validators.required],
          last_name: [clientdetails.last_name, Validators.required],
          user_name: [clientdetails.name, Validators.required],
          postcode: [clientdetails.postcode, Validators.required],
          email: [clientdetails.email, Validators.required],
          mobile: [clientdetails.mobile, Validators.required],
          dateOfBirth: [clientdetails.dob, Validators.required],
          region: [clientdetails.region_ids, Validators.required],
          role: [clientdetails.role_ids, Validators.required],
          gender: [clientdetails.gender, Validators.required],
          services: [clientdetails.services, Validators.required],
          keysafe: [clientdetails.keynote, Validators.required],
          groups: [clientdetails.group_id, Validators.required],
        });
        // this.router.navigateByUrl('/customer');
      },
      error => {
        this.spinner.hide();
      });
     
    }

  } 
  closeModel(){
    this.modalRef.hide();
  }

  createUser(){

    this.isSubmitted = true;
    this.isDisabled = true;
    console.log(this.userForm);
    if(this.userForm.invalid){
      this.isDisabled = false;
      return;
    }
    this.spinner.show();

    let user = {
        "title": this.userForm.value.title,
        "first_name": this.userForm.value.first_name,
        "last_name": this.userForm.value.last_name,
        "email": this.userForm.value.email,
        "address": this.userForm.value.address,
        "mobile": this.userForm.value.mobile,
        "postcode": this.userForm.value.postcode,
        "dob": this.userForm.value.dob,
        "region_ids": [
            this.userForm.value.region
        ],
        "gender": this.userForm.value.gender,
        "group_id": this.userForm.value.groups,
        "services": this.userForm.value.services,
        "keynote": this.userForm.value.keysafe,
        "role_ids": [this.userForm.value.role]
    };
    console.log(user);
    this.authService.createClients(user).pipe(first())
    .subscribe(
      response => {
        this.spinner.hide();
        this.closeModel();
        this.getUsers();
      },
      error => {
          this.spinner.hide();  
          this.toastr.error(error.error.error);
          this.isSubmitted = false;
          this.isDisabled = false; 
      });
 } 

}
