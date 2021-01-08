import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ProductQuery } from '../models/product/product-query';
import { ProductQueryResults } from '../models/product/product-query-results';
import { environment } from 'src/environments/environment';
import { Product } from '../models/product/product';
import { ProductDto } from '../models/product/product-dto';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  serviceUrl: string = `${environment.apiUrl}/api/ProductCatalog`;

  constructor(private httpClient: HttpClient) { }

  getAll(query?: ProductQuery) {
    return this.httpClient.get<ProductQueryResults>(`${this.serviceUrl}?${this.getQueryParams(query)}`);
  }

  get(id: number) {
    return this.httpClient.get<Product>(`${this.serviceUrl}/GetById?id=${id}`);
  }

  delete(id: number) {
    return this.httpClient.delete(`${this.serviceUrl}/${id}`);
  }

  add(product: ProductDto) {
    const formData = new FormData();
    formData.append("photo", product.photo, product.photo.name);
    formData.append("name", product.name);
    formData.append("price", product.price.toString());

    return this.httpClient.post<Product>(`${this.serviceUrl}`, formData);
  }

  exportExcel(query?: ProductQuery): Observable<Blob> {
    return this.httpClient.get(`${this.serviceUrl}/ExportExcel?${this.getQueryParams(query)}`,
      { responseType: 'blob' });
  }

  update(id: number, product: ProductDto) {
    const formData = new FormData();
    formData.append("photo", product.photo, product.photo.name);
    formData.append("name", product.name);
    formData.append("price", product.price.toString());

    return this.httpClient.put<Product>(`${this.serviceUrl}/${id}`, formData);
  }

  getQueryParams(searchModel) {
    let params = '';
    for (const key in searchModel) {
      if (searchModel.hasOwnProperty(key)) {
        if (params) {
          if (
            key &&
            searchModel[key] !== '' &&
            searchModel[key] !== null &&
            searchModel[key] !== undefined
          ) {
            if (Array.isArray(searchModel[key])) {
              params +=
                searchModel[key].length > 0
                  ? `&${this.getParamsFromArray(key, searchModel[key])}`
                  : '';
            } else {
              params += `&${key}=${searchModel[key]}`;
            }
          }
        } else {
          if (
            key &&
            searchModel[key] !== '' &&
            searchModel[key] !== null &&
            searchModel[key] !== undefined
          ) {
            if (Array.isArray(searchModel[key])) {
              params +=
                searchModel[key].length > 0
                  ? `${this.getParamsFromArray(key, searchModel[key])}`
                  : '';
            } else {
              params += `${key}=${searchModel[key]}`;
            }
          }
        }
      }
    }
    return params;
  }

  getParamsFromArray(fieldName: string, array: any[]) {
    if (fieldName && array && array.length > 0) {
      let params = '';

      for (let index = 0; index < array.length; index++) {
        const searchModel = array[index];
        if (searchModel && typeof searchModel === 'string') {
          params += params ? '&' : '';
          params += `${fieldName}[${index}]=${searchModel}`;
        } else if (searchModel) {
          if (Object.keys(searchModel) && Object.keys(searchModel).length > 0) {

            for (const key in searchModel) {
              if (searchModel.hasOwnProperty(key)) {
                if (
                  key &&
                  searchModel[key] !== '' &&
                  searchModel[key] !== null &&
                  searchModel[key] !== undefined
                ) {
                  params += params ? '&' : '';
                  params += `${fieldName}[${index}].${key}=${searchModel[key]}`;
                }
              }
            }
          } else {
            params += params ? '&' : '';
            params += `${fieldName}[${index}]=${searchModel}`;
          }
        }

      }
      return params;
    }
  }
}
