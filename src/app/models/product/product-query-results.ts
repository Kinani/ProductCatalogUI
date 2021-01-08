import { Product } from "./product";

export interface ProductQueryResults {
    totalItems: number,
    items: Product[]
}