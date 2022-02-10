import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { debounceTime, distinctUntilChanged, Observable, startWith, switchMap, map} from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import {ProjectsList } from 'src/app/interfaces/projects-list';
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
  tasksList:any;

  /* Keyword for searching in data List per input  */
  keyword_projects  = 'project_name';
  keyword_users     = 'user_username';
  keyword_tasks     = 'task_name';

  public today: any;
  /* value for valid last input (task) */
  isValid = false;

  /* form validation and submitted */
  submitted = false;
  data: any;
  data2: any;
  public errors:any=null;
  public successMsg:any=null;

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router
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
        title_controlle: ['', [Validators.required]],
        description_controlle: ['', [Validators.required]],
      }
    );
  }


  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  selectEvent(item:any) {
    // do something with selected item
      this.authService.getTasksByPorject(item).subscribe(result => {
      this.tasksList = result;
      this.form.get('tasks_controlle')?.reset();
    })

  }
  onChangeSearch(val: string) {
    // fetch remote data from here
    // And reassign the 'data' which is binded to 'data' property.
  }

  selectEventTasks(item:any) {
    // do something with selected item
    console.log(item);
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

    this.authService.insertTasklog(this.data2).subscribe(
      (result) => {
        this.successMsg = result;
        setTimeout(() => {this.router.navigateByUrl("dashbord")}, 1500);
      },
      (error) => {
        this.errors = error.error.message;
      });

  }


}
