import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthStateService } from '../services/auth-state.service';
import { TokenService } from '../services/token.service';

@Injectable({
  providedIn: 'root'
})
export class GeneraleGuard implements CanActivate {
  isValidToken: boolean = true;
  constructor(private router: Router,private tokenService: TokenService,private authState: AuthStateService){
    this.tokenService.tokenIsInvalid.subscribe(isValid => this.isValidToken = isValid)
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      // || !this.isValidToken
      if (!this.tokenService.loggedIn() || this.tokenService.exipredToken()) {
          this.tokenService.remove();
          this.authState.setAuthState(false);
          this.router.navigate(['/login']);
          return false
      }

    return true;
  }

}
