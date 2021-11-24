import { APIResponse } from ".";


type Sort = {
    sorted: boolean,
    unsorted: boolean,
    empty: boolean
}

type Pageable = {
    sort: Sort,
    pageNumber: number,
    pageSize: number,
    offset: number,
    paged: boolean,
    unpaged: boolean
}
export interface Paginate<T extends Record<keyof T, T[keyof T]>>{
    pageable: Pageable,
    totalPages: number,
    totalElements: number,
    last: boolean,
    sort: Sort,
    numberOfElements: number,
    first: boolean,
    size: number,
    number: number,
    empty: boolean,
    content: T[]

}