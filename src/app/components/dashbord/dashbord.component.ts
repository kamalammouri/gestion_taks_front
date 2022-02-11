import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-dashbord',
  templateUrl: './dashbord.component.html',
  styleUrls: ['./dashbord.component.css']
})
export class DashbordComponent implements OnInit {

    /* variable for date input */
    public today: any;
    public request:any;
    public data:any;
    public dateChange:any;
    public errors:any=null;
    public successMsg:any=null;
  constructor(
    private authService: AuthService
    ) { }

  ngOnInit(): void {
    this.today = new Date().toISOString().split('T')[0];
    this.request= { date: this.today };
    console.log(this.request);
    this.authService.getTasklogs(this.request).subscribe(
      (result) => {
        this.data = result;
        console.log(this.data);
      },
      (error) => {
        this.errors = error.error.message;
      }
    );
  }

  dateChanged(date:any){
    this.dateChange = {'date':date};
    this.authService.getTasklogs(this.dateChange).subscribe(
      (result) => {
        this.data = result;
        console.log(this.data);
        if(this.data.length <= 0){
          this.errors='Aucune data disponible';
        }
        else{ this.errors=null; }
      },
      (error) => {
        this.errors = error.error.message;
      }
    );
  }

}
