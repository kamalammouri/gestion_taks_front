import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment'
import { ContactsList } from '../interfaces/contacts-list';
import { ProjectsList } from '../interfaces/projects-list';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) {
  }

  login(data:any){
    return this.http.post(environment.api+'login',data);
  }

  add_user(user:any) {
    return this.http.post(environment.api+'add_user',user);
  }

  contacts(): Observable<ContactsList> {
    return this.http.get<ContactsList>(environment.api+'contacts');
  }

  getUsers(){
    return this.http.get(environment.api+'getUsers');
  }

  getProject(): Observable<ProjectsList[]>{
    return this.http.get<ProjectsList[]>(environment.api+'getProject');
  }

  getTasksByPorject(id:any){
    return this.http.post(environment.api+'getTasksByProject',id);
  }

  getTasks(){
    return this.http.get(environment.api+'getTasks');
  }

  insertTasklog(data:any){
    return this.http.post(environment.api+'insertTasklog',data);
  }
}
