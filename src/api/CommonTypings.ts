export enum OrderType {
    EXCHANGE = 'EXCHANGE',
    BUY = 'BUY'
}

export interface Money {
    amount: string;
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
