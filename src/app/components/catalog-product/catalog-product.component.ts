import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Product } from 'src/app/models/product/product';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-catalog-product',
  templateUrl: './catalog-product.component.html',
  styleUrls: ['./catalog-product.component.css']
})
export class CatalogProductComponent implements OnInit {
  @Input() product: Product;
  @Output() onDelete = new EventEmitter<number>();

  environmnet = environment;

  constructor() { }

  ngOnInit() {
  }

  delete(id: number) {
    this.onDelete.emit(id);
  }
}
