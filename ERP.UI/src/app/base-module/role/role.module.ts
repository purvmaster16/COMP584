import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RoleRoutingModule } from './role-routing.module';
import { RoleListComponent } from './features/role-list/role-list.component';
import { RoleViewComponent } from './features/role-view/role-view.component';
import { RoleEditComponent } from './features/role-edit/role-edit.component';
import { RoleAddComponent } from './features/role-add/role-add.component';
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
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';

@NgModule({
  declarations: [
    RoleListComponent,
    RoleViewComponent,
    RoleEditComponent,
    RoleAddComponent
  ],
  imports: [
    CommonModule,
    RoleRoutingModule,
    CoreCommonModule,
    FormsModule,
    NgbModule,
    NgSelectModule,
    Ng2FlatpickrModule,
    NgxDatatableModule,
    CorePipesModule,
    CoreDirectivesModule,
    CoreSidebarModule,
    SweetAlert2Module.forRoot()
  ],
  providers: [UserListService,UserEditService,UserViewService]
})
export class RoleModule { }
