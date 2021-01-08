export interface ProductQuery {
    id?: number,
    name?: string,
    price?: number,
    lastUpdated?: Date
    page: number,
    itemsPerPage: number
}