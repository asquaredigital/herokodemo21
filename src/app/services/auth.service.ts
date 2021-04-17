import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { InterceptorService } from "./interceptor.service";
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public api_url = environment.url;
  public headers = new HttpHeaders({'Content-Type': 'application/json'});
  public httpOptions = { headers: this.headers };


  constructor(private http: HttpClient , private interceptor: InterceptorService) {}


  public login(params) {
    let param = {
      "user" : params
    }

    //let url = 'https://reqres.in/api/login';
    //return this.interceptor.createData(url,params); 
    let api_url = 'http://freshcare.herokuapp.com/users/sign_in/';
    let x = this.interceptor.createData(api_url,param);
    /*console.log('xx ---', x);
    x.subscribe(resp => {
      // display its headers
      const keys = resp.headers.keys();
      console.log('asafg ',keys);
    });*/
    return x; 
  }
  public getUsers(){    
    let url = this.api_url+'/api/users?page=2';
    return this.interceptor.retrieveData(url); 
  }

}