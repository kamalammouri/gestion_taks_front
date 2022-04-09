import { Component, OnInit } from '@angular/core';
import { HotToastService } from '@ngneat/hot-toast';
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  public data:any;
  public errors:any=null;
  public successMsg:any=null;
  page: number = 1;
  totalLengh: any;

  constructor(
    private authService: AuthService,
    private toast: HotToastService
    ) {}

  ngOnInit(): void {


    this.authService.contacts().pipe(
      this.toast.observe({
        loading: 'Chargement...',
        success: 'Liste des utilisateurs',
        error: 'Error.',
      })).subscribe(
      (result) => {
        this.data = result;
        this.totalLengh = this.data.length;
        console.log(this.totalLengh);
      },
      (error) => {
        this.errors = error.error.message;
      }
    );
  }


}
