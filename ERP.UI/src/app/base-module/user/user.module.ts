import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserRoutingModule } from './user-routing.module';
import { CoreCommonModule } from '@core/common.module';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { Ng2FlatpickrModule } from 'ng2-flatpickr';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { CorePipesModule } from '@core/pipes/pipes.module';
import { CoreDirectivesModule } from '@core/directives/directives';
import { CoreSidebarModule } from '@core/components';
import { UserListService } from 'app/main/apps/user/user-list/user-list.service';

import { UserEditService } from 'app/main/apps/user/user-edit/user-edit.service';
import { UserViewService } from 'app/main/apps/user/user-view/user-view.service';
import { UserListComponent } from './features/user-list/user-list.component';
import { UserAddComponent } from './features/user-manage/user-add/user-add.component';
import { ContentHeaderModule } from "../../layout/components/content-header/content-header.module";
import { ChangePasswordComponent } from './features/user-manage/change-password/change-password.component';
import { UserInformationComponent } from './features/user-manage/user-information/user-information.component';
import { UserSocialComponent } from './features/user-manage/user-social/user-social.component';
import { UserDetailComponent } from './features/user-detail/user-detail.component';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';

@NgModule({
    declarations: [
        UserListComponent,
        UserDetailComponent
    ],
    providers: [UserListService, UserEditService, UserViewService],
    imports: [
        CommonModule,
        UserRoutingModule,
        CoreCommonModule,
        FormsModule,
        NgbModule,
        NgSelectModule,
        Ng2FlatpickrModule,
        NgxDatatableModule,
        CorePipesModule,
        CoreDirectivesModule,
        CoreSidebarModule,
        ContentHeaderModule,
        SweetAlert2Module.forRoot()
    ]
})
export class UserModule { }
