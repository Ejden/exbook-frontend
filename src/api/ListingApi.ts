import axios, { AxiosResponse } from 'axios';
import { Page } from '@/typings/Page';

export interface DetailedOffer {
    id: string;
    book: Book;
    images: Images;
    description: string;
    type: OfferType;
    seller: Seller;
    price: Money;
    location: string;
    category: Category;
    shipping: Shipping;
    inStock: number;
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
    NEW = 'NEW',
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
    amount: number;
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
    price: Money;
}

export async function getListing(
    searchingPhrase: string,
    bookConditions?: string[],
    offerTypes?: string[],
    priceFrom?: number,
    priceTo?: number,
    location?: string,
    categoryId?: string
): Promise<Page<DetailedOffer>> {
    const url = new URL("/api/listing", axios.defaults.baseURL);
    if (searchingPhrase !== undefined) {
        url.searchParams.append("search", searchingPhrase);
    }
    if (bookConditions !== undefined) {
        bookConditions.filter(it => it !== undefined).forEach(it => url.searchParams.append("condition", it));
    }
    if (offerTypes !== undefined) {
        offerTypes.filter(it => it !== undefined).forEach(it => url.searchParams.append("offerType", it));
    }
    if (priceFrom !== undefined) {
        url.searchParams.append("priceFrom", priceFrom.toString());
    }
    if (priceTo !== undefined) {
        url.searchParams.append("priceTo", priceTo.toString());
    }
    if (location !== undefined) {
        url.searchParams.append("location", location);
    }
    if (categoryId !== undefined) {
        url.searchParams.append("category", categoryId);
    }
    return axios.get(url.href)
        .then(response => response.data as Page<DetailedOffer>);
}

export async function getSingleOffer(offerId: string) {
    const offerUrl = 'api/listing/' + offerId;
    return axios.get(offerUrl)
        .then(response => response.data as DetailedOffer);
}

export async function getUserOffers(page: number, perPage: number): Promise<AxiosResponse<Page<DetailedOffer>>> {
    return axios.get('api/sale/offers?p=' + page + '&size=' + perPage);
}
