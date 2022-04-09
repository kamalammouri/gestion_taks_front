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

  contacts(): Observable<any> {
    return this.http.get<any>(environment.api+'contacts');
  }

  getUsers(){
    return this.http.get(environment.api+'getUsers');
  }

  getProject(): Observable<ProjectsList[]>{
    return this.http.get<ProjectsList[]>(environment.api+'getProject');
  }

  getDepartment(): Observable<any[]>{
    return this.http.get<any[]>(environment.api+'getDepartment');
  }

  /*getTasksByPorject(id:any){
    return this.http.post(environment.api+'getTasksByProject',id);
  }*/

  getTasksByPD(data:any):Observable<any[]>{
    return this.http.post<any[]>(environment.api+'getTasksbyPD',data);
  }


  insertTasklog(data:any):Observable<any[]>{
    return this.http.post<any[]>(environment.api+'insertTasklog',data);
  }

  getTasklogs(date:any){
    return this.http.post(environment.api+'getTasklog',date);
  }

  getTasklogId(id:any){
    return this.http.post(environment.api+'getTasklogId',id);
  }

  updateTasklog(date:any){
    return this.http.post(environment.api+'updateTasklog',date);
  }

  deleteTasklog(date:any){
    return this.http.post(environment.api+'deleteTasklog',date);
  }
}
