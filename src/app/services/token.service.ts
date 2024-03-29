import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor() { }

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
      const payload =this.payload(token);
      if(payload){
        return (payload.iss==="https://sdt.mobiletic.com/api/login")?true:false;
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


  private tokenExpired(token: string) {
    const expiry = (JSON.parse(atob(token.split('.')[1]))).exp;
    return (Math.floor((new Date).getTime() / 1000)) >= expiry;
  }

  ExipredToken() {
    const token:any = this.get();
    if (this.tokenExpired(token)) {
      return true;
    }
    return false;
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
