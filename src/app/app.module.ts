import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CatalogComponent } from './components/catalog/catalog.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductService } from './services/product.service';
import { CatalogProductComponent } from './components/catalog-product/catalog-product.component';
import { ProductAddEditComponent } from './components/product-add-edit/product-add-edit.component';

@NgModule({
  declarations: [
    AppComponent,
    CatalogComponent,
    CatalogProductComponent,
    ProductAddEditComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [
    ProductService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
