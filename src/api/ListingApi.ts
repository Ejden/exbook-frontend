import axios from 'axios';
import { Page } from '@/typings/Page';

export interface DetailedOffer {
    id: string;
    book: Book;
    images: Images;
    description?: string;
    type: OfferType;
    seller: Seller;
    cost: Money;
    location: string;
    category: Category;
    shipping: Shipping;
}

export enum OfferType {
    EXCHANGE_AND_BUY = 'EXCHANGE_AND_BUY',
    EXCHANGE_ONLY = 'EXCHANGE_ONLY',
    BUY_ONLY = 'BUY_ONLY'
}

export interface Book {
    author: string;
    title: string;
    isbn?: number;
    condition: BookCondition;
}

export enum BookCondition {
    NEW= 'NEW',
    PERFECT = 'PERFECT',
    LIGHTLY_USED = 'LIGHTLY_USED',
    MODERATELY_USED = 'MODERATELY_USED',
    BAD = 'BAD'
}

export interface Images {
    thumbnail?: Image;
    otherImages: Image[];
}

export interface Image {
    url: string;
}

export interface Seller {
    id: string;
    username: string;
    grade: number;
}

export interface Money {
    amount: string;
    currency: string;
}

export interface Category {
    id: string;
}

export interface Shipping {
    shippingMethods: ShippingMethod[];
    cheapestMethod: ShippingMethod;
}

export interface ShippingMethod {
    id: string;
    name: string;
    cost: Money;
}

export async function getListing() {
    return axios.get('api/listing')
        .then(response => response.data as Page<DetailedOffer>);
}

export async function getSingleOffer(offerId: string) {
    const offerUrl = 'api/listing/' + offerId;
    return axios.get(offerUrl)
        .then(response => response.data as DetailedOffer);
}
