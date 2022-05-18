import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthStateService } from '../services/auth-state.service';
import { TokenService } from '../services/token.service';

@Injectable({
  providedIn: 'root'
})
export class GeneraleGuard implements CanActivate {
  tokenValid: boolean = true;
  constructor(private router: Router,private tokenService: TokenService,private authState: AuthStateService){
    this.tokenService.tokenValid.subscribe(res => this.tokenValid = res)
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      // || !this.tokenIsInvalid
      if (!this.tokenValid) {
          this.tokenService.remove();
          this.authState.setAuthState(false);
          this.router.navigate(['/login']);
          return false
      }

    return true;
  }

}
