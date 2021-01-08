import { Component, OnInit } from '@angular/core';
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
  environmnet = environment;

  constructor(private productService: ProductService) { }

  ngOnInit() {
    this.loadProducts()
  }

  loadProducts() {
    this.productsQuery$ = this.productService.getAll();
  }

  delete(id) {
    const ans = confirm('Do you want to delete blog post with id: ' + id);
    if (ans) {
      // this.blogPostService.deleteBlogPost(postId).subscribe((data) => {
      //   this.loadBlogPosts();
      // });
    }
  }
}
