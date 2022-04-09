import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { AuthStateService } from 'src/app/services/auth-state.service';
import { AuthService } from 'src/app/services/auth.service';
import { TokenService } from 'src/app/services/token.service';

import { HotToastService } from '@ngneat/hot-toast';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  form: FormGroup = new FormGroup({
    user_username: new FormControl(''),
    user_password: new FormControl(''),
  });
  submitted = false;
  data: any ;

  public errors:any=null;
  public successMsg:any=null;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private tokenService: TokenService,
    private authState: AuthStateService,

    private toast: HotToastService,
    ) { }



  ngOnInit(): void {

    if (this.tokenService.loggedIn()) {
      this.router.navigate(['/dashbord']);
      return;
    }

    this.form = this.formBuilder.group(
      {
        user_username: ['', [Validators.required]],
        user_password: [
          '',
          [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(40)
          ]
        ]
      }
    );
  }

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  onSubmit(): void {
    this.submitted = true;
    this.errors=null;
    this.successMsg=null;

    if (this.form.invalid) {
      return;
    }
    this.authService.login(this.form.value).pipe(
      this.toast.observe({
        loading: 'Chargement...',
        success: 'Vous êtes connecté!',
        error: 'Mot de passe ou nom d\'utilisateur incorrect',
      })).subscribe(
      (result) => {
        this.successMsg = result;
        setTimeout(() => { this.router.navigateByUrl("dashbord") }, 1500);
        this.tokenService.set(this.successMsg.access_token);
      },
      (error) => {
        this.errors = error.error.message;
      },() => {
        this.authState.setAuthState(true);
        this.form.reset()
        this.router.navigate(['dashbord']);
      }
      );
  }

}
