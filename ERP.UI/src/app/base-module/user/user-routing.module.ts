import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserListComponent } from './features/user-list/user-list.component';
import { UserListService } from 'app/main/apps/user/user-list/user-list.service';
import { UserEditService } from 'app/main/apps/user/user-edit/user-edit.service';
import { UserViewService } from 'app/main/apps/user/user-view/user-view.service';
import { UserAddComponent } from './features/user-manage/user-add/user-add.component';
import { ChangePasswordComponent } from './features/user-manage/change-password/change-password.component';
import { UserInformationComponent } from './features/user-manage/user-information/user-information.component';
import { UserSocialComponent } from './features/user-manage/user-social/user-social.component';
import { UserDetailComponent } from './features/user-detail/user-detail.component';

const routes: Routes = 
[
  {
    path: 'user-list',
    component: UserListComponent,
    resolve: {
      uls: UserListService
    },
    data: { animation: 'UserListComponent' }
  },
  {
    path: 'user-detail/:id?',
    component: UserDetailComponent
  },
  { 
    path: 'user-manage',
    loadChildren: () => import('./features/user-manage/user-manage.module').then(m => m.UserManageModule) 
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
