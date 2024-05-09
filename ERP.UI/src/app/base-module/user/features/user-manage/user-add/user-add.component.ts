import { Component, OnInit, OnDestroy, ViewEncapsulation, EventEmitter, Output } from "@angular/core";
import { Subject } from "rxjs";
import { FlatpickrOptions } from "ng2-flatpickr";
import { ActivatedRoute, Router } from "@angular/router";
import { UserService } from "../../../service/user.service";
import { ToastrService } from "ngx-toastr";
import { CoreConstants } from "app/core/constants/core.constants";
import { MessageConstants } from "app/core/constants/message.constants";
import { PAGEROUTEConstants } from "app/core/constants/page-route.constants ";
import { EncyptionService } from "app/core/services/encyption.service";

@Component({
  selector: "app-user-add",
  templateUrl: "./user-add.component.html",
  styleUrls: ["./user-add.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class UserAddComponent implements OnInit, OnDestroy {

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
  public IsPassword: boolean = false;

  // private
  private _unsubscribeAll: Subject<any>;

  constructor(
    private route: ActivatedRoute,
    public router: Router,
    private userService: UserService,
    private _toastrService: ToastrService,
    private encryptionService : EncyptionService
  ) {
    this._unsubscribeAll = new Subject();
  }

  User = {
    id: "",
    userName: "",
    email: "",
    company: "",
    firstName: "",
    phoneNumber: "",
    lastName: "",
    passwordHash : "",
    confirmPassword:""
  };

  ngOnInit() {
    this.UserId = this.route.snapshot.paramMap.get("id?");
    if (this.UserId !== null && this.UserId !== "") {
    this.fetchUserData(this.UserId);
    }
  }

  onSubmit(form: any) {
    if (form.valid) {
      if (this.UserId == null || this.UserId == "") {
        if(this.User.passwordHash != '')
        {
          this.User.passwordHash = this.encryptionService.encryptString(this.User.passwordHash)
          this.IsPassword = true
        }
        this.userService.add(this.User).subscribe({
          next: (res) => {
            // this.fetchUserData(res.data.id);
            this.UserId=res.data.id;
            this.router.navigate([PAGEROUTEConstants.User.AddUser,res.data.id]);
            // this._toastrService.success(`${CoreConstants.Module.User_Module} ${MessageConstants.AddMessage}`);
          },
          error: (err) => {
            // this._toastrService.error(`${CoreConstants.Module.User_Module} ${MessageConstants.NotInsertMessage}`);
          },
        });
      } else {
        this.userService.update(this.UserId, this.User).subscribe({
          next: (res) => {
            // this.fetchUserData(res.data.id);
            // this._toastrService.success(`${CoreConstants.Module.User_Module} ${MessageConstants.UpdateMessage}`);
          },
          error: (err) => {
            // this._toastrService.error(`${CoreConstants.Module.User_Module} ${MessageConstants.NotUpdateMessage}`);
          },
        });
      }
    }
  }

  uploadImage(event: any) {
    if (event.target.files && event.target.files[0]) {
      let reader = new FileReader();

      reader.onload = (event: any) => {
        this.avatarImage = event.target.result;
      };

      reader.readAsDataURL(event.target.files[0]);
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

        if(res.data.passwordHash != null || res.data.passwordHash != ''  )
        {
          this.IsPassword = true
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
  }


  /**
   * On destroy
   */
  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
    this.UserId = "";
  }
} 
