import { Component, OnInit } from '@angular/core';
import { RoleMenuPermissionService } from '../../service/role-menu-permission.service';
import { RoleService } from 'app/base-module/role/service/role.service';
import { CoreConstants } from 'app/core/constants/core.constants';
import { MessageConstants } from 'app/core/constants/message.constants';
import { ToastrService } from 'ngx-toastr';
import { BlockUI, NgBlockUI } from 'ng-block-ui';

@Component({
  selector: 'app-role-menu-permission',
  templateUrl: './role-menu-permission.component.html',
  styleUrls: ['./role-menu-permission.component.scss']
})
export class RoleMenuPermissionComponent implements OnInit {


  constructor(private roleMenuservice:RoleMenuPermissionService,private roleService:RoleService, private _toastrService: ToastrService) { }
  
  roles:any;
   // Default selected role
  menuPermissions: any[] = [];
  selectedRole: any;

  ngOnInit(): void {
    // Simulate fetching menu permissions based on selected role
    this.getRoleList()
  }

  getRoleList(){
    this.roleService.getList().subscribe({
      next: (res:any) => 
      { 
        this.roles = res.data
        if (this.roles.length > 0) {
          // Select the first role by default
          this.selectedRole = this.roles[0].id;
          // Fetch menu permissions for the selected role
          this.getMenuPermissions(this.selectedRole);
        }
      },
      error: (err:any) => { console.log(err)}
    })
  }

  handleRoleChange(selectedRole:any): void {
    this.getMenuPermissions(selectedRole);
  }
  

  getMenuPermissions(roleId:any): void {
    this.roleMenuservice.GetMenuRoleMapList(roleId).subscribe({
      next: (res:any) => {
        this.menuPermissions = res.data
      },
      error: (err:any) => {console.log(err)}
    })
  }

  updatePermission(index: number, type: string, checked: boolean): void {
    this.menuPermissions[index][type] = checked;
  }
  

  saveChanges(): void {
    this.roleMenuservice.AddMenuRoleMap(this.menuPermissions).subscribe({
      next: (res:any) => {console.log(res,"Post Response")},
      error:(err:any) => {console.log(err)}
    })
  }
}


// export class RoleMenuPermissionComponent implements OnInit {

//   @BlockUI() blockUI: NgBlockUI;

//   constructor(private roleMenuservice:RoleMenuPermissionService,private roleService:RoleService, private _toastrService: ToastrService) { }
  
//   modules:any;
//   roleMenus:any;

//   // roles: Roles[] = [
//   //   { rolename: 'HR', roleid: '1', modules: [1, 2] },
//   //   { rolename: 'Admin', roleid: '2', modules: [1, 2] }
//   // ];

//   // modules: Module[] = [
//   //   { modulename: 'Product', moduleID: 1 },
//   //   { modulename: 'User', moduleID: 2 }
//   // ];

//   ngOnInit(): void {

//     //Role-Menu-List
//      this.GetAllRoleMenuPermission()

//     //Module-list
//     this.blockUI.start("Loading...");
//     this.roleMenuservice.getList().subscribe({
//       next: (res:any) => 
//       {
//         this.modules = res.data;
//         this.blockUI.stop();
//       },
//       error: (err:any) => {console.log(err); this.blockUI.stop();}
//     })
//   }

//   GetAllRoleMenuPermission(){
//     this.blockUI.start("Loading...");
//     this.roleMenuservice.GetAllRoleMenuPermission().subscribe({
//       next: (res:any) => 
//       {
//         this.roleMenus = res.data;
//         this.blockUI.stop();
//       },
//       error: (err:any) => {console.log(err); this.blockUI.stop();}
//     })
//   }

//   toggleRole(roleMenu, moduleName: string) {
//     if (roleMenu.menuNames.includes(moduleName)) {
//         console.log(roleMenu.menuNames, "Condi");
//         roleMenu.menuNames = roleMenu.menuNames.filter(
//         (name) => name !== moduleName
//       );
//     } else {
//       roleMenu.menuNames.push(moduleName);
//       console.log(roleMenu.menuNames, "Condi");
//     }

//   }

//   onSave(roleMenu: any) {
//     const menuIds = roleMenu.menuNames.map(
//       (menuNames) => this.modules.find((role) => role.name === menuNames)?.menuMasterId
//     );
//     this.blockUI.start("Loading...");
//     this.roleMenuservice
//       .AddMenuRolPermission(roleMenu.roleId, menuIds)
//       .subscribe({
//         next: (res: any) => {
//           if(res.isSuccess)
//           {
//             this._toastrService.success(`${CoreConstants.Module.User_Role_Module} ${MessageConstants.AssignSuccess}`);
//           }
//           this.blockUI.stop();
//         },
//         error: (err: any) => {
//           this._toastrService.error(`${CoreConstants.Module.User_Role_Module} ${MessageConstants.AssignFail}`);
//           this.blockUI.stop();
//         },
//       });
//   }


//   onDelete(roleId) {
//     this.blockUI.start("Loading...");
//     this.roleMenuservice.remove(roleId).subscribe({
//       next: (res: any) => {
//         if(res.isSuccess)
//         {
//           this.GetAllRoleMenuPermission();
//           this._toastrService.success(`${CoreConstants.Module.Role_Menu_Module} ${MessageConstants.DeleteMessage}`);
//           this.blockUI.stop();
//         }
//       },
//       error: (err: any) => {
//         console.log(err);
//         this._toastrService.error(`${CoreConstants.Module.Role_Menu_Module} ${MessageConstants.NotDeleteMessage}`);
//         this.blockUI.stop();
//       },
//     });

//   }

// }