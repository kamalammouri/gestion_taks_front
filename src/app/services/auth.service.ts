import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../environments/environment'
import { ContactsList } from '../interfaces/contacts-list';
import { ProjectsList } from '../interfaces/projects-list';
import { UserInfo } from '../interfaces/user-info';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly IMGUR_UPLOAD_URL = 'https://api.imgur.com/3/image';
  private readonly clientId = 'c0db25611e74b79';

  constructor(private http: HttpClient) {
  }

  uploadImage(image:File):Observable<any>{
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: `Client-ID ${this.clientId}`
      }),
    };
    const formData = new FormData();
    formData.append('image', image);
    return this.http.post<any>(`${this.IMGUR_UPLOAD_URL}`, formData, httpOptions);
  }

  login(data:any):Observable<any[]>{
    return this.http.post<any[]>(environment.api+'login',data);
  }

  logout():Observable<any[]>{
    return this.http.get<any[]>(environment.api+'logout');
  }


  add_user(user:any):Observable<any[]> {
    return this.http.post<any[]>(environment.api+'add_user',user);
  }

  contacts(): Observable<any> {
    return this.http.get<any>(environment.api+'contacts');
  }

  /*getUsers(){
    return this.http.get(environment.api+'getUsers');
  }*/

  getUserInfo(id:any): Observable<UserInfo[]>{
    return this.http.post<UserInfo[]>(environment.api+'getUserId',id);
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

  getTasklogs(date:any):Observable<any[]>{
    return this.http.post<any[]>(environment.api+'getTasklog',date);
  }

  getTasklogsTime(data:any):Observable<any[]>{
    return this.http.post<any[]>(environment.api+'getTasklogTime',data);
  }

  getTasklogId(id:any):Observable<any[]>{
    return this.http.post<any[]>(environment.api+'getTasklogId',id);
  }

  updateTasklog(date:any):Observable<any[]>{
    return this.http.post<any[]>(environment.api+'updateTasklog',date);
  }

  deleteTasklog(date:any):Observable<any[]>{
    return this.http.post<any[]>(environment.api+'deleteTasklog',date);
  }
}
