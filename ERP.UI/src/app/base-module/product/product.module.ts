import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductRoutingModule } from './product-routing.module';
import { ProductListComponent } from './features/product-list/product-list.component';
import { ProductEditComponent } from './features/product-edit/product-edit.component';
import { ProductViewComponent } from './features/product-view/product-view.component';
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


@NgModule({
  declarations: [
    ProductListComponent,
    ProductEditComponent,
    ProductViewComponent
  ],
  imports: [
    CommonModule,
    ProductRoutingModule,
    CoreCommonModule,
    FormsModule,
    NgbModule,
    NgSelectModule,
    Ng2FlatpickrModule,
    NgxDatatableModule,
    CorePipesModule,
    CoreDirectivesModule,
    CoreSidebarModule
  ],
  providers: [UserListService,UserEditService,UserViewService]
})
export class ProductModule { }
