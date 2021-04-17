import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { AuthService } from  './../../services/restservices/auth.service';
import { first } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { FormBuilder, FormGroup, Validators } from  '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-menu2',
  templateUrl: './menu2.component.html',
  styleUrls: ['./menu2.component.less']
})
export class Menu2Component implements OnInit {
  public users : any;
  public groups : any;
  public userForm: FormGroup;
  public isSubmitted : Boolean = false;
  public isCarerDetails : Boolean  =  false;
  public userType :any;
  dataSource: MatTableDataSource<any>;
  sortedData: any[];
  isEdit:Boolean;
  displayedColumns: string[] = ['id', 'name', 'mobile', 'action'];
  
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort: MatSort;
  

  public isDisabled : Boolean  =  false;
  public modalRef: BsModalRef;
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
          mobile: ['', Validators.required],
          role: ['', Validators.required],
          groups: ['', Validators.required],
          landline: ['', Validators.required],
          region: ['', Validators.required],
          gender: ['', Validators.required],
          dateOfBirth: ['', Validators.required]
        });
    this.getUsers();
    this.getGroups();
  }

  

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

 showCarer(id=false){
    this.isCarerDetails = !this.isCarerDetails;
    if(id){
    sessionStorage.setItem('user_id', JSON.stringify((id)));
    this.userType = 'agents';
    }
  }
 
  getUsers(){  
   this.spinner.show();
    this.authService.getUsers().pipe(first())
    .subscribe(
      response => {
        this.spinner.hide();
        this.users = response.agents;
        console.log(this.users);
        this.dataSource = new MatTableDataSource(this.users);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        // this.router.navigateByUrl('/customer');
      },
      error => {
        this.spinner.hide();
      });
 }

 getGroups(){  
   this.spinner.show();
    this.authService.getGroups('agent').pipe(first())
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
 openModel(isEdit,userData) {
    this.isEdit = isEdit;
    this.modalRef = this.modalService.show(this.modaltemplate,{backdrop : 'static',class:'modal-right'});
    if(isEdit){
      this.authService.getCarerDetails(userData.id).pipe(first())
    .subscribe(
      response => {
        this.spinner.hide();
        let carerdetails = response;
        console.log(response);
        this.userForm  =  this.formBuilder.group({
          title: [carerdetails.title, Validators.required],
          first_name: [carerdetails.first_name, Validators.required],
          last_name: [carerdetails.last_name, Validators.required],
          user_name: [carerdetails.name, Validators.required],
          postcode: [carerdetails.postcode, Validators.required],
          email: [carerdetails.email, Validators.required],
          mobile: [carerdetails.mobile, Validators.required],
          role: [carerdetails.role_ids, Validators.required],
          groups: [carerdetails.group_id, Validators.required],
          landline: [carerdetails.name, Validators.required],
          region: [carerdetails.region_ids, Validators.required],
          gender: [carerdetails.gender, Validators.required],
          dateOfBirth: [carerdetails.dob, Validators.required]
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
        "group_id": this.userForm.value.groups,
        "mobile": this.userForm.value.mobile,
        "postcode": this.userForm.value.postcode,
        "dob": this.userForm.value.dob,
        "region_ids": [
            this.userForm.value.region
        ],
        "gender": this.userForm.value.gender,
        "role_ids": [this.userForm.value.role]
    };
    console.log(user);
    this.authService.createUser(user).pipe(first())
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
