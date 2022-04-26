import { Page } from '@/typings/Page';
import axios, { AxiosResponse } from 'axios';

export interface UserOrderSnippet {
    id: string;
    buyer: Buyer;
    seller: Seller;
    shipping: Shipping;
    items: OrderItem[];
    orderDate: string;
    status: OrderStatus;
    totalCost: string;
}

export interface Buyer {
    id: string;
    name: string;
    firstName: string;
    lastName: string;
}

export interface Seller {
    id: string;
    name: string;
    firstName: string;
    lastName: string;
}

export interface Shipping {
    id: string;
    methodName: string;
    cost: ShippingCost;
}

export interface ShippingCost {
    finalCost: Money;
}

export interface Money {
    amount: string;
    currency: string;
}

export interface OrderItem {
    offerId: string;
    book: Book;
    orderType: OrderType;
    images: Images;
    quantity: number;
    cost: Money;
}

export interface Book {
    author: string;
    title: string;
}

export interface Images {
    thumbnail: Image;
}

export interface Image {
    url: string;
}

export enum OrderStatus {
    NEW = 'NEW',
    DECLINED = 'DECLINED',
    ACCEPTED = 'ACCEPTED',
    RETURNED = 'RETURNED',
    WAITING_FOR_ACCEPT = 'WAITING_FOR_ACCEPT'
}

export enum OrderType {
    EXCHANGE = 'EXCHANGE',
    BUY = 'BUY'
}

export function getLatestOrdersSnippets(
    page?: number,
    perPage?: number
): Promise<Page<UserOrderSnippet>> {
    let url = 'api/orders/snippet';
    if (page !== undefined) {
        url += '?p=' + page;
    }
    if (perPage !== undefined) {
        if (page === undefined) {
            url += '?size=' + perPage
        } else {
            url += '&size=' + perPage
        }
    }
    return axios.get(url)
        .then(r => r.data as Page<UserOrderSnippet>);
}

export function getLatestSoldOrdersSnippets(
    page?: number,
    perPage?: number
): Promise<AxiosResponse<Page<UserOrderSnippet>>> {
    let url = '/api/sale/orders/snippet';
    if (page !== undefined) {
        url += '?p=' + page;
    }
    if (perPage !== undefined) {
        if (page === undefined) {
            url += '?size=' + perPage
        } else {
            url += '&size=' + perPage
        }
    }
    return axios.get(url);
}
