import { Component, OnInit } from '@angular/core';
import { AuthService } from  '../services/auth.service';
import { first } from 'rxjs/operators';
import { Router } from  '@angular/router';
import { FormBuilder, FormGroup, Validators } from  '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup;
  public isSubmitted : Boolean = false;
  public isDisabled : Boolean  =  false;

  constructor(private spinner: NgxSpinnerService,private toastr: ToastrService,private formBuilder: FormBuilder,private authService: AuthService,public router: Router,) { }
 
  get formControls() { return this.loginForm.controls; }

  ngOnInit() {
 
        this.loginForm  =  this.formBuilder.group({
          user_name:  ['', [Validators.required, Validators.email]],
          password: ['', Validators.required],
          remember_me : false
        });
 
  }
  login(){  
    this.isSubmitted = true;
    this.isDisabled = true;
    if(this.loginForm.invalid){
      this.isDisabled = false;
      return;
    }
    this.spinner.show();
    let user = {
      email : this.loginForm.value.user_name.toLowerCase(),
      password : this.loginForm.value.password,
    };
    this.authService.login(user).subscribe(
      response => {
        this.spinner.hide();
        this.toastr.success('Logged in successfully');
        let res = response;
        //console.log(response.stringify);
        //sessionStorage.setItem('token', JSON.stringify(response.headers)); 
        if(res.roles[0].name == 'Carer'){
          sessionStorage.setItem('token', JSON.stringify('Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxIiwic2NwIjoidXNlciIsImF1ZCI6bnVsbCwiaWF0IjoxNjE3MTg1MDc0LCJleHAiOjE2MTc3ODk4NzQsImp0aSI6IjY3MTA5NzE4LTNlNDktNDk2YS1iOTcxLWZmMjA1NWNhMmI3ZSJ9.9DN4_M2KVJKpDwL4FyMSxeDRzoc4TELpY9oJApBvncU'));
          sessionStorage.setItem('role', JSON.stringify(('carer')));
          this.router.navigateByUrl('/customer/appointment');
        }else{
          sessionStorage.setItem('token', JSON.stringify('Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxIiwic2NwIjoidXNlciIsImF1ZCI6bnVsbCwiaWF0IjoxNjE3MTg1MDc0LCJleHAiOjE2MTc3ODk4NzQsImp0aSI6IjY3MTA5NzE4LTNlNDktNDk2YS1iOTcxLWZmMjA1NWNhMmI3ZSJ9.9DN4_M2KVJKpDwL4FyMSxeDRzoc4TELpY9oJApBvncU'));
          sessionStorage.setItem('role', JSON.stringify(('admin')));
          this.router.navigateByUrl('/customer/dashboard');
        }

        if(this.loginForm.value.remember_me == true){  
          localStorage.setItem('remember_me', 'true');
          localStorage.setItem('user_name', this.loginForm.value.user_name);
          localStorage.setItem('password', this.loginForm.value.password);
        }else{
          localStorage.setItem('remember_me', 'false');
          localStorage.removeItem('user_name');
          localStorage.removeItem('password');  
        }        
        
      },
      error => {
          this.spinner.hide();  
          this.toastr.error(error.error.error);
          this.isSubmitted = false;
          this.isDisabled = false; 
      });
 } 

}
