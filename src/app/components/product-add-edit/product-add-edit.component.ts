import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/models/product/product';
import { ProductDto } from 'src/app/models/product/product-dto';
import { ProductService } from 'src/app/services/product.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-product-add-edit',
  templateUrl: './product-add-edit.component.html',
  styleUrls: ['./product-add-edit.component.css']
})
export class ProductAddEditComponent implements OnInit {
  form: FormGroup;
  environmnet = environment;
  actionType: string;
  formName: string;
  formPrice: string;
  formPhoto: string;
  formLastUpdated: string;
  id: number;
  errorMessage: any;
  existingProduct: Product;
  submitted: boolean = false;

  constructor(private productService: ProductService,
    private formBuilder: FormBuilder,
    private avRoute: ActivatedRoute,
    private router: Router) {
    const idParam = 'id';
    this.actionType = 'Add';
    this.formName = 'name';
    this.formPrice = 'price';
    this.formPhoto = 'photo';
    this.formLastUpdated = 'lastUpdated';
    this
    if (this.avRoute.snapshot.params[idParam]) {
      this.id = this.avRoute.snapshot.params[idParam];
    }

    this.form = this.formBuilder.group(
      {
        id: 0,
        name: ['', [Validators.required]],
        price: ['', [Validators.required]],
        photo: ['', [Validators.required]],
        lastUpdated: [{ value: '', disabled: true }, [Validators.nullValidator]],
      }
    )
  }

  ngOnInit() {
    if (this.id > 0) {
      this.actionType = 'Edit';
      this.productService.get(this.id)
        .subscribe(data => {
          this.existingProduct = data;
          this.form.controls[this.formName].setValue(data.name);
          this.form.controls[this.formPrice].setValue(data.price);
          this.form.controls[this.formLastUpdated].setValue(data.lastUpdated)
        });
    }
  }

  save() {
    this.submitted = true;
    if (!this.form.valid) {
      return;
    }

    if (this.actionType === 'Add') {
      let product: ProductDto = {
        name: this.form.get(this.formName).value,
        price: this.form.get(this.formPrice).value,
        photo: this.form.get(this.formPhoto).value
      };

      this.productService.add(product)
        .subscribe((data) => {
          this.router.navigate(['/']);
        });
    }

    if (this.actionType === 'Edit') {
      let product: ProductDto = {
        id: this.id,
        name: this.form.get(this.formName).value,
        price: this.form.get(this.formPrice).value,
        photo: this.form.get(this.formPhoto).value
      };
      this.productService.update(this.id, product)
        .subscribe((data) => {
          this.router.navigate(['/']);
        });
    }
  }

  cancel() {
    this.router.navigate(['/']);
  }

  handleFileInput(files: FileList) {
    this.form.controls[this.formPhoto].setValue(files.item(0));
  }

  get name() { return this.form.get(this.formName); }
  get price() { return this.form.get(this.formPrice); }
  get photo() { return this.form.get(this.formPhoto); }
}
