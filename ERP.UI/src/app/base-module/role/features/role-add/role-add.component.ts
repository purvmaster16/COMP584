import { Component, OnInit } from "@angular/core";
import { RoleService } from "../../service/role.service";
import { ActivatedRoute, Router } from "@angular/router";
import { NgForm } from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import { CoreConstants } from "app/core/constants/core.constants";
import { MessageConstants } from "app/core/constants/message.constants";
import { PAGEROUTEConstants } from "app/core/constants/page-route.constants ";

@Component({
  selector: "app-role-add",
  templateUrl: "./role-add.component.html",
  styleUrls: ["./role-add.component.scss"],
})
export class RoleAddComponent implements OnInit {
  constructor(
    private roleService: RoleService,
    private route: Router,
    private _toastrService: ToastrService
  ) {}

  role = {
    roleName: "",
    roleID: "str",
  };

  ngOnInit(): void {}

  onSubmit(form: NgForm) {
    if (form.valid) {
      this.roleService.add(this.role).subscribe({
        next: (res) => {
          if (res.isSuccess)
          {
            console.log(res.data);
            this.route.navigate([PAGEROUTEConstants.Role.RoleList]);
            this._toastrService.success(`${CoreConstants.Module.Role_Module} ${MessageConstants.AddMessage}`);
          }
        },
        error: (err) => {
          console.log(err);
          this._toastrService.error(`${CoreConstants.Module.Role_Module} ${MessageConstants.NotInsertMessage}`);
        },
      });
      // You can add your logic here to handle the form submission
    }
  }
}
