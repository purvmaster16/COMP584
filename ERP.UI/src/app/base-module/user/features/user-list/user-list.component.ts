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

import { UserService } from "../../service/user.service";
import { Router } from "@angular/router";
import { BlockUI, NgBlockUI } from "ng-block-ui";
import { ToastrService } from "ngx-toastr";
import { CoreConstants } from "app/core/constants/core.constants";
import { MessageConstants } from "app/core/constants/message.constants";
import { PAGEROUTEConstants } from "app/core/constants/page-route.constants ";

@Component({
  selector: "app-user-list",
  templateUrl: "./user-list.component.html",
  styleUrls: ["./user-list.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class UserListComponent implements OnInit {
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
  public UserId = "";

  public searchValue = "";

  // Decorator
  @ViewChild(DatatableComponent) table: DatatableComponent;

  // Private
  private tempData = [];
  private _unsubscribeAll: Subject<any>;
  private _coreSidebarService: any;

  /**
   * Constructor
   *
   * @param {CoreConfigService} _coreConfigService
   * @param {UserListService} _userListService
   * @param {CoreSidebarService} _coreSidebarService
   */
  constructor(
    private userListService: UserService,
    private _coreConfigService: CoreConfigService,
    public router: Router,
    private cdr: ChangeDetectorRef,
    private _toastrService: ToastrService,
  ) {
    this._unsubscribeAll = new Subject();
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
      return d.firstName.toLowerCase().indexOf(val) !== -1 || !val;
    });

    // Update The Rows
    this.rows = temp;
    // Whenever The Filter Changes, Always Go Back To The First Page
    this.table.offset = 0;
  }

  /**
   * Toggle the sidebar
   *
   * @param name
   */
  toggleSidebar(name): void {
    this._coreSidebarService.getSidebarRegistry(name).toggleOpen();
  }
  goToAddUser() {
    this.router.navigate([PAGEROUTEConstants.User.AddUser, this.UserId]);
  }

  /**
   * Filter Rows
   *
   * @param firstNameFilter
   */
  filterRows(firstNameFilter): any[] {
    // Reset search on select change
    this.searchValue = "";

    firstNameFilter = firstNameFilter.toLowerCase();

    return this.tempData.filter((row) => {
      const isPartialNameMatch =
        row.firstName.toLowerCase().indexOf(firstNameFilter) !== -1 ||
        !firstNameFilter;
      return isPartialNameMatch;
    });
  }

  // Lifecycle Hooks
  // -----------------------------------------------------------------------------------------------------
  /**
   * On init
   */
  ngOnInit(): void {
    //Subscribe config change
    this._coreConfigService.config
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((config) => {
        //! If we have zoomIn route Transition then load datatable after 450ms(Transition will finish in 400ms)
        if (config.layout.animation === "zoomIn") {
          this.blockUI.start("Loading...");
          setTimeout(() => {
            this.userListService.getList().subscribe({
              next: (res: any) => {
                console.log(res);
                this.rows = res.data;
                this.tempData = this.rows;
                this.cdr.markForCheck();
                this.blockUI.stop();
              },
              error: (err: any) => {
                console.log(err);
                this.blockUI.stop();
              },
            });
          }, 450);
        } else {
          this.blockUI.start("Loading...");
          this.userListService.getList().subscribe({
            next: (res: any) => {
              console.log(res);
              this.rows = res.data;
              this.tempData = this.rows;
              this.cdr.markForCheck();
              this.blockUI.stop();
            },
            error: (err: any) => {
              console.log(err);
              this.blockUI.stop();
            },
          });
        }
      });
  }

  deleteUser(id: any) {
    this.userListService.remove(id).subscribe({
      next: (res: any) => {
        if(res.isSuccess)
        {
          console.log(res);
          this.rows = this.rows.filter(row => row.id !== id);
          this._toastrService.success(`${CoreConstants.Module.User_Module} ${MessageConstants.DeleteMessage}`, '', {
            toastClass: 'toast ngx-toastr toast-success-red'
          });
          this.getUserList()
        }
      },
      error: (err: any) => {
        this._toastrService.success(`${CoreConstants.Module.User_Module} ${MessageConstants.NotDeleteMessage}`)
        console.log(err);
      },
    });
  }

  getUserList() {
    this.userListService.getList().subscribe({
      next: (res: any) => {
        this.rows = res.data;
        this.tempData = this.rows;
        this.cdr.markForCheck();
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }

  ConfirmTextOpen(Id) {
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
        this.deleteUser(Id);
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
