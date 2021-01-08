import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CatalogComponent } from './components/catalog/catalog.component';
import { ProductAddEditComponent } from './components/product-add-edit/product-add-edit.component';


const routes: Routes = [
  { path: '', component: CatalogComponent, pathMatch: 'full' },
  // { path: 'blogpost/:id', component: BlogPostComponent },
  { path: 'add', component: ProductAddEditComponent },
  { path: 'edit/:id', component: ProductAddEditComponent },
  { path: '**', redirectTo: '/' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
