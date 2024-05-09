import { Component, OnInit } from "@angular/core";
import { UserRolePermissionService } from "../../service/user-role-permission.service";
import { Console } from "console";
import { RoleService } from "app/base-module/role/service/role.service";
import { UserService } from "app/base-module/user/service/user.service";
import { columnGroupWidths } from "@swimlane/ngx-datatable";
import { forkJoin } from "rxjs";
import { CoreConstants } from "app/core/constants/core.constants";
import { MessageConstants } from "app/core/constants/message.constants";
import { ToastrService } from "ngx-toastr";
import { BlockUI, NgBlockUI } from "ng-block-ui";
import Swal from "sweetalert2";

@Component({
  selector: "app-user-role-permission",
  templateUrl: "./user-role-permission.component.html",
  styleUrls: ["./user-role-permission.component.scss"],
})
export class UserRolePermissionComponent implements OnInit {


  constructor(private RoleService:RoleService,private userRoleService:UserRolePermissionService,private _toastrService: ToastrService) { }
  roles: any[];
  userRoles: any[];
  roleIds: any[] = [];

  // users: User[] = [
  //   { username: 'User 1', userid: '1', roles: [1, 2] },
  //   { username: 'User 2', userid: '2', roles: [1, 2] }
  // ];

  // roles: Role[] = [
  //   { rolename: 'HR', roleID: 1 },
  //   { rolename: 'Admin', roleID: 2 }
  // ];

  ngOnInit(): void {

    //Role-list
    this.RoleService.getList().subscribe({
      next: (res: any) => {
        this.roles = res.data;
        console.log(this.roles)
      },
      error: (err: any) => {
        console.log(err);
      },
    });

    //User-Role List
    this.getUserRoleList()
  }

  toggleRole(userRole: any, roleName: string) {
    if (userRole.roleNames.includes(roleName)) {
      userRole.roleNames = userRole.roleNames.filter(
        (name) => name !== roleName
      );
    } else {
      userRole.roleNames.push(roleName);
    }
  }

  getUserRoleList(){
    this.userRoleService.getList().subscribe({
      next: (res: any) => {
        this.userRoles = res.data;
        console.log(this.userRoles)
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }

  onSave(userRole: any) {

    const roleIds = userRole.roleNames.map(
      (roleName) => this.roles.find((role) => role.roleName === roleName)?.roleID
    );
    
    this.userRoleService
      .AddUserRolePermission(userRole.userId, roleIds)
      .subscribe({
        next: (res: any) => {
          if(res.isSuccess)
          {
            // this._toastrService.success(`${CoreConstants.Module.User_Role_Module} ${MessageConstants.AssignSuccess}`);
          }
        },
        error: (err: any) => {
          // this._toastrService.error(`${CoreConstants.Module.User_Role_Module} ${MessageConstants.AssignFail}`);
        },
      });
  }

  onDelete(userid: any) {
    this.userRoleService.remove(userid).subscribe({
      next: (res: any) => {
        if(res.isSuccess)
        {
          // this._toastrService.success(`${CoreConstants.Module.User_Role_Module} ${MessageConstants.DeleteMessage}`, '', {
          //   toastClass: 'toast ngx-toastr toast-success-red' // Apply custom class for red color
          // });
          this.getUserRoleList()
        }
      },
      error: (err: any) => {
        // this._toastrService.error(`${CoreConstants.Module.User_Role_Module} ${MessageConstants.NotDeleteMessage}`);
      },
    });
  }

  ConfirmTextOpen(id) {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#7367F0",
      cancelButtonColor: "#E42728",
      confirmButtonText: "Yes, Remove all roles !",
      customClass: {
        confirmButton: "btn btn-primary",
        cancelButton: "btn btn-danger ml-1",
      },
    }).then((result) => {
      if (result.value) {
        // Swal.fire({
        //   icon: "success",
        //   title: "Deleted!",
        //   text: "Your file has been deleted.",
        //   customClass: {
        //     confirmButton: "btn btn-success",
        //   },
        // });
        this.onDelete(id);
      }
    });
  }
}
