import { BookCondition } from '@/api/CommonTypings';

export interface ConditionFilter {
    name: string;
    value: BookCondition;
}

export enum OfferType {
    BUY = 'BUY',
    EXCHANGE = 'EXCHANGE'
}

export interface OfferTypeFilter {
    name: string;
    value: OfferType;
}
