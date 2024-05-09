import { ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { RoleService } from "../../service/role.service";
import { ActivatedRoute, Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { MessageConstants } from "app/core/constants/message.constants";
import { CoreConstants } from "app/core/constants/core.constants";
import { PAGEROUTEConstants } from "app/core/constants/page-route.constants ";
import { BlockUI, NgBlockUI } from "ng-block-ui";

@Component({
  selector: "app-role-edit",
  templateUrl: "./role-edit.component.html",
  styleUrls: ["./role-edit.component.scss"],
})
export class RoleEditComponent implements OnInit {
  @BlockUI() blockUI: NgBlockUI;
  public roleId: string;

  role = {
    roleName: "",
    roleID: "str",
  };

  constructor(
    private route: ActivatedRoute,
    private roleService: RoleService,
    private router: Router,
    private _toastrService: ToastrService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.roleId = this.route.snapshot.paramMap.get("id");
    this.fetchRoleData(this.roleId);
  }

  fetchRoleData(id: string) {
    this.blockUI.start("Loading...");
    this.roleService.getDetail(id).subscribe((roleData) => {
      (this.role.roleName = roleData.data.roleName),
        (this.role.roleID = roleData.data.roleID);
    });
    this.blockUI.stop();
  }

  onSubmit(form: NgForm) {
    if (form.valid) {
      this.roleService.update(null, this.role).subscribe({
        next: (res) => {
          if (res.isSuccess) {
            console.log(res);
              this._toastrService.success(`${CoreConstants.Module.Role_Module} ${MessageConstants.UpdateMessage}`);

            this.router.navigate([PAGEROUTEConstants.Role.RoleList]);
            this.cdr.detectChanges();
            
          }
        },
        error: (err) => {
          console.log(err);
          // this._toastrService.error("Role Updation Failed !");
          this.cdr.detectChanges();
          this._toastrService.error(`${CoreConstants.Module.Role_Module} ${MessageConstants.NotUpdateMessage}`);
        },
      });
    }
  }
}
