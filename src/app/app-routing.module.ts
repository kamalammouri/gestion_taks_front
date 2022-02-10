import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { UsersComponent } from './components/users/users.component';
import { DashbordComponent } from './components/dashbord/dashbord.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { AddUserComponent } from './components/add-user/add-user.component';
import { AddTaskComponent } from './components/add-task/add-task.component';

export const routes: Routes = [
  { path:  "",                       redirectTo:"/dashbord", pathMatch: "full"},
  { path:  "dashbord",               component:DashbordComponent},
  { path:  "login",                  component:LoginComponent},
  { path:  "register",               component:RegisterComponent},
  { path:  "users/add-user",         component:AddUserComponent},
  { path:  "users",                  component:UsersComponent},
  { path:  "add-task",                  component:AddTaskComponent},
  { path:  "**",                     component:NotFoundComponent},
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
