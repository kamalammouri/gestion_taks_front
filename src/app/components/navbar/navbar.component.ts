import { Component,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthStateService } from 'src/app/services/auth-state.service';
import { AuthService } from 'src/app/services/auth.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  public admin:any=null;
  loggedIn:boolean=false;
  constructor(
    private tokenService: TokenService,
    private router: Router,
    private auth: AuthStateService,
  ) {}

  navbarOpen = false;

  toggleNavbar() {
    this.navbarOpen = !this.navbarOpen;
  }
  ngOnInit(): void {

    this.auth.userAuthState.subscribe(val => {
      this.loggedIn = val
    });
  }

  logout($event:MouseEvent){
    //event.preventDefault();
        this.tokenService.remove();
        this.auth.setAuthState(false);
        this.router.navigate(['login']);
  }


}
