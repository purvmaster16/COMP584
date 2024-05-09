import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserRolePermissionComponent } from './features/user-role-permission/user-role-permission.component';

const routes: Routes = 
[
  {
    path: 'user-role-permission',
    component: UserRolePermissionComponent,
    // resolve: {
    //   uls: UserListService
    // },
    // data: { animation: 'UserListComponent' }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRolePermissionRoutingModule { }
