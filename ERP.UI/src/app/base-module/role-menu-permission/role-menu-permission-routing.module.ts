import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoleMenuPermissionComponent } from './features/role-menu-permission/role-menu-permission.component';

const routes: Routes = [
  {
    path: 'role-menu-permission',
    component: RoleMenuPermissionComponent,
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
export class RoleMenuPermissionRoutingModule { }
