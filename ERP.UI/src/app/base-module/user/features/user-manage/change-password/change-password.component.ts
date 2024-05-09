import { Component, OnInit, OnDestroy, ViewEncapsulation } from '@angular/core';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { FlatpickrOptions } from 'ng2-flatpickr';
import { Router } from '@angular/router';
import { UserService } from '../../../service/user.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss'],
  encapsulation: ViewEncapsulation.None
})
  export class ChangePasswordComponent implements OnInit, OnDestroy {
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
  
    // private
    private _unsubscribeAll: Subject<any>;
  
    /**
     * Constructor
     *
     * @param {AccountSettingsService} _accountSettingsService
     */
    constructor(public router :Router,private userService : UserService) {
      this._unsubscribeAll = new Subject();
    }
  
    // Public Methods
    // -----------------------------------------------------------------------------------------------------
    goToAddUser(){
      this.router.navigate(['apps/user/change-password'])
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
      lastName:""
    }
    /**
     * On init
     */
    ngOnInit() {
  
      // content header
      this.contentHeader = {
        headerTitle: 'Account Settings',
        actionButton: true,
        breadcrumb: {
          type: '',
          links: [
            {
              name: 'Home',
              isLink: true,
              link: '/'
            },
            {
              name: 'Pages',
              isLink: true,
              link: '/'
            },
            {
              name: 'Account Settings',
              isLink: false
            }
          ]
        }
      };
    }
  
    onSubmit(form: any) {
      console.log(this.User)
      if (form.valid) {
        this.userService.add(this.User).subscribe({
          next: (res) => { console.log(res)},
          error: (err) => { console.log(err)}
        })
        this.router.navigate(['/apps/user/user-list'])
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
