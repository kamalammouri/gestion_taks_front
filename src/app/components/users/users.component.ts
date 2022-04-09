import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { AuthStateService } from 'src/app/services/auth-state.service';
import { AuthService } from 'src/app/services/auth.service';
import { TokenService } from 'src/app/services/token.service';
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
    private toast: HotToastService,
    private tokenService: TokenService,
    private router: Router,
    private authState: AuthStateService,
    ) {}

  ngOnInit(): void {
    if(this.tokenService.ExipredToken()){
      this.tokenService.remove();
      this.authState.setAuthState(false);
      this.router.navigate(['/login']);
    };

    if (!this.tokenService.loggedIn()) {
      this.router.navigate(['/login']);
      return;
    }

    this.authService.contacts().pipe(
      this.toast.observe({
        loading: 'Chargement...',
        success: 'Liste des utilisateurs',
        error: 'Error.',
      })).subscribe(
      (result) => {
        this.data = result;
        this.totalLengh = this.data.length;
      },
      (error) => {
        this.errors = error.error.message;
      }
    );
  }


}
