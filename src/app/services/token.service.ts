import { Injectable } from '@angular/core';
import { BehaviorSubject, } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor() {
    
  }

  handle(token:any){
    this.set(token);
  }

  set(token:any){
    return localStorage.setItem('token', token);
  }
  get(){
   return localStorage.getItem('token');
  }
  remove(){
   return localStorage.removeItem('token');
  }

  isValid(){
    const token = this.get();
    if(token){
      const payload = this.payload(token);
      if(payload){
        return (payload.iss==="https://sdt.mobiletic.com/api/login" || payload.iss==="http://127.0.0.1:8000/api/login") ? true : false;
      }
    }
    return false;
  }

  payload(token:any){
    const payload = token.split('.')[1];
    return this.decode(payload);
  }

  decode(payload:any){
    return JSON.parse(atob(payload));
  }

  loggedIn(){
    return this.isValid();
  }


  private checkToken(token: string) {
   if(token){
    const expiry = (JSON.parse(atob(token?.split('.')[1]))).exp;
    // console.log("expiry",(Math.floor((new Date).getTime() / 1000)) - expiry);
    
    return (Math.floor((new Date).getTime() / 1000)) >= expiry;
   }else{
    return true;
   }
  }

  exipredToken(token: string = '') {
    let getToken:any;
    token != '' ? getToken = token : getToken = this.get();
    return this.checkToken(getToken);
  }

  getUserId(){
    const token = this.get();
    if(token){
      const payload =this.payload(token);
      if(payload){
        return payload.user_id;
      }
    }
    return false;
  }

  getUserDep(){
    const token = this.get();
    if(token){
      const payload =this.payload(token);
      if(payload){
        return payload.user_department;
      }
    }
    return false;
  }


}
