import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ProductQueryResults } from 'src/app/models/product/product-query-results';
import { ProductService } from 'src/app/services/product.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css']
})
export class CatalogComponent implements OnInit {

  productsQuery$: Observable<ProductQueryResults>;
  query: string;
  environmnet = environment;

  constructor(private productService: ProductService,
    private router: Router) { }

  ngOnInit() {
    this.loadProducts()
  }

  loadProducts() {
    this.productsQuery$ = this.productService.getAll(this.query ? {
      name: this.query
    } : null);
  }

  exportToExcel() {
    this.productService.exportExcel(this.query ? {
      name: this.query
    } : null).subscribe(excelResult => {
      const blob = new Blob([excelResult], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      });
      const link = document.createElement('a');
      const url = window.URL.createObjectURL(blob);
      link.href = url;
      window.open(url);
    });
  }

  onProductDeleted(id) {
    const ans = confirm('Do you want to delete product with id: ' + id);
    if (ans) {
      this.productService.delete(id).subscribe(() => {
        this.loadProducts();
      });
    }
  }
}
