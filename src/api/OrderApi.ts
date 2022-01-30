import { Page } from '@/typings/Page';
import axios from 'axios';

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
    RETURNED = 'RETURNED'
}

export enum OrderType {
    EXCHANGE = 'EXCHANGE',
    BUY = 'BUY'
}

export function getLatestOrdersSnippets(): Promise<Page<UserOrderSnippet>> {
    return axios.get('api/orders/snippet')
        .then(r => r.data as Page<UserOrderSnippet>);
}
