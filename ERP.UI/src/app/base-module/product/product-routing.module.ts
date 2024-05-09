import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductListComponent } from './features/product-list/product-list.component';
import { ProductEditComponent } from './features/product-edit/product-edit.component';
import { ProductViewComponent } from './features/product-view/product-view.component';

const routes: Routes = 
[
  {
    path: 'product-list',
    component: ProductListComponent,
  },
  {
    path: 'product-edit/:id',
    component: ProductEditComponent,
  },
  {
    path: 'product-view/:id',
    component: ProductViewComponent,
    // resolve: {
    //   data: UserViewService
    // },
    // data: { path: 'view/:id', animation: 'UserViewComponent' }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductRoutingModule { }
