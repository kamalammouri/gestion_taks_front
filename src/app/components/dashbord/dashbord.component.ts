import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { HotToastService } from '@ngneat/hot-toast';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';

declare var window: any;
@Component({
  selector: 'app-dashbord',
  templateUrl: './dashbord.component.html',
  styleUrls: ['./dashbord.component.css']
})
export class DashbordComponent implements OnInit {
  logDetail !: FormGroup;
  logObj : any;
  formModal: any;
  fix:any;
    /* variable for date input */
    today: any;
    max:any;
    data:any;
    datafix:any;
    filtreData:any[]=[];
    departments:any;
    keyword_departments  = 'dept_name';
    submitted = false;
    clearDepartment:any;
    disableDepartment:any=false;

    logEditData:any;

    errors:any=null;

    constructor(
    private authService: AuthService,
    private toast: HotToastService,
    private formBuilder : FormBuilder,
    ) {
      this.max = this.today = new Date().toISOString().split('T')[0];
    }

  ngOnInit(): void {

    this.formModal = new window.bootstrap.Modal(
      document.getElementById('editLog')
    );

    this.logDetail = this.formBuilder.group({
      task_log_id : ['', [Validators.required]],
      task_log_hours: ['', [Validators.required]],
      task_log_name : [''],
      task_log_description: ['', [Validators.required]],
      task_log_date: ['', [Validators.required]]
    });

    this.getTasklogs({ date : this.today });
    this.getDepartment();
  }

  get f(): { [key: string]: AbstractControl } {
    return this.logDetail.controls;
  }

  dateChanged(date:any){
    this.data = [];
    this.getTasklogs({ date : date });
    this.clearDepartment = '';
  }


  selectEvent(department:any) {
    // do something with selected item
    console.log(department.dept_name);
    this.filtreData = [];
    this.data = this.filtreDepartment(department.dept_name);
    console.log(this.data);
  }

  searchCleared() {
    console.log('department cleared');
    this.data = this.datafix;
    console.log(this.data);
  }


  getTasklogs(data:any){
    this.errors = null;
    this.authService.getTasklogs(data).subscribe(
      (result) => {
        this.data = this.datafix = result;
        this.disableDepartment=true;
        console.log(this.data);
      },(error) => {
        this.errors = error.error.message;
        this.disableDepartment=false;
      });
  }

  getDepartment(){
    this.authService.getDepartment().subscribe(
      (result) => {
        this.departments = result;
      });
  }

  filtreDepartment(department:Number){
    if(this.datafix){
      for(let i of this.datafix){
        if(i.dept_name === department){
          this.filtreData.push(i);
        }
      }
      return this.filtreData;
    }
    return "vide";
  }



  /////////////////// task log edit 7/////////////
editLog(taskLog : any) {

  this.logObj=null;
  this.logDetail.controls['task_log_id'].setValue(taskLog.task_log_id);
  this.logDetail.controls['task_log_hours'].setValue(taskLog.task_log_hours);
  this.logDetail.controls['task_log_name'].setValue(taskLog.task_log_name);
  this.logDetail.controls['task_log_description'].setValue(taskLog.task_log_description);
  this.logDetail.controls['task_log_date'].setValue(taskLog.task_log_date.split(' ')[0]);

  this.logObj = this.logDetail.value;
}

updatetaskLog() {
  this.submitted = true;

  if (this.logDetail.invalid) {
    return;
  }
  if(this.logDetail.value!=this.logObj){
    this.authService.updateTasklog(this.logDetail.value).pipe(
      this.toast.observe({
        loading: 'Chargement...',
        success: 'La modification est faite',
        error: 'Problème de la modification.',
      })).subscribe(res=>{
      console.log(res);
      this.data=[];
      this.getTasklogs({ date : this.today });
      this.formModal.hide();
    })
  }
  else{
  this.toast.warning('Aucune modification n\'a été effectuée!');
  }
}

deletetaskLog() {
  console.log(this.logObj.task_log_id);
  this.authService.deleteTasklog({"task_log_id":this.logObj.task_log_id}).pipe(
    this.toast.observe({
      loading: 'Chargement...',
      success: 'Votre tâche a été supprimé',
      error: 'Problème en suppression de la tâche.',
    })).subscribe(
    res=>{
      console.log(res);
      this.getTasklogs({ date : this.today });
  });

}

}
