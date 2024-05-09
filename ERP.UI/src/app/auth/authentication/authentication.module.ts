import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { VerifyEmailComponent } from './verify-email/verify-email.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  // {
  //   path: '',
  //   redirectTo: '/auth/login',
  //   pathMatch: 'full'
  // },
  {
    path: 'register',
    component: RegisterComponent
  },

  {
    path: 'verify-email',
    component: VerifyEmailComponent
  }
];

@NgModule({
  declarations: [LoginComponent,RegisterComponent, VerifyEmailComponent],
  imports: [
    CommonModule, RouterModule.forChild(routes) ,FormsModule, ReactiveFormsModule,NgbModule
  ]
})
export class AuthenticationModule { }
