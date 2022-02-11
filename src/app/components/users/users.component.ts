import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { ContactsList } from 'src/app/interfaces/contacts-list'
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
    private toastr: ToastrService
    ) {

    }

  ngOnInit(): void {


    this.authService.contacts().subscribe(
      (result) => {
        this.data = result;
        this.totalLengh = this.data.length;
        console.log(this.totalLengh);
      },
      (error) => {
        this.errors = error.error.message;
        this.toastr.error(this.errors);
      }
    );
  }


}
