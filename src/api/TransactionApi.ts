import axios, { AxiosResponse } from 'axios';
import { apiHeaders, OrderType, Money, BookCondition } from '@/api/CommonTypings';

export interface PreviewPurchaseRequestData {
    orders: PreviewPurchaseOrderData[];
}

export interface PreviewPurchaseOrderData {
    sellerId: string;
    orderType: OrderType;
    shipping: PreviewPurchaseShippingData;
}

export interface PreviewPurchaseShippingData {
    shippingMethodId: string;
    shippingAddress?: PreviewPurchaseShippingAddressData;
    pickupPoint?: PreviewPurchasePickupPointData;
}

export interface PreviewPurchaseShippingAddressData {
    firstAndLastName: string;
    phoneNumber: string;
    email: string;
    address: string;
    postalCode: string;
    city: string;
    country: string;
}

export interface PreviewPurchasePickupPointData {
    firstAndLastName: string;
    phoneNumber: string;
    email: string;
    pickupPointId: string;
}

export interface DetailedDraftPurchase {
    purchaseId: string;
    buyer: DraftPurchaseBuyer;
    orders: DraftPurchaseOrder[];
    totalOffersPrice: Money;
    totalShippingPrice: Money;
    totalPrice: Money;
}

export interface DraftPurchaseBuyer {
    id: string;
}

export interface DraftPurchaseOrder {
    orderId: string;
    orderType: string;
    seller: DraftOrderSeller;
    items: DraftOrderItem[];
    exchangeBooks: DraftOrderExchangeBook[];
    shipping?: DraftOrderShipping;
    availableShippingMethods: PreviewPurchaseShippingOption[];
    totalOffersPrice: Money;
    totalPrice: Money;
}

export interface DraftOrderSeller {
    id: string;
    firstName: string;
    lastName: string;
    username: string;
}

export interface DraftOrderItem {
    offer: DraftOrderItemOffer;
    quantity: number;
    totalPrice: Money;
}

export interface DraftOrderItemOffer {
    id: string;
    price: Money;
    book: ItemOfferBook;
    images: ItemOfferImages;
}

export interface ItemOfferBook {
    author: string;
    title: string;
    condition: BookCondition,
    isbn?: string;
}

export interface ItemOfferImages {
    thumbnail: ItemOfferImage;
    allImages: ItemOfferImage[];
}

export interface ItemOfferImage {
    url: string;
}

export interface DraftOrderExchangeBook {
    id: string;
    author: string;
    title: string;
    isbn?: string;
    condition: BookCondition;
    quantity: number;
}

export interface DraftOrderShipping {
    shippingMethod: DraftOrderShippingMethod;
    pickupPoint: DraftOrderShippingPickupPoint;
    shippingAddress: DraftOrderShippingAddress;
}

export interface DraftOrderShippingMethod {
    id: string;
    methodName: string;
    price: ShippingCost;
}

export interface ShippingCost {
    finalPrice: Money;
}

export interface DraftOrderShippingPickupPoint {
    firstAndLastName: string;
    phoneNumber: string;
    email: string;
    pickupPointId: string;
}

export interface DraftOrderShippingAddress {
    firstAndLastName: string;
    phoneNumber: string;
    email: string;
    address: string;
    postalCode: string;
    city: string;
    country: string;
}

export interface PreviewPurchaseShippingOption {
    shippingMethodId: string;
    shippingMethodName: string;
    pickupPointMethod: boolean;
    price: Money;
}

export async function previewPurchase(requestData: PreviewPurchaseRequestData): Promise<AxiosResponse<DetailedDraftPurchase>> {
    return axios.put('api/purchase/preview', requestData, { headers: apiHeaders });
}
