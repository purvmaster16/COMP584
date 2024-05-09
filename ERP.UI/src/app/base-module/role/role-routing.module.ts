import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoleListComponent } from './features/role-list/role-list.component';
import { RoleEditComponent } from './features/role-edit/role-edit.component';
import { RoleAddComponent } from './features/role-add/role-add.component';
import { UserListComponent } from '../user/features/user-list/user-list.component';
import { UserListService } from 'app/main/apps/user/user-list/user-list.service';

const routes: Routes = 
[
  {
    path: 'role-list',
    component: RoleListComponent,
    resolve: {
      uls: UserListService
    },
    data: { animation: 'UserListComponent' }
  },
  {
    path: 'role-add',
    component: RoleAddComponent,
    // resolve: {
    //   uls: UserListService
    // },
    // data: { animation: 'UserListComponent' }
  },
  {
    path: 'role-edit/:id',
    component: RoleEditComponent,
    // resolve: {
    //   ues: UserEditService
    // },
    // data: { animation: 'UserEditComponent' }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RoleRoutingModule { }
