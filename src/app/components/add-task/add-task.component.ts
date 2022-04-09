import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import {ProjectsList } from 'src/app/interfaces/projects-list';
import { HotToastService } from '@ngneat/hot-toast';

@Component({
  selector: 'add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent implements OnInit {
    form = new FormGroup({
    users_controlle: new FormControl(''),
    projects_controlle: new FormControl(''),
    tasks_controlle: new FormControl(''),
    date_controlle: new FormControl(''),
    hours_controlle: new FormControl(''),
    title_controlle: new FormControl(''),
    description_controlle: new FormControl(''),
  });

  /* List data from api */
  usersList:any;
  projectsList:any[]=[];
  tasksList:any[]=[];

  /* Keyword for searching in data List per input  */
  keyword_projects  = 'project_name';
  keyword_users     = 'user_username';
  keyword_tasks     = 'task_name';


  /* variable for date input */
  public today: any;

  public user_department: any;
  public project_id: any;
  /* variable for valid last input (task) */
  isValid = false;
  isValid_usernames = false;
  /* form validation and submitted */
  submitted = false;
  data: any;
  data2: any;
  public errors:any=null;
  public successMsg:any=null;

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router,
    private toast: HotToastService
    ) {

   }

  ngOnInit(){
    this.authService.getUsers().subscribe(result => {
      this.usersList = result;
    });

    this.authService.getProject().subscribe(result => {
      this.projectsList=result;
    });

    this.today = new Date().toISOString().split('T')[0];

    this.form = this.formBuilder.group(
      {
        users_controlle: ['', [Validators.required]],
        projects_controlle: ['', [Validators.required]],
        tasks_controlle: ['', [Validators.required]],
        date_controlle: ['', [Validators.required]],
        hours_controlle: ['', [Validators.required]],
        title_controlle: ['',],
        description_controlle: ['', [Validators.required]],
      }
    );
  }


  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  selectEventUsername(username:any) {
    // do something with selected item
    this.user_department=username.user_department;
    this.getTasks();
  }

  onChangeSearchUsername(val: string){
    console.log('search username Cleared');

    this.form.get('projects_controlle')?.reset();
    this.form.get('tasks_controlle')?.reset();
    this.tasksList = [];

  }
  searchClearedUsername() {
    console.log('search username Cleared');
    this.form.get('tasks_controlle')?.reset();

    this.tasksList = [];
    this.isValid_usernames=false;
  }

  selectEventProject(project:any,) {
    this.project_id=project.project_id;
    this.getTasks();
  }
  onChangeSearchProject(val: string) {
    // fetch remote data from here
    // And reassign the 'data' which is binded to 'data' property.
    console.log('project changed');
    this.form.get('tasks_controlle')?.reset();
    this.tasksList = [];
  }

  searchClearedProject() {
    console.log('searchCleared');
    this.form.get('tasks_controlle')?.reset();
    this.tasksList = [];
    this.isValid_usernames=false;
  }
  selectEventTasks(task:any) {
    // do something with selected item
    console.log(task);
    this.isValid=true;

  }
  onChangeSearchTasks(val: string) {
    // fetch remote data from here
    // And reassign the 'data' which is binded to 'data' property.
  }
  onFocusedTasks(e:any){
    // do something when input is focused

  }

  onSubmit(): void {

    this.submitted = true;
    this.errors=null;
    this.successMsg=null;

    if (this.form.invalid) {
      return;
    }

    this.data= this.form.value;
    this.data2={
      "task_log_creator": this.data['users_controlle'].user_id,
      "task_log_task": this.data['tasks_controlle'].task_id,
      "task_log_date": this.data['date_controlle'],
      "task_log_hours": this.data['hours_controlle'],
      "task_log_name": this.data['title_controlle'],
      "task_log_description": this.data['description_controlle']
    };

      this.authService.insertTasklog(this.data2).pipe(
        this.toast.observe({
          loading: 'Chargement...',
          success: 'la tache a été ajouté!',
          error: 'Error la tache n\'a pas ajouté',
        })).subscribe( (result) => { this.formCleared() });
  }

  //clear form after submited
  formCleared(){
    this.form.get('tasks_controlle')?.reset();
    this.form.get('hours_controlle')?.reset();
    this.form.get('title_controlle')?.reset();
    this.form.get('description_controlle')?.reset();
    this.form.get('tasks_controlle')?.setErrors(null);
    this.form.get('hours_controlle')?.setErrors(null);
    this.form.get('title_controlle')?.setErrors(null);
    this.form.get('description_controlle')?.setErrors(null);
  }

 getTasks(){
  let data = {'user_department':this.user_department,'project_id':this.project_id};
  console.log(data);
  // do something with selected item
    if(this.user_department!=null && this.project_id!=null){
      this.authService.getTasksByPD(data).pipe(
        this.toast.observe({
          loading: 'Chargement...',
          success: 'les taches disponible!',
          error: 'Aucune tache disponible',
        })).subscribe(
        (result) => {
        this.tasksList=[];
        this.form.get('tasks_controlle')?.reset();
        this.tasksList = result;
        console.log(this.tasksList);
        this.isValid_usernames=true;
        },
        (error) => {
          this.errors = error.error.message;
        });

    }
  }
}
