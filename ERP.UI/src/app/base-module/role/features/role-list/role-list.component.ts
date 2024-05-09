import {
  ChangeDetectorRef,
  Component,
  OnInit,
  ViewChild,
  ViewEncapsulation,
} from "@angular/core";
import { ColumnMode, DatatableComponent } from "@swimlane/ngx-datatable";
import Swal from "sweetalert2";

import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";

import { CoreConfigService } from "@core/services/config.service";
import { CoreSidebarService } from "@core/components/core-sidebar/core-sidebar.service";

import { UserListService } from "app/main/apps/user/user-list/user-list.service";
import { RoleService } from "../../service/role.service";
import { Router } from "@angular/router";
import { error } from "console";
import { ToastrService } from "ngx-toastr";
import { CoreConstants } from "app/core/constants/core.constants";
import { MessageConstants } from "app/core/constants/message.constants";
import { PAGEROUTEConstants } from "app/core/constants/page-route.constants ";
import { BlockUI, NgBlockUI } from "ng-block-ui";

@Component({
  selector: "app-role-list",
  templateUrl: "./role-list.component.html",
  styleUrls: ["./role-list.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class RoleListComponent implements OnInit {
  @BlockUI() blockUI: NgBlockUI;

  // Public
  public sidebarToggleRef = false;
  public rows;
  public selectedOption = 10;
  public ColumnMode = ColumnMode;
  public temp = [];
  public previousRoleFilter = "";
  public previousPlanFilter = "";
  public previousStatusFilter = "";

  public searchValue = "";
  public roleId: any;

  // Decorator
  @ViewChild(DatatableComponent) table: DatatableComponent;

  // Private
  private tempData = [];
  private _unsubscribeAll: Subject<any>;

  /**
   * Constructor
   *
   * @param {CoreConfigService} _coreConfigService
   * @param {UserListService} _userListService
   * @param {CoreSidebarService} _coreSidebarService
   */
  constructor(
    private roleService: RoleService,
    public router: Router,
    private _toastrService: ToastrService,
    private cdr: ChangeDetectorRef
  ) {
    this._unsubscribeAll = new Subject();
  }

  ngOnInit(): void {
    this.getRoleList();
  }

  // Public Methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * filterUpdate
   *
   * @param event
   */
  filterUpdate(event) {
    // Reset ng-select on search
    const val = event.target.value.toLowerCase();

    // Filter Our Data
    const temp = this.tempData.filter(function (d) {
      return d.name.toLowerCase().indexOf(val) !== -1 || !val;
    });

    // Update The Rows
    this.rows = temp;
    // Whenever The Filter Changes, Always Go Back To The First Page
    this.table.offset = 0;
  }

  addNewRole(): void {
    this.router.navigate([PAGEROUTEConstants.Role.AddRole]);
  }

  /**
   * Filter Rows
   *
   * @param roleFilter
   */
  filterRows(roleFilter): any[] {
    // Reset search on select change
    this.searchValue = "";

    roleFilter = roleFilter.toLowerCase();

    return this.tempData.filter((row) => {
      const isPartialNameMatch =
        row.role.toLowerCase().indexOf(roleFilter) !== -1 || !roleFilter;
      return isPartialNameMatch;
    });
  }

  deleteRole(id: any) {
    console.log("In Delete Role");
    this.roleService.remove(id).subscribe({
      next: (res) => {
        if (res.isSuccess) {
          console.log(res);
          this.rows = this.rows.filter((row) => row.id !== id);
          this._toastrService.success(
            `${CoreConstants.Module.Role_Module} ${MessageConstants.DeleteMessage}`, '', {
              toastClass: 'toast ngx-toastr toast-success-red'
            });
          this.getRoleList();
        }
      },
      error: (err) => {
        console.log(err);
        this._toastrService.error(
          `${CoreConstants.Module.Role_Module} ${MessageConstants.NotDeleteMessage}`
        );
      },
    });
  }

  // Lifecycle Hooks
  // -----------------------------------------------------------------------------------------------------
  /**
   * On init
   */

  getRoleList() {
    this.blockUI.start("Loading...");
    this.roleService.getList().subscribe({
      next: (res: any) => {
        if (res.isSuccess) {
          this.rows = res.data;
          this.tempData = this.rows;
          this.cdr.markForCheck();
          this.blockUI.stop();
        }
      },
      error: (err: any) => {
        console.log(err);
        this.blockUI.stop();
      },
    });
  }


  ConfirmTextOpen(roleId) {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#7367F0",
      cancelButtonColor: "#E42728",
      confirmButtonText: "Yes, delete it!",
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
        this.deleteRole(roleId);
      }
    });
  }

  /**
   * On destroy
   */
  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }
}
