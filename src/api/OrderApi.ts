import { Page } from '@/api/typings/Page';
import axios, { AxiosResponse } from 'axios';
import { apiHeaders, ShippingMethodType } from '@/api/CommonTypings';
import { buildUrl } from '@/mixin';

export interface UserOrderSnippet {
    id: string;
    buyer: Buyer;
    seller: Seller;
    shipping: Shipping;
    sellerShippingInfo?: SellerShippingInfo;
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

export interface SellerShippingInfo {
    address?: ShippingAddress,
    pickupPoint?: PickupPoint
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

export interface AcceptExchangeAddressData {
    firstAndLastName: string;
    phoneNumber: string;
    email: string;
    address: string;
    postalCode: string;
    city: string;
    country: string;
}

export interface AcceptExchangePickupPointData {
    firstAndLastName: string;
    phoneNumber: string;
    email: string;
    pickupPointId: string;
}

export interface AcceptExchangeData {
    address?: AcceptExchangeAddressData;
    pickupPoint?: AcceptExchangePickupPointData;
}

export function getLatestOrdersSnippets(
    page?: number,
    perPage?: number,
    statusFilters?: OrderStatus[]
): Promise<Page<UserOrderSnippet>> {
    const url = buildUrl('/api/orders/snippet', {
        p: page,
        size: perPage,
        status: statusFilters
    });

    return axios.get(url)
        .then(r => r.data as Page<UserOrderSnippet>);
}

export function getLatestSoldOrdersSnippets(
    page?: number,
    perPage?: number,
    statusFilters?: OrderStatus[]
): Promise<AxiosResponse<Page<UserOrderSnippet>>> {
    const url = buildUrl('/api/sale/orders/snippet', {
        p: page,
        size: perPage,
        status: statusFilters
    });

    return axios.get(url);
}

export function getOrderSnippet(orderId: string): Promise<AxiosResponse<UserOrderSnippet>> {
    return axios.get('/api/orders/' + orderId);
}

export function changeOrderStatus(orderId: string, newStatus: OrderStatus): Promise<AxiosResponse<UserOrderSnippet>> {
    return axios.put('/api/orders/' + orderId + '/status', { newStatus: newStatus }, { headers: apiHeaders });
}

export function acceptExchange(orderId: string, data: AcceptExchangeData): Promise<AxiosResponse<UserOrderSnippet>> {
    return axios.patch('/api/orders/' + orderId + '/accept', data, { headers: apiHeaders });
}
