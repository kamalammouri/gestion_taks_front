import { Component, ElementRef, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { HotToastService } from '@ngneat/hot-toast';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import {NgbAccordionConfig} from '@ng-bootstrap/ng-bootstrap';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

import { NgxSpinnerService } from "ngx-spinner";
import { TokenService } from 'src/app/services/token.service';
import { Router } from '@angular/router';
import { AuthStateService } from 'src/app/services/auth-state.service';
declare var window: any;
@Component({
  selector: 'app-dashbord',
  templateUrl: './dashbord.component.html',
  styleUrls: ['./dashbord.component.css'],
  providers: [ NgbAccordionConfig ]
})
export class DashbordComponent implements OnInit {
  modalRef?: BsModalRef;
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

    userEdit:boolean=false;
    logEditData:any;

    errors:any=null;
    loggedIn:any=false;

    constructor(

    private router: Router,
    private tokenService: TokenService,
    private authService: AuthService,
    private authState: AuthStateService,
    private toast: HotToastService,
    private formBuilder : FormBuilder,
    config: NgbAccordionConfig,
    private spinner: NgxSpinnerService,
    private modalService: BsModalService,
    ) {
      this.max = this.today = new Date().toISOString().split('T')[0];
      config.closeOthers = true;
      config.type = 'info';
    }

  ngOnInit(): void {

    if (!this.tokenService.loggedIn()) {
      this.router.navigate(['/login']);
      return;
    }

    if(this.tokenService.ExipredToken()){
      this.tokenService.remove();
      this.authState.setAuthState(false);
      this.router.navigate(['/login']);
      return;
    }

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
    this.filtreData = [];
    this.data = this.filtreDepartment(department.dept_name);
  }

  searchCleared() {
    this.data = this.datafix;
  }


  getTasklogs(data:any){
    this.spinner.show();
    this.errors = null;
    this.authService.getTasklogs(data).subscribe(
      (result) => {
        this.data = this.datafix = result;
        this.disableDepartment=true;
        this.spinner.hide();
      },(error) => {
        this.errors = error.error.message;
        this.disableDepartment=false;
        this.spinner.hide();
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
  if(taskLog.task_log_creator==this.tokenService.getUserId()){
    this.userEdit=true;
  }else{
    this.userEdit=false;

  }
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

  this.authService.deleteTasklog({"task_log_id":this.logObj.task_log_id}).pipe(
    this.toast.observe({
      loading: 'Chargement...',
      success: 'Votre tâche a été supprimé',
      error: 'Problème en suppression de la tâche.',
    })).subscribe(
    res=>{
      this.getTasklogs({ date : this.today });
      this.data=[];
      this.modalRef?.hide();
      this.formModal.hide();
  });

}


openModal(template: TemplateRef<any>) {
  this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
}

decline(): void {
  this.modalRef?.hide();
}

}
