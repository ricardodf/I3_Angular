import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ProductMainComponent } from './products/product-main/product-main.component';
import { ProductListComponent } from './products/product-main/product-list/product-list.component';
import { ProductDetailComponent } from './products/product-main/product-detail/product-detail.component';
import { ProductEditComponent } from './products/product-main/product-edit/product-edit.component';
import { ProductComponent } from './products/product-main/product-list/product/product.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    NotFoundComponent,
    ProductMainComponent,
    ProductListComponent,
    ProductDetailComponent,
    ProductEditComponent,
    ProductComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
