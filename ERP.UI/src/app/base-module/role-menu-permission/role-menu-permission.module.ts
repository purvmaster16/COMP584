import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RoleMenuPermissionRoutingModule } from './role-menu-permission-routing.module';
import { RoleMenuPermissionComponent } from './features/role-menu-permission/role-menu-permission.component';
import { CoreCommonModule } from '@core/common.module';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { Ng2FlatpickrModule } from 'ng2-flatpickr';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { CoreDirectivesModule } from '@core/directives/directives';
import { CorePipesModule } from '@core/pipes/pipes.module';
import { CoreSidebarModule } from '@core/components';


@NgModule({
  declarations: [
    RoleMenuPermissionComponent
  ],
  imports: [
    CommonModule,
    RoleMenuPermissionRoutingModule,
    CoreCommonModule,
    FormsModule,
    NgbModule,
    NgSelectModule,
    Ng2FlatpickrModule,
    NgxDatatableModule,
    CorePipesModule,
    CoreDirectivesModule,
    CoreSidebarModule
  ]
})
export class RoleMenuPermissionModule { }
