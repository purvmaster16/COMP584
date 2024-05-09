import { Component, OnInit, OnDestroy, ViewEncapsulation } from '@angular/core';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { FlatpickrOptions } from 'ng2-flatpickr';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../../service/user.service';
import { CoreConstants } from 'app/core/constants/core.constants';
import { MessageConstants } from 'app/core/constants/message.constants';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user-information',
  templateUrl: './user-information.component.html',
  styleUrls: ['./user-information.component.scss'],
  encapsulation: ViewEncapsulation.None
})
  export class UserInformationComponent implements OnInit, OnDestroy {
    // public
    public contentHeader: object;
    public data: any;
    public birthDateOptions: FlatpickrOptions = {
      altInput: true
    };
    public passwordTextTypeOld = false;
    public passwordTextTypeNew = false;
    public passwordTextTypeRetype = false;
    public avatarImage: string;
    public UserId: string;
  
    // private
    private _unsubscribeAll: Subject<any>;
  
    /**
     * Constructor
     *
     * @param {AccountSettingsService} _accountSettingsService
     */
    constructor(private _toastrService: ToastrService,private route: ActivatedRoute,public router :Router,private userService : UserService) {
      this._unsubscribeAll = new Subject();
    }
  
    // Public Methods
    // -----------------------------------------------------------------------------------------------------
    goToAddUser(){
      this.router.navigate(['apps/user/user-add'])
    }

    goToChangePassword(){
      this.router.navigate(['apps/user/change-password'])
    }

    goToUserInfo(){
      this.router.navigate(['apps/user/user-notification'])
    }

    goToUserNotification(){
      this.router.navigate(['apps/user/user-information'])
    }

    goToUserSocial(){
      this.router.navigate(['apps/user/user-social'])
    }
    /**
     * Toggle Password Text Type Old
     */
    togglePasswordTextTypeOld() {
      this.passwordTextTypeOld = !this.passwordTextTypeOld;
    }
  
    /**
     * Toggle Password Text Type New
     */
    togglePasswordTextTypeNew() {
      this.passwordTextTypeNew = !this.passwordTextTypeNew;
    }
  
    /**
     * Toggle Password Text Type Retype
     */
    togglePasswordTextTypeRetype() {
      this.passwordTextTypeRetype = !this.passwordTextTypeRetype;
    }
  
    /**
     * Upload Image
     *
     * @param event
     */
    uploadImage(event: any) {
      if (event.target.files && event.target.files[0]) {
        let reader = new FileReader();
  
        reader.onload = (event: any) => {
          this.avatarImage = event.target.result;
        };
  
        reader.readAsDataURL(event.target.files[0]);
      }
    }
  
    // Lifecycle Hooks
    // -----------------------------------------------------------------------------------------------------
    User = {
      id:"",
      userName : "",
      email : "",
      company : "",
      firstName : "",
      phoneNumber:"",
      lastName:"",
      passwordHash : ""
    }
    /**
     * On init
     */
    ngOnInit() {
      this.UserId = this.route.snapshot.paramMap.get('id?');
      
      if (this.UserId != null || this.UserId != "") {

        this.fetchUserData(this.UserId);
        
        }


    }

    fetchUserData(id:any) {
      this.userService.getDetail(id).subscribe({
        next: (res) => { 
          console.log(res)
          this.User.id =  res.data.id
          this.User.company =  res.data.company
          this.User.firstName =  res.data.firstName
          this.User.email =  res.data.email
          this.User.userName =  res.data.userName
          this.User.phoneNumber =  res.data.phoneNumber
          this.User.lastName =  res.data.lastName
          this.User.passwordHash = res.data.passwordHash;
        },
        error: (err) => { console.log(err)}
      })
    }
  
    onSubmit(form: any) {
      console.log(this.User)
      if (form.valid) {
        this.userService.update(this.UserId,this.User).subscribe({
          next: (res) => { 
            if(res.isSuccess)
            {
              // this._toastrService.success(`${CoreConstants.Module.User_Module} ${MessageConstants.UpdateMessage}`);
              console.log(res)
            }
          },
          error: (err) => { console.log(err)}
        })
        // this.router.navigate(['/apps/user/user-list'])
        // You can add your logic here to handle the form submission
      }
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