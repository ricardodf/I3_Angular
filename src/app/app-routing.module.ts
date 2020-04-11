import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ProductMainComponent } from './products/product-main/product-main.component';
import { ProductListComponent } from './products/product-main/product-list/product-list.component';
import { ProductDetailComponent } from './products/product-main/product-detail/product-detail.component';
import { ProductEditComponent } from './products/product-main/product-edit/product-edit.component';
import { ProductComponent } from './products/product-main/product-list/product/product.component';


const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'products', component: ProductMainComponent, children: [
    { path: 'new', component: ProductEditComponent },
    { path: '', component: ProductListComponent },
    { path: ':id', component: ProductDetailComponent },
    { path: ':id/edit', component: ProductEditComponent }
  ] },
  { path: 'monitoreo', component: ProductMainComponent, children: [
    { path: '', component: ProductListComponent }
  ]},
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
