import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from  './../../services/restservices/auth.service';
import { first } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { FormBuilder, FormGroup, Validators } from  '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.less']
})
export class GroupsComponent implements OnInit {
  public groups : any;
  public userForm: FormGroup;
  public isSubmitted : Boolean = false;
  public isDisabled : Boolean  =  false;
  public modalRef: BsModalRef;
  @ViewChild('modaltemplate',{static: false}) modaltemplate;
  constructor(public modalService: BsModalService,private formBuilder: FormBuilder,private spinner: NgxSpinnerService,private toastr: ToastrService,private authService: AuthService) { }
  get formControls() { return this.userForm.controls; }
  ngOnInit() {
    this.userForm  =  this.formBuilder.group({
          group_type: ['', Validators.required],
          group_name: ['', Validators.required],
        });
    this.getAllGroups();
  }
  getAllGroups(){  
   this.spinner.show();
    this.authService.getAllGroups().pipe(first())
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

  } 
  closeModel(){
    this.modalRef.hide();
  }

  createGroups(){

    this.isSubmitted = true;
    this.isDisabled = true;
    console.log(this.userForm);
    if(this.userForm.invalid){
      this.isDisabled = false;
      return;
    }
    this.spinner.show();

    let user ={ 
    "group" : {
        "group_type": this.userForm.value.group_type,
        "name": this.userForm.value.group_name,
        "description": 'testing'
    }
  };
    console.log(user);
    this.authService.createGroups(user).pipe(first())
    .subscribe(
      response => {
        this.spinner.hide();
        this.closeModel();
        this.getAllGroups();
      },
      error => {
          this.spinner.hide();  
          this.toastr.error(error.error.error);
          this.isSubmitted = false;
          this.isDisabled = false; 
      });
 } 

}
