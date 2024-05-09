import { Component, OnInit } from '@angular/core';
import { UserService } from '../../service/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { PAGEROUTEConstants } from 'app/core/constants/page-route.constants ';
import { CoreConstants } from 'app/core/constants/core.constants';
import { MessageConstants } from 'app/core/constants/message.constants';
import { ToastrService } from 'ngx-toastr';
import { UserRolePermissionService } from 'app/base-module/user-role-permission/service/user-role-permission.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit {
  public UserId: string;

  constructor(private userService : UserService,private route:ActivatedRoute,public router:Router,private UserRoleService: UserRolePermissionService) { }

  User = {
    id : "",
    userName : "",
    email : "",
    company : "",
    firstName : "",
    phoneNumber:"",
    lastName:"",
  }

  Roles:any[];

  ngOnInit(): void {
    this.UserId = this.route.snapshot.paramMap.get('id?');
    
    this.fetchUserData(this.UserId);
    this.fetchUserROleDetails(this.UserId);
  }
  fetchUserData(id:any){
    this.userService.getDetail(id).subscribe({
      next: (res) => { 
        this.User.id =  res.data.id
        this.User.company =  res.data.company
        this.User.firstName =  res.data.firstName
        this.User.email =  res.data.email
        this.User.userName =  res.data.userName
        this.User.phoneNumber =  res.data.phoneNumber
        this.User.lastName =  res.data.lastName
      },
      error: (err) => { console.log(err)}
    })
  }
  fetchUserROleDetails(id:any){
    this.UserRoleService.getDetail(id).subscribe({
      next: (res) =>{
        this.Roles = res.data
        console.log(this.Roles)
      },
      error: (err) => { console.log(err)}
    })
  }

  // deleteUser(id:any){

  //   this.userService.remove(id).subscribe({
  //     next: (res:any) => { 
  //       console.log(res)
  //       this._toastrService.success(`${CoreConstants.Module.User_Module} ${MessageConstants.DeleteMessage}`)
  //       this.router.navigate([PAGEROUTEConstants.User.UserList]);

  //     },
  //     error: (err:any) => {console.log(err)
  //       this._toastrService.success(`${CoreConstants.Module.User_Module} ${MessageConstants.NotDeleteMessage}`)
  //     }    
  //   })
  // }
}
