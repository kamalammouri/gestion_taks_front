import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { UsersComponent } from './components/users/users.component';
import { DashbordComponent } from './components/dashbord/dashbord.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { AddUserComponent } from './components/add-user/add-user.component';
import { AddTaskComponent } from './components/add-task/add-task.component';
import { GeneraleGuard } from './guard/generale.guard';

export const routes: Routes = [
  { path:  "",                       redirectTo:"/dashbord", pathMatch: "full"},
  { path:  "login",                  component:LoginComponent},
  { path:  "register",               component:RegisterComponent, canActivate : [GeneraleGuard]},
  { path:  "dashbord",               component:DashbordComponent, canActivate : [GeneraleGuard]},
  { path:  "add-task",               component:AddTaskComponent, canActivate : [GeneraleGuard]},
  { path:  "users",                  component:UsersComponent, canActivate : [GeneraleGuard]},
  { path:  "users/add-user",         component:AddUserComponent, canActivate : [GeneraleGuard]},
  { path:  "**",                     component:NotFoundComponent, canActivate : [GeneraleGuard]},
]

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
