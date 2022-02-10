import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';


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
    ) { }



  ngOnInit(): void {

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
    this.authService.login(this.form.value).subscribe(
      (result) => {
        this.successMsg = result;
        setTimeout(() => {this.router.navigateByUrl("home")}, 1500);
        console.log(this.successMsg);
      },
      (error) => {
        this.errors = error.error.message;
        console.log(this.errors);
      }
      );
  }

}
