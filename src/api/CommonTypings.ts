export enum OrderType {
    EXCHANGE = 'EXCHANGE',
    BUY = 'BUY'
}

export interface Money {
    amount: number;
    currency: string;
}

export enum BookCondition {
    NEW = 'NEW',
    PERFECT = 'PERFECT',
    LIGHTLY_USED = 'LIGHTLY_USED',
    MODERATELY_USED = 'MODERATELY_USED',
    BAD = 'BAD'
}

export enum ShippingMethodType {
    PICKUP_DELIVERY = 'PICKUP_DELIVERY',
    ADDRESS_DELIVERY = 'ADDRESS_DELIVERY',
    PERSONAL_DELIVERY = 'PERSONAL_DELIVERY'
}

export enum OfferType {
    BUY_ONLY = 'BUY_ONLY',
    EXCHANGE_ONLY = 'EXCHANGE_ONLY',
    EXCHANGE_AND_BUY = 'EXCHANGE_AND_BUY'
}

export const acceptHeader = {
    'Accept': 'application/vnd.exbook.v1+json'
}

export const contentTypeHeader = {
    'Content-Type': 'application/vnd.exbook.v1+json'
}

export const apiHeaders = {
    ...acceptHeader,
    ...contentTypeHeader
}
