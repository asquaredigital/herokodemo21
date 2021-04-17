import { Injectable } from '@angular/core';
import { environment } from './../../../environments/environment';
import { InterceptorService } from "./interceptor.service";
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public api_url = environment.url;
  

  constructor(private http: HttpClient , private interceptor: InterceptorService) {}


  public login(params) {
    let url = this.api_url+'/login';
    return this.interceptor.createData(url,params); 
  }

  public isLoggedIn(){
    return sessionStorage.getItem('CURRENT_USER') !== null;
  }

  public logout(){
    sessionStorage.clear();
    return true;
  }

  public getUsers(){    
    let url = this.api_url+'/agents';
    return this.interceptor.retrieveData(url); 
  }
  public getCarerDetails(id){    
    let url = this.api_url+'/agents/'+id;
    return this.interceptor.retrieveData(url); 
  }
  public getClientsDetails(id){    
    let url = this.api_url+'/clients/'+id;
    return this.interceptor.retrieveData(url); 
  }

  public getGroups(type){    
    let url = this.api_url+'/groups?filter[by_group_type][]='+type;
    return this.interceptor.retrieveData(url); 
  }

  public getAllGroups(){    
    let url = this.api_url+'/groups';
    return this.interceptor.retrieveData(url); 
  }

  public getAllRegions(){    
    let url = this.api_url+'/regions';
    return this.interceptor.retrieveData(url); 
  }

  public getClients(){    
    let url = this.api_url+'/clients';
    return this.interceptor.retrieveData(url); 
  }

  public getUserDetails(id,type){    
    let url = this.api_url+'/'+type+'/'+id;
    return this.interceptor.retrieveData(url); 
  }

  public getUserAppt(id,type){ 
    let url = '';
    if(type=='clients'){
     url = this.api_url+'/appointments?filter[by_client_id][]='+id;
    }else{
     url = this.api_url+'/appointments?filter[by_agent_id][]='+id;
    }
    return this.interceptor.retrieveData(url); 
  }

  public getDairy(){    
    let url = this.api_url+'/feedbacks';
    return this.interceptor.retrieveData(url); 
  }

  public getCarerAppointments(){    
    let url = this.api_url+'/appointments/carer';
    return this.interceptor.retrieveData(url); 
  }

  public checkout(params,id){    
    let url = this.api_url+'/appointments/'+id+'/close_appointment';
    return this.interceptor.createData(url,params); 
  }

  public checkIn(app_id,params){    
    let url = this.api_url+'/appointments/'+app_id+'/update_progress';
    return this.interceptor.createData(url,params); 
  }

  public getAppointments(){    
    let url = this.api_url+'/appointments';
    return this.interceptor.retrieveData(url); 
  }

  public createUser(params){    
    let url = this.api_url+'/agents';
    return this.interceptor.createData(url,params); 
  }

  public createGroups(params){    
    let url = this.api_url+'/groups';
    return this.interceptor.createData(url,params); 
  }

  public createRegions(params){    
    let url = this.api_url+'/regions';
    return this.interceptor.createData(url,params); 
  }

  public createClients(params){    
    let url = this.api_url+'/clients';
    return this.interceptor.createData(url,params); 
  }

   public createAppointments(params){    
    let url = this.api_url+'/appointments';
    return this.interceptor.createData(url,params); 
  }
  public createAppointmentReoccur(params){    
    let url = this.api_url+'/appointments/create_recurring';
    return this.interceptor.createData(url,params); 
  }

  public createDairy(params){    
    let url = this.api_url+'/feedbacks';
    return this.interceptor.createData(url,params); 
  }

}