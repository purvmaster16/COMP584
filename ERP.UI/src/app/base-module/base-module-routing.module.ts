import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'app/auth/helpers/auth.guards';

const routes: Routes = 
[
  {
    path: 'user',
    loadChildren: () => import('./user/user.module').then(m => m.UserModule),
    canActivate:[AuthGuard]
  },
  {
    path:'role',
    loadChildren:() => import('./role/role.module').then(m => m.RoleModule),
    canActivate:[AuthGuard]
  },
  {
    path:'user-role',
    loadChildren: () => import('./user-role-permission/user-role-permission.module').then(m => m.UserRolePermissionModule),
    canActivate:[AuthGuard]
  },
  {
    path:'role-menu',
    loadChildren: () => import('./role-menu-permission/role-menu-permission.module').then(m => m.RoleMenuPermissionModule),
    canActivate:[AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BaseModuleRoutingModule { }
