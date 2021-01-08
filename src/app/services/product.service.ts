import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ProductQuery } from '../models/product/product-query';
import { ProductQueryResults } from '../models/product/product-query-results';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  serviceUrl: string = `${environment.apiUrl}/api/ProductCatalog/`;

  constructor(private httpClient: HttpClient) { }

  getAll(query?: ProductQuery) {
    return this.httpClient.get<ProductQueryResults>(`${this.serviceUrl}?${this.getQueryParams(query)}`);
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
