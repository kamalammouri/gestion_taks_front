import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule,ReactiveFormsModule  }   from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import {NgxPaginationModule} from 'ngx-pagination';
import { CommonModule } from "@angular/common";
import { HotToastModule } from '@ngneat/hot-toast';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {LocationStrategy, HashLocationStrategy} from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { UsersComponent } from './components/users/users.component';
import { DashbordComponent } from './components/dashbord/dashbord.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { AddUserComponent } from './components/add-user/add-user.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { RouterModule } from '@angular/router';
import { AddTaskComponent } from './components/add-task/add-task.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {AutocompleteLibModule} from 'angular-ng-autocomplete';
import {NgbAccordionConfig} from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerModule } from "ngx-spinner";
import { Placement as PopperPlacement, Options } from '@popperjs/core';
import { ModalModule} from 'ngx-bootstrap/modal';
import { AuthInterceptor } from './services/auth.interceptor';
@NgModule({
  declarations: [

    AppComponent,
    LoginComponent,
    RegisterComponent,
    UsersComponent,
    DashbordComponent,
    NotFoundComponent,
    AddUserComponent,
    NavbarComponent,
    AddTaskComponent
  ],
  imports: [
    ModalModule.forRoot(),
    NgxSpinnerModule,
    NgbModule,
    HotToastModule.forRoot(),
    CommonModule,
    AutocompleteLibModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    HttpClientModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
    NgxPaginationModule,
  ],
  providers: [ {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  },
    {provide: LocationStrategy, useClass: HashLocationStrategy}
  ],
  bootstrap: [AppComponent,NgbAccordionConfig,]
})
export class AppModule { }
