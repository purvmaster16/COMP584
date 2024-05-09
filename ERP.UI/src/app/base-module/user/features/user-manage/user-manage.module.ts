import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserManageComponent } from './user-manage.component';
import { UserAddComponent } from './user-add/user-add.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CoreSidebarModule } from '@core/components';
import { CoreDirectivesModule } from '@core/directives/directives';
import { CorePipesModule } from '@core/pipes/pipes.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { Ng2FlatpickrModule } from 'ng2-flatpickr';
import { UserInformationComponent } from './user-information/user-information.component';
import { UserSocialComponent } from './user-social/user-social.component';
import { PasswordPatternDirective } from 'app/core/directive/password-pattern.directive';
import { MatchPasswordDirective } from 'app/core/directive/match-password.directive';

const routes: Routes = [
  {
    path: "",
    component: UserManageComponent,
    children: [
      {
        path: '',
        redirectTo: 'user-add',
        pathMatch: 'full'
      },
      {
        path: 'user-add', component: UserAddComponent
      },
      {
        path: 'user-add/:id?', component: UserAddComponent
      },
      {
        path: 'user-change-password', component: ChangePasswordComponent
      },
      {
        path: 'user-change-password/:id?', component: ChangePasswordComponent
      },
      {
        path: 'user-information', component: UserInformationComponent
      },
      {
        path: 'user-information/:id?', component: UserInformationComponent
      },
      {
        path: 'user-social', component: UserSocialComponent
      },
      {
        path: 'user-social/:id?', component: UserSocialComponent
      }
    ]
  },
];

@NgModule({
  declarations: [
    UserManageComponent,
    UserAddComponent,
    ChangePasswordComponent,
    UserInformationComponent,
    UserSocialComponent,
    PasswordPatternDirective,
    MatchPasswordDirective
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    RouterModule,
    FormsModule,
    NgbModule,
    NgSelectModule,
    Ng2FlatpickrModule,
    NgxDatatableModule,
    CorePipesModule,
    CoreDirectivesModule,
    CoreSidebarModule,
    ReactiveFormsModule
  ]
})
export class UserManageModule { }
