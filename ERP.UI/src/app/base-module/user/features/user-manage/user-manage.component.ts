import { ChangeDetectorRef, Component, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { FlatpickrOptions } from "ng2-flatpickr";
import { Subject } from "rxjs";
import { UserService } from "../../service/user.service";

@Component({
  selector: "app-user-manage",
  templateUrl: "./user-manage.component.html",
  styleUrls: ["./user-manage.component.scss"],
})
export class UserManageComponent implements OnInit, OnDestroy {

  public contentHeader: object;
  public data: any;
  public birthDateOptions: FlatpickrOptions = {
    altInput: true,
  };
  public passwordTextTypeOld = false;
  public passwordTextTypeNew = false;
  public passwordTextTypeRetype = false;
  public avatarImage: string;
  public UserId: string;
  public newUserId: any;
  public selectedMenu: any;
  private _unsubscribeAll: Subject<any>;

  User = {
    id: "",
    userName: "",
    email: "",
    company: "",
    firstName: "",
    phoneNumber: "",
    lastName: "",
    passwordHash: "",
  };
  
  links = [
    {
      label: "General",
      routerLink: "/apps/user/user-manage/user-add",
      icon: "user",
    },
    {
      label: "Change Password",
      routerLink: "/apps/user/user-manage/user-change-password",
      icon: "lock",
    },
    {
      label: "Information",
      routerLink: "/apps/user/user-manage/user-information",
      icon: "info",
    },
    {
      label: "Social",
      routerLink: "/apps/user/user-manage/user-social",
      icon: "link",
    },
  ];

  constructor(
    private route: ActivatedRoute,
    public router: Router,
    private userService: UserService,
    private cdr : ChangeDetectorRef
  ) {
    this._unsubscribeAll = new Subject();
  }

  ngOnInit() {
    this.UserId = this.route.snapshot.paramMap.get("id?");
    this.selectedMenu = "General";
    if (this.UserId !== null && this.UserId !== "") {
      this.fetchUserData(this.UserId);
    }
  }

  handleClick(link: any) {
    this.UserId = this.route.firstChild.snapshot.params["id?"];
    this.selectedMenu = link.label;
    if (this.UserId == null) {
      this.router.navigate([link.routerLink]);
    } else {
      this.router.navigate([link.routerLink, this.UserId]);
    }
  }

  fetchUserData(id: any) {
    this.userService.getDetail(id).subscribe({
      next: (res) => {
        this.User.id = res.data.id;
        this.User.company = res.data.company;
        this.User.firstName = res.data.firstName;
        this.User.email = res.data.email;
        this.User.userName = res.data.userName;
        this.User.lastName = res.data.lastName;
        this.User.passwordHash = res.data.passwordHash;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  emptyUserObj() {
    for (let key in this.User) {
      if (this.User.hasOwnProperty(key)) {
        this.User[key] = "";
      }
    }
    this.UserId = "";
    this.router.navigate(["apps/user/user-manage"]);
    // this.cdr.markForCheck();
    this.cdr.markForCheck();
    // this.cdr.reattach();
  }
  
  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
    this.UserId = "";
    for (let key in this.User) {
      if (this.User.hasOwnProperty(key)) {
        this.User[key] = "";
      }
    }
  }
}
