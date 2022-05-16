import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { UserComponent } from './user/user.component';
import { AdminLayoutComponent } from './admin-layout/admin-layout.component';

const routes: Routes = [
  
  // basic routes
  { 
    path: '',
    component: AdminLayoutComponent, 
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'user', component: UserComponent }
    ]
  },
  // login route
  { path: 'adminlogin', component: LoginComponent },
  // redirect to home
 /*  { path: '**', redirectTo: '' } */
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
