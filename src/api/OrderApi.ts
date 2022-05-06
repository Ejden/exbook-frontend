import { Page } from '@/typings/Page';
import axios, { AxiosResponse } from 'axios';
import { apiHeaders, ShippingMethodType } from '@/api/CommonTypings';

export interface UserOrderSnippet {
    id: string;
    buyer: Buyer;
    seller: Seller;
    shipping: Shipping;
    items: OrderItem[];
    exchangeBooks: ExchangeBook[];
    orderDate: Date;
    orderType: OrderType,
    status: OrderStatus;
    totalCost: string;
    availableActions: AvailableActions;
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
    methodType: ShippingMethodType;
    shippingAddress?: ShippingAddress;
    pickupPoint?: PickupPoint;
    cost: ShippingCost;
}

export interface ShippingAddress {
    firstAndLastName: string;
    phoneNumber: string;
    email: string;
    address: string;
    postalCode: string;
    city: string;
    country: string;
}

export interface PickupPoint {
    firstAndLastName: string;
    phoneNumber: string;
    email: string;
    pickupPointId: string;
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

export interface ExchangeBook {
    id: string;
    author: string;
    title: string;
    isbn?: string;
    condition: string;
    quantity: number;
}

export interface Images {
    thumbnail: Image;
}

export interface Image {
    url: string;
}

export interface AvailableActions {
    buyerActions: BuyerActions;
    sellerActions: SellerActions;
}

export interface BuyerActions {
    canBeReturned: boolean;
    canBeCancelled: boolean;
    canBeMarkedAsDelivered: boolean;
}

export interface SellerActions {
    canBeCancelled: boolean;
    canExchangeBeDismissed: boolean;
    canExchangeBeAccepted: boolean;
    canBeMarkedAsSent: boolean;
    canBeMarkedAsReturnDelivered: boolean;
}

export enum OrderStatus {
    NEW = 'NEW',
    WAITING_FOR_ACCEPT = 'WAITING_FOR_ACCEPT',
    SENT = 'SENT',
    DELIVERED = 'DELIVERED',
    DECLINED = 'DECLINED',
    ACCEPTED = 'ACCEPTED',
    RETURN_DELIVERED = 'RETURN_DELIVERED',
    RETURN_IN_PROGRESS = 'RETURN_IN_PROGRESS',
    CANCELED = 'CANCELED'
}

export enum OrderType {
    EXCHANGE = 'EXCHANGE',
    BUY = 'BUY'
}

export function getLatestOrdersSnippets(
    page?: number,
    perPage?: number,
    statusFilters?: OrderStatus[]
): Promise<Page<UserOrderSnippet>> {
    const url = new URL("/api/orders/snippet", axios.defaults.baseURL);

    if (page !== undefined) {
        url.searchParams.append("p", page.toString());
    }
    if (perPage !== undefined) {
        url.searchParams.append("size", perPage.toString());
    }
    if (statusFilters !== undefined) {
        statusFilters.forEach(status => url.searchParams.append("status", status));
    }

    return axios.get(url.href)
        .then(r => r.data as Page<UserOrderSnippet>);
}

export function getLatestSoldOrdersSnippets(
    page?: number,
    perPage?: number,
    statusFilters?: OrderStatus[]
): Promise<AxiosResponse<Page<UserOrderSnippet>>> {
    const url = new URL('api/sale/orders/snippet', axios.defaults.baseURL);

    if (page !== undefined) {
        url.searchParams.append("p", page.toString());
    }
    if (perPage !== undefined) {
        url.searchParams.append("size", perPage.toString());
    }
    if (statusFilters !== undefined) {
        statusFilters.forEach(status => url.searchParams.append("status", status));
    }

    return axios.get(url.href);
}

export function getOrderSnippet(orderId: string): Promise<AxiosResponse<UserOrderSnippet>> {
    return axios.get('api/orders/' + orderId);
}

export function changeOrderStatus(orderId: string, newStatus: OrderStatus): Promise<AxiosResponse<UserOrderSnippet>> {
    return axios.put('api/orders/' + orderId + '/status', { newStatus: newStatus }, { headers: apiHeaders })
}
