import { Money, ShippingMethodType } from '@/api/CommonTypings';

export interface NewOfferShippingMethod {
    id: string;
    name: string;
    type: ShippingMethodType;
    price: Money;
}
