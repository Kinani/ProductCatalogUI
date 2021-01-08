import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CatalogComponent } from './components/catalog/catalog.component';


const routes: Routes = [
  { path: '', component: CatalogComponent, pathMatch: 'full' },
  // { path: 'blogpost/:id', component: BlogPostComponent },
  // { path: 'add', component: BlogPostAddEditComponent },
  // { path: 'blogpost/edit/:id', component: BlogPostAddEditComponent },
  { path: '**', redirectTo: '/' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
