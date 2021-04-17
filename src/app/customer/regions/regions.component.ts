import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from  './../../services/restservices/auth.service';
import { first } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { FormBuilder, FormGroup, Validators } from  '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

@Component({
  selector: 'app-regions',
  templateUrl: './regions.component.html',
  styleUrls: ['./regions.component.less']
})
export class RegionsComponent implements OnInit {
  public regions : any;
  public userForm: FormGroup;
  public isSubmitted : Boolean = false;
  public isDisabled : Boolean  =  false;
  public modalRef: BsModalRef;
  @ViewChild('modaltemplate',{static: false}) modaltemplate;
  constructor(public modalService: BsModalService,private formBuilder: FormBuilder,private spinner: NgxSpinnerService,private toastr: ToastrService,private authService: AuthService) { }
  get formControls() { return this.userForm.controls; }
  ngOnInit() {
    this.userForm  =  this.formBuilder.group({
          region_address: ['', Validators.required],
          region_name: ['', Validators.required],
          region_phone: ['', Validators.required],
          region_email: ['', Validators.required],
        });
    this.getAllRegions();
  }
  getAllRegions(){  
   this.spinner.show();
    this.authService.getAllRegions().pipe(first())
    .subscribe(
      response => {
        this.spinner.hide();
        this.regions = response.regions;
        console.log(this.regions);
        
        // this.router.navigateByUrl('/customer');
      },
      error => {
        this.spinner.hide();
      });
 }
 openModel() {
    this.modalRef = this.modalService.show(this.modaltemplate,{backdrop : 'static',class:'modal-right'});

  } 
  closeModel(){
    this.modalRef.hide();
  }

  createRegions(){

    this.isSubmitted = true;
    this.isDisabled = true;
    console.log(this.userForm);
    if(this.userForm.invalid){
      this.isDisabled = false;
      return;
    }
    this.spinner.show();

    let user ={ 
    "region" : {
        "name": this.userForm.value.region_name,
        "address": this.userForm.value.region_address,
        "email": this.userForm.value.region_email,
        "phone": this.userForm.value.region_phone
    }
  };
    console.log(user);
    this.authService.createRegions(user).pipe(first())
    .subscribe(
      response => {
        this.spinner.hide();
        this.closeModel();
        this.getAllRegions();
      },
      error => {
          this.spinner.hide();  
          this.toastr.error(error.error.error);
          this.isSubmitted = false;
          this.isDisabled = false; 
      });
 } 

}
